import { useEffect, useState, useRef } from 'react';

const useLlm = () => {
    const [selectedKey, setSelectedKey] = useState<string>('ernie-bot'); // 默认选择文心一言
    const selectLLM = useRef<string>('ernie-bot');

    useEffect(() => {
        console.log('useLlm selectedKey---', selectedKey);
        selectLLM.current = selectedKey;
    }, [selectedKey]);

    return {
        selectedKey,
        setSelectedKey,
        selectLLM
    };
};

export default useLlm;
