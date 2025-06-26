import {Button, Col, Input, Row, Upload, message, Typography, Spin} from 'antd';
import type { UploadProps } from 'antd';
import {UploadOutlined} from "@ant-design/icons";

import { useRef, useState } from 'react';

import Message, { MessageItem } from './component/Message';
import styles from './index.less';
import useScroll from './useScroll';

import {ChatMindQuery, FaqResponseItem, getHospitalQueryData, queryChatMindAnswer} from '@/services';

const { Title } = Typography;

interface QueryItem extends MessageItem {
    clickBak?: any; // ??
    contentType: 'text'; // how to render the content, defaults to 'text'
    similars: FaqResponseItem[];
}

const FaqPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    // 输入内容
    const [queryValue, setQueryValue] = useState('');
    // 询问记录列表
    const [queryList, setQueryList] = useState<QueryItem[]>([]);
    // 相关问题
    const [similarsList, setSimilarsList] = useState<FaqResponseItem[]>([]);
    const listRef = useRef<any>();
    const { scrollToBottom } = useScroll(listRef);

    // 封装的回复卡片
    const cardItemFn = (query: QueryItem) => {
        setQueryList(() => {
            // 赋值最新的数据, and duplicate the data to maintain
            // its reference transparancy
            //
            // We should not mess up with react
            queryList.push({ ...query });
            return [...queryList];
        });
    };

    // 获取咨询对话信息
    const getHospitalLinkList = async (query: string) => {
        setLoading(true);
        let callback = await getHospitalQueryData({
            user_id: '',
            query: query
        });
        if (callback.code === 0 && callback.data) {
            let res = callback.data;
            cardItemFn({
                role: 'model',
                contentType: 'text',
                content: res.exact ? res.exact.answer : '您咨询的问题暂时没有答案',
                similars: res.similars,
                source: res.exact?.source || undefined
            });
            setSimilarsList(res.similars);
        }
        setLoading(false);
        scrollToBottom(true);
    };

    // 点击问题
    const clickAccess = (title: string) => {
        cardItemFn({
            role: 'user',
            contentType: 'text',
            content: title,
            similars: []
        });

        // 医院咨询请求
        getHospitalLinkList(title);
    };

    const clickChatMind = async () => {
        setLoading(true);
        let queryValue = queryList.filter(message => message.role == "user").reduce((acc, message) => message.content, null);

        const query: ChatMindQuery = {
            content_list: [queryValue],
            request_type: 0,
            sessionId: "a5b72056-bdc2-4a47-9aa6-9389c3e27a07",
            userId: "fangj",
            use_multi_turn: 0,
            top_k: 1,
        }

        cardItemFn({
            role: 'user',
            contentType: 'text',
            content: `向智能大模型询问：${queryValue}`,
            similars: []
        });
        const res = await queryChatMindAnswer(query);

        if (res.code === 200 && res.response_list.length > 0) {
            let data = res.response_list[0];
            setQueryList(() => {
                queryList.push({ role: 'model', content: data, contentType: 'text', similars: [], source: '智能大模型' });
                return [...queryList];
            })
        }

        setLoading(false);
        scrollToBottom(true);
    };

    // 提交录入的问题
    const clickUpdata = (value: string) => {
        if (value.trim()) {
            // 调用回复卡片
            clickAccess(value);
            setQueryValue('');
        }
    };

    const props: UploadProps = {
        name: 'file',
        action: '/qa_api/upload_qa_data',
        headers: {
            authorization: 'authorization-text',
        },
        showUploadList: false,
        data: {
            collectionName: "faq_test",
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} 知识库上传成功`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} 数据导入失败`);
            }
        },
    };

    return (
        <div className={styles.root}>
            <div className={styles.bgCard}>
                <div className={styles.title}>
                    <Row gutter={16}>
                        <Col span={2}><Title level={4}>知识问答</Title></Col>
                        <Col span={2}>
                            <Upload {...props} >
                                <Button icon={<UploadOutlined />}>上传知识库文件</Button>
                            </Upload>
                        </Col>
                    </Row>
                </div>
                <div className={styles.listWrapper}>
                    <div className={styles.list} ref={listRef}>
                        <Spin spinning={loading}>
                            {queryList.map((item, index) => {
                                return <Message key={`${item.content}-${index}`} {...item} />;
                            })}
                        </Spin>
                    </div>
                    <div className={styles.similarsWrapper}>
                        {similarsList.slice(0,4).map((item, index) => {
                            return (
                                <div
                                    className={styles.item}
                                    key={`${item.title}-${index}`}
                                    onClick={() => clickAccess(item.title)}
                                >
                                    {item.title}
                                </div>
                            );
                        })}
                        {similarsList.length > 0 && (
                            <div
                                className={styles.item}
                                onClick={() => clickChatMind()}
                            >
                                智能大模型回答
                            </div>
                        )}
                    </div>
                    <div className={styles.footer}>
                        <Input.TextArea
                            className={styles.text}
                            bordered={false}
                            placeholder="症状、疾病输入"
                            value={queryValue}
                            rows={6}
                            autoSize={{ minRows: 6, maxRows: 6 }}
                            onChange={(e) => setQueryValue(e.target.value)}
                            onKeyDown={(e) => {
                                const { code, shiftKey } = e;
                                if (code === 'Enter') {
                                    if (!shiftKey) {
                                        e.preventDefault();
                                        clickUpdata(queryValue);
                                    }
                                }
                            }}
                        />
                        <Button
                            disabled={!queryValue}
                            className={styles.btn}
                            type="primary"
                            onClick={() => clickUpdata(queryValue)}
                        >
                            发送
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqPage;
