import { useState } from 'react';

import { GetCenterCardListData } from '@/services';

const useChat = () => {
    const [doc, setDoc] = useState<string[]>();

    const [emr, setEmr] = useState<string[]>();
    const [showFloat, setShowFloat] = useState<boolean>(false); // 显示灵感按钮
    const [template, setTemplate] = useState<GetCenterCardListData>(); // 灵感中心卡片模板

    return {
        doc,
        setDoc,
        emr,
        setEmr,
        showFloat,
        setShowFloat,
        template,
        setTemplate
    };
};

export default useChat;
