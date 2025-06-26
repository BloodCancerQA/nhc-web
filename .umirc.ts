import { defineConfig } from '@umijs/max';
import routes from './src/routes';

export default defineConfig({
    base: '/',
    outputPath: 'dist/',
    title: '血液肿瘤问答',
    publicPath: '/charityQA/',
    favicons: ['/charityQA/favicon.ico'],
    hash: true,
    routes,
    model: {},
    locale: {
        default: 'zh-CN',
        baseSeparator: '-'
    },
});
