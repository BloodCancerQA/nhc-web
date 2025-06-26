import { defineConfig } from '@umijs/max';

export default defineConfig({
    proxy: {
        '/api/01bot': {
            target: 'https://bianque.pcl.ac.cn', // 扁鹊域名
            changeOrigin: true,
            secure: false
        },
        '/faq': {
            target: 'http://localhost:8080', // 扁鹊域名
            changeOrigin: true,
            secure: false
        },
        '/cancer_charity_faq': {
            target: 'http://localhost:8080', // 扁鹊域名
            changeOrigin: true,
            secure: false
        },
        '/medical_detection_mapping': {
            target: 'http://yq01-gpu-255-100-22-00.epc.baidu.com:8790',
            changeOrigin: true
        },
        '/ihcloud/api': {
            target: 'http://10.255.100.59:8740',
            changeOrigin: true
        },
        '/pcl-webserver/api/v2/ai-manager/model/service/proxy': {
            // target: 'http://10.138.47.159:8603', // 国庆开发机
            // target: 'http://172.22.151.137:8603', // 国庆本地
            target: 'http://bianque.pcl.ac.cn', // 扁鹊域名
            changeOrigin: true
        },
        '/pcl-webserver/api/v2': {
            // target: 'http://10.138.47.159:8603', // 国庆开发机
            // target: 'http://172.22.151.137:8603', // 国庆本地
            target: 'http://bianque.pcl.ac.cn', // 扁鹊域名
            changeOrigin: true
        },
        // ipc前端静态资源代理
        '/ipc': {
            target: 'http://localhost:8080', //
            changeOrigin: true
        },
        '/fz-c-api': {
            targer: 'https://bianque.pcl.ac.cn', // 扁鹊域名
            changeOrigin: true
        },
        '/api/iam': {
            target: 'https://bianque.pcl.ac.cn',
            changeOrigin: true
        },
        '/qa_api': {
            target: 'http://localhost:8080',
            changeOrigin: true,
            pathRewrite: {'^/qa_api': ''}
        },
        '/_chatmind_': {
            target: 'https://pangu-alpha.pcl.ac.cn',
            changeOrigin: true,
        }
    }
});
