import { Outlet, useLocation, history } from '@umijs/max';
import { Layout, Menu, TabsProps } from 'antd';
import { includes } from 'lodash';
import React, { useEffect, useState } from 'react';

// import { TitleTabs } from '@baidu/ihud';

import './index.less';

const { Header, Content } = Layout;

const BasicLayout: React.FC = () => {
    const { pathname } = useLocation();

    const [hasChildren, setHasChildren] = useState(false);

    const [activeKey, setActiveKey] = useState<string>('/faq');

    const items: TabsProps['items'] = [
        {
            key: '/faq',
            label: '智能问答'
        },
    ];

    useEffect(() => {
        const childPaths = ['/emrss', '/faq', '/ipc', '/report', '/bot'];
        setHasChildren(childPaths.some((path) => includes(pathname, path)));

        if (pathname.includes('emrss')) {
            setActiveKey('/emrss');
            return;
        }

        if (pathname.includes('ipc') || pathname.includes('faq')) {
            setActiveKey('/faq');
            return;
        }

        setActiveKey(pathname);
    }, [pathname]);

    // TODO: Add navigation event handler
    return (
        <Layout className="layout">
            <Layout>
                <Outlet />
            </Layout>
        </Layout>
    );
};
export default BasicLayout;
