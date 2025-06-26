import {Outlet} from '@umijs/max';
import {Button, ConfigProvider, Drawer, Layout, Menu, Typography} from 'antd';
import {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react";
import {MenuOutlined, RightCircleFilled} from '@ant-design/icons';
import {history} from "@@/core/history";
import {BaseTheme} from "@/theme";
import {UserContext} from "@/context/UserContext";
import {UserInfo} from "@/stores/UseStore";
import {useMediaQuery} from 'react-responsive';

type SiderMenuProps = any;

const {Header, Content, Sider} = Layout;
const {Title} = Typography;

const items: SiderMenuProps['dataSource'] = [
    {
        key: '/Hodgkin',
        label: '霍奇金淋巴瘤',
        icon: <RightCircleFilled/>
    },
    {
        key: '/non_Hodgkin',
        label: '非霍奇金淋巴瘤',
        icon: <RightCircleFilled/>
    },
    {
        key: '/Lymphoma_forum',
        label: '淋巴瘤之家',
        icon: <RightCircleFilled/>
    },
    {
        key: '/others',
        label: '其他血液癌症',
        icon: <RightCircleFilled/>
    }
];

const EmrssLayout = observer(() => {
    const userStore = useContext(UserContext);
    const isMobile = useMediaQuery({maxWidth: 768});
    const [drawerVisible, setDrawerVisible] = useState(false);

    const toggleDrawer = () => {
        setDrawerVisible(!drawerVisible);
    };

    const validateToken = async (token: string) => {
        const url = 'https://bianque.pcl.ac.cn/api/iam-hub/userinfo';

        fetch(url, {
            method: 'GET',
            headers: {
                'X-IHU-Token': `${token}`,
            },
        })
            .then(response => response.json())
            .then(response => {
                if (response.code === 0) {
                    const userInfo: UserInfo = response.data;
                    userStore.setUserInfo(userInfo);
                }
            })
            .catch(error => console.error('Error:', error));
    };

    useEffect(() => {
        const isInIframe = window.self !== window.top;

        if (isInIframe) {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');

            if (token) {
                userStore.setToken(token);
                validateToken(token);
            }
        }
    }, []);

    return (
        <ConfigProvider theme={BaseTheme}>
            <Layout style={{height: '100%', width: '100%'}}>
                {isMobile ? (
                    <>
                        <Header style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: '#fff',
                            padding: '0 16px'
                        }}>
                            <div style={{position: 'absolute', left: 16}}>
                                {isMobile && <Button onClick={toggleDrawer} icon={<MenuOutlined/>}/>}
                            </div>
                            <Title level={3} style={{margin: 0, color: ''}}>扁鹊公益问答</Title>
                        </Header>
                        <Drawer
                            title="菜单"
                            placement="left"
                            onClose={toggleDrawer}
                            width={240}
                            visible={drawerVisible}
                        >
                            <Menu
                                items={items}
                                onClick={(e) => {
                                    history.push(e.key);
                                    toggleDrawer();
                                }}
                            />
                        </Drawer>
                    </>
                ) : (
                    <Sider style={{background: 'white'}}>
                        <Menu
                            items={items}
                            onClick={(e) => {
                                history.push(e.key);
                            }}
                        />
                    </Sider>
                )}
                <Content style={{height: '100%'}}>
                    <Outlet/>
                </Content>
            </Layout>
        </ConfigProvider>
    );
});

export default EmrssLayout;
