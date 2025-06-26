import React, {useContext, useState} from 'react';
import {Card, Col, Divider, Input, Layout, List, Row, Spin, Typography} from "antd";
import styles from "./index.less";
import {queryModelCollection} from "@/services";
import {observer} from "mobx-react";
import {UserContext} from "@/context/UserContext";
import {useMediaQuery} from "react-responsive";

const {Title} = Typography;
const {Search} = Input;

const collection: string = "Lymphoma_forum";

const LymphomaHomePage: React.FC = observer(() => {

    const userStore = useContext(UserContext);
    const isMobile = useMediaQuery({maxWidth: 768});
    const [loading, setLoading] = useState<boolean>(false);
    const [dataList, setDataList] = useState([]);

    const queryCollectionData = async (query: string) => {
        setLoading(true);
        let callback = await queryModelCollection({
            query: query,
            user_id: userStore.userInfo.user_id || '',
        }, collection);
        if (callback.code === 0 && callback.data) {
            let res = callback.data;
            if (res.exact && res.similars) {
                setDataList([res.exact, ...res.similars]);
            }
        }
        setLoading(false);
    };

    return (
        <div className={styles.root}>
            <Card>
                <Spin spinning={loading}>
                    <div className={styles.title}>
                        <Row gutter={16}>
                            <Col span={isMobile ? 24 : 3}><Title level={4}>淋巴瘤之家</Title></Col>
                            <Col span={isMobile ? 24 : 12}>
                                <Search
                                    placeholder="输入您的问题/关键词搜索贴子"
                                    enterButton="搜索"
                                    size="large"
                                    onSearch={(value) => queryCollectionData(value)}
                                />
                            </Col>
                        </Row>
                    </div>
                    <Divider/>
                    <div className={styles.listWrapper}>
                        <List
                            className="demo-loadmore-list"
                            itemLayout="horizontal"
                            dataSource={dataList}
                            pagination={{pageSize: 10}}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={<a target={'_blank'} href={item.answer}>{item.title}</a>}
                                        description={item.answer}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </Spin>
            </Card>
            <Layout.Footer style={{textAlign: 'center', color: 'grey'}}>
                提供对淋巴瘤之家论坛（<a target={'_blank'} href={'https://www.house086.com'}>www.house086.com</a>）的知识性内容板块搜索
            </Layout.Footer>
        </div>
    );
});

export default LymphomaHomePage;
