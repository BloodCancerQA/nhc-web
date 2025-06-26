import { isArray } from 'lodash';
import store from 'store2';

// / 解析content type为text的内容
export const parseTextBody = (body?: string) => {
    if (!body) {
        return [{ type: [], text: body }];
    }
    try {
        const obj = JSON.parse(body);
        if (obj && typeof obj === 'object') {
            // 判断是不是V1版本的消息体 [{type: [], text: ''}]
            if (isArray(obj) && obj[0].type && obj[0].text) {
                return obj;
            }
            return [{ type: [], text: JSON.stringify(obj) }];
        }
        return [{ type: [], text: body }];
    } catch (error) {
        return [{ type: [], text: body }];
    }
};

// 设置当前打字中消息，用于停止生成时将原始参数传给后端
export class TypistMessage {
    private static typistMes: any = {};

    static setTypistMes = (mes: any) => {
        TypistMessage.typistMes = mes;
    };

    static getTypistMes = () => {
        return TypistMessage.typistMes;
    };

    static reset = () => {
        TypistMessage.typistMes = {};
    };
}

// 消息控制器，用于取消正在发送的消息
export const ChatControllerPool = {
    controllers: {} as Record<string, AbortController>,

    addController(
        sessionId: string,
        messageId: string,
        controller: AbortController,
    ) {
        const key = this.key(sessionId, messageId);
        this.controllers[key] = controller;
        return key;
    },

    stop(sessionId: string, messageId: string) {
        const key = this.key(sessionId, messageId);
        const controller = this.controllers[key];
        controller?.abort();
    },

    stopAll() {
        Object.values(this.controllers).forEach((v) => v.abort());
    },

    hasPending() {
        return Object.values(this.controllers).length > 0;
    },

    remove(sessionId: string, messageId: string) {
        const key = this.key(sessionId, messageId);
        delete this.controllers[key];
    },

    key(sessionId: string, messageIndex: string) {
        return `${sessionId},${messageIndex}`;
    }
};


export const StopMesPool = {
    stopMes: {} as Record<string, boolean>,

    addStopMes(sessionId: string, messageId: string) {
        const key = this.key(sessionId, messageId);
        this.stopMes[key] = true;
        return key;
    },

    hasStopMes(sessionId: string, messageId: string) {
        const key = this.key(sessionId, messageId);
        return this.stopMes[key];
    },

    removeStopMes(sessionId: string, messageId: string) {
        const key = this.key(sessionId, messageId);
        delete this.stopMes[key];
    },

    key(sessionId: string, messageIndex: string) {
        return `${sessionId},${messageIndex}`;
    }
};
export class Chatloading {
    static reset = () => {
        store.session.set('chat_loading', []);
    };

    static has = (session_id: string) => {
        const chatLoading = store.session.get('chat_loading');
        if (isArray(chatLoading)) {
            return chatLoading.includes(session_id);
        }
        return false;
    };

    static add = (session_id: string) => {
        const chatLoading = store.session.get('chat_loading');
        store.session.set('chat_loading', isArray(chatLoading) ? [...chatLoading, session_id] : [session_id]);
    };

    static remove = (session_id: string) => {
        const chatLoading = store.session.get('chat_loading');
        if (chatLoading) {
            const index = chatLoading.indexOf(session_id);
            if (index > -1) {
                chatLoading.splice(index, 1);
                store.session.set('chat_loading', chatLoading);
            }
        }
    };
};

// 排序数组
export const sortByArr = (arr: string[] = [], sortArr: string[] = []) => {
    return arr.sort((a, b) => {
        // 判断是否在排序数组中，如果都在，按照排序数组的顺序排序
        if (sortArr.includes(a) && sortArr.includes(b)) {
            return sortArr.indexOf(a) - sortArr.indexOf(b);
        }
        // 如果不存在排序数组中，放到最后
        return 1;
    });
};


// 获取V1流式body
export const getV1StreamCon = (con: any) => {
    if (!con || (con.type !== 'markdown' && con.type !== 'text')) {
        return con;
    }
    return {
        body: parseTextBody(con.body)[0].text,
        category: '',
        type: 'markdown'
    };

};

