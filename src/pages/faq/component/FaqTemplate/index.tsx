import type {UploadProps} from 'antd';
import {Button, Col, Input, Layout, message, Row, Spin, Typography} from 'antd';

import React, {useRef, useState} from 'react';

import Message, {MessageItem} from '../Message';
import styles from './index.less';
import useScroll from '../../useScroll';

import {ChatMindQuery, FaqResponseItem, queryChatMindAnswer, queryModelCollection} from '@/services';
import UploadCollection from "@/pages/faq/component/UploadCollection";
import {useMediaQuery} from "react-responsive";

const {Title} = Typography;

interface QueryItem extends MessageItem {
    clickBak?: any; // ??
    contentType: 'text'; // how to render the content, defaults to 'text'
    similars: FaqResponseItem[];
}

interface FaqTemplateProps {
    title: string,
    allowUpload: boolean;
    chatMind: boolean;
    collection: string,
}

const FaqTemplate: React.FC<FaqTemplateProps> = ({title, allowUpload, chatMind, collection}) => {
    const [loading, setLoading] = useState(false);
    const [queryValue, setQueryValue] = useState('');
    const isMobile = useMediaQuery({maxWidth: 768});

    const [queryList, setQueryList] = useState<QueryItem[]>([
        {
            role: 'model',
            contentType: 'text',
            content: '欢迎来到扁鹊公益问答，请问有什么可以帮您的吗？',
            similars: []
        }
    ]);

    const [similarsList, setSimilarsList] = useState<FaqResponseItem[]>([   ]);
    const listRef = useRef<any>();
    const {scrollToBottom} = useScroll(listRef);

    const cardItemFn = (query: QueryItem) => {
        setQueryList(() => {
            queryList.push({...query});
            return [...queryList];
        });
    };

    const getHospitalLinkList = async (query: string) => {
        setLoading(true);
        let callback = await queryModelCollection({
            user_id: '',
            query: query,
        }, collection);
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

    const clickAccess = (title: string) => {
        cardItemFn({
            role: 'user',
            contentType: 'text',
            content: title,
            similars: []
        });

        getHospitalLinkList(title);
    };

    const clickChatMind = async () => {
        setLoading(true);
        let queryValue = queryList.filter(message => message.role == "user").reduce((acc, message) => message.content, null);

        const query: ChatMindQuery = {
            messages: [{role: 'user', content: queryValue}],
        }

        cardItemFn({
            role: 'user',
            contentType: 'text',
            content: `${queryValue}`,
            similars: [],
        });
        const result = await queryChatMindAnswer(query);

        if (result.code === 200) {
            setQueryList(() => {
                queryList.push({
                    role: 'model',
                    content: result.data,
                    contentType: 'text',
                    similars: [],
                    source: '智能大模型'
                });
                return [...queryList];
            })
        }

        setLoading(false);
        scrollToBottom(true);
    };

    const clickUpdata = (value: string) => {
        if (value.trim()) {
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
            collectionName: collection,
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
        <div className={styles.root} style={{padding: `${isMobile ? '0' : '12px'}`}}>
            <div className={styles.bgCard}>
                <div className={styles.title} style={{padding: `${isMobile ? '0 10' : '10px'}`}}>
                    <Row gutter={16}>
                        <Col span={22}><Title level={isMobile ? 5 : 4}>{title}</Title></Col>
                        {allowUpload && (
                            <UploadCollection
                                collectionName={collection}
                                setLoading={setLoading}
                            />
                        )}
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
                        {similarsList.slice(0, isMobile ? 2 : 4).map((item, index) => {
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
                        {chatMind && similarsList.length > 0 && (
                            <div
                                className={styles.item}
                                onClick={clickChatMind}
                            >
                                智能大模型
                            </div>
                        )}
                    </div>
                    <div className={styles.footer}>
                        <Input.TextArea
                            className={styles.text}
                            bordered={false}
                            placeholder="请输入疾病诊疗相关的问题或关键词"
                            value={queryValue}
                            rows={6}
                            autoSize={{minRows: isMobile ? 2: 4, maxRows: 6}}
                            onChange={(e) => setQueryValue(e.target.value)}
                            onKeyDown={(e) => {
                                const {code, shiftKey} = e;
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
                <Layout.Footer style={{textAlign: 'center', color: 'grey'}}>
                    免责声明：本网站的内容仅供参考，不可用于直接诊断或医疗决策。
                </Layout.Footer>
            </div>
        </div>
    );
};

export default FaqTemplate;
