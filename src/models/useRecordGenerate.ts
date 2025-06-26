import { useState } from 'react';

const useRecordGenerate = () => {
    // 病历生成 stores
    const [newDisabled, setNewDisabled] = useState<boolean>(true);
    const [sessionId, setSessionId] = useState<string>();
    const [isInit, setIsInit] = useState<boolean>(true);
    const [emr, setEmr] = useState<any>();
    const [chatReset, setChatReset] = useState<boolean>(false); // 新建对话

    return {
        emr,
        setEmr,
        isInit,
        setIsInit,
        sessionId,
        chatReset,
        setChatReset,
        setSessionId,
        newDisabled,
        setNewDisabled
    };
};

export default useRecordGenerate;
