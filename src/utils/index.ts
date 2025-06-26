/**
 * 生成uuid
 * @returns
 */
export function uuid() {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === 'function') {
        d += performance.now(); // use high-precision timer if available
    }
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
            let r = (d + Math.random() * 16) % 16 | 0; // d是随机种子
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
        },
    );
    return uuid;
}

export const searchToQuery = (search: string) => {
    const qeury: Record<string, string> = {};
    const arr = search.substring(1).split('&');
    arr.forEach((item) => {
        const keyVal = item.split('=');
        qeury[keyVal[0]] = decodeURIComponent(keyVal[1]);
    });
    return qeury;
};


// 获取浏览器版本
export const getBrowserType = () => {
    const UA = window.navigator.userAgent;
    if (window.ActiveXObject) {
        return 'ie';
    } else if (document.getBoxObjectFor) {
        return 'firefox';
    }
    //  else if (window.openDatabase) {
    else if (/^((?!chrome|android).)*safari/i.test(UA)) {
        return 'safari';
    } else if (window.MessageEvent && !document.getBoxObjectFor) {
        return 'chrome';
    } else if (window.opera) {
        return 'opera';
    }

    return 'unknown';
};

// 下载文档
export const downloadFile = (fileUrl: string) => {
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = fileUrl;
    a.click();
    a.remove();
};


// 生成唯一标识id
export const getUUID = () => {
    const s = [];
    const hexDigits = '0123456789abcdef';
    for (let i = 0; i < 36; i += 1) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-';

    const uuid = s.join('');
    return uuid;
};

// 获取基座大模型
export const getLlmService = (param: string) => {
    const serviceConfig = ['baichuan', 'ernie-bot', 'baichuan-7b', 'og', 'pc-mind']; // 基座大模型具体配置
    let service = ''; // 默认基座大模型
    if (serviceConfig.includes(param)) {
        // 判断是否是指定基座大模型
        service = param;
    }
    return service;
};

// 模拟延迟
export const wait = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time));
};

// 解析type=text的body
export const parseTextBody = (body?: string) => {
    if (!body) {
        return [{ type: [], text: body }];
    }
    try {
        const obj = JSON.parse(body);
        if (obj && typeof obj === 'object') {
            if (Array.isArray(obj)) {
                return obj;
            }
            return [{ type: [], text: JSON.stringify(obj) }];
        }
        return [{ type: [], text: body }];
    } catch (error) {
        return [{ type: [], text: body }];
    }
};



// / 模拟延迟
export const sleep = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time));
};

