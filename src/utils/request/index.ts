import { message as Message } from 'antd';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { merge, omit } from 'lodash';
import store from 'store2';

import {CHAT_MIND_CODE, REDIRECT_CODE, SUCESS_CODE, TOKEN_EXPIRE_CODE} from '@/config/const';
const AxiosInstance = axios.create();

// 添加请求拦截器
AxiosInstance.interceptors.request.use(
    function (config) {
        console.log('request', config);
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// 添加响应拦截器
AxiosInstance.interceptors.response.use(
    (response: any) => {

        const { data, config } = response;
        let res = {};
        let showErrorMsg = '';
        if (data) {
            const { code, message } = data;
            switch (code) {
                case CHAT_MIND_CODE:
                case SUCESS_CODE:
                    res = response;
                    break;
                case REDIRECT_CODE:
                case TOKEN_EXPIRE_CODE:
                    window.location.href = '/pcl/logout';
                    break;
                default:
                    // 是否是校验错误
                    res = response;
                    const strCode = String(code);
                    let isValidate = false;
                    isValidate = strCode.startsWith('2802120');
                    if (isValidate) {
                        showErrorMsg = message;
                    } else {
                        showErrorMsg = `服务端错误：${message}。API: ${config.url}`;
                    }
                    break;
            }
        } else {
            showErrorMsg = `服务端无响应, API: ${config.url}`;
        }
        if (config.hideError) {
            return res;
        }
        if (showErrorMsg) {
            Message.error(`${showErrorMsg}`, 5);
        }
        return res;
    },
    (error) => {
        console.log('error', error);
        const { response, config } = error;
        const { status, statusText, data } = response;

        let showErrorMsg = '';
        switch (status) {
            case 404:
            case 500:
            case 503:
            case 504:
                if (data) {
                    const { message } = data;
                    showErrorMsg = `服务端错误：${message || statusText}。API: ${config.url}`;
                } else {
                    showErrorMsg = statusText;
                }
                break;
            default:
                break;
        }
        if (config.hideError) {
            return response;
        }
        if (showErrorMsg) {
            Message.error(showErrorMsg, 5);
        } else {
            Message.error(`服务端异常，HTTP状态码[${status}]。API: ${config.url}`, 5);
        }
        return response;
    }
);

export { AxiosInstance };

export interface BaseRequestConfig extends AxiosRequestConfig {
    isMock?: boolean;
}

class BaseRequest {
    async request(url: string, config: BaseRequestConfig) {
        let headers = {
            ...config.headers
        };
        if (process.env.NODE_ENV === 'development') {
            const iamInfo = store.get('ihcloud_user_info');
            headers = {
                ...headers,
                'X-IHU-AccountID': iamInfo?.account_id || 3,
                'X-IHU-UserID': iamInfo?.user_id || 22,
                'X-IHU-ProjectGroupID': 105,
                'X-IHU-Platform': store.get('pcl_platform') || 'resources_manager' // 'algo-manager'
            };
        } else {
            headers = {
                ...headers,
                'X-IHU-ProjectGroupID': store.get('pcl_public_project')?.project_id,
                'X-IHU-Platform': 'algo_manager'
            };
        }
        return await (
            await AxiosInstance.request({
                url,
                ...omit(config, ['isMock']),
                headers
            })
        ).data;
    }

    async get(url: string, config?: BaseRequestConfig) {
        return await this.request(url, merge({}, config, { method: 'get' }));
    }

    async post(url: string, config?: BaseRequestConfig) {
        return await this.request(url, merge({}, config, { method: 'post' }));
    }

    async put(url: string, config?: BaseRequestConfig) {
        return await this.request(url, merge({}, config, { method: 'put' }));
    }

    async delete(url: string, config?: BaseRequestConfig) {
        return await this.request(url, merge({}, config, { method: 'delete' }));
    }

    async patch(url: string, config?: BaseRequestConfig) {
        return await this.request(url, merge({}, config, { method: 'patch' }));
    }
}

export default new BaseRequest();
