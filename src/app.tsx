import 'antd/dist/reset.css';
import { createElement } from 'react';
import './app.less';
import { AppProvider } from './theme';

export const rootContainer = (container: any) => {
    return createElement(AppProvider, null, container);
};
