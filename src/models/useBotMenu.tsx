import { useState } from 'react';

const useBotMenu = () => {
    const [selectedKey, setSelectedKey] = useState<string>('多模态医疗问答'); // 左侧菜单

    return {
        selectedKey,
        setSelectedKey
    };
};

export default useBotMenu;
