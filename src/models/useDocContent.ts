import { useState } from 'react';

interface GetSessionListDocItem {
    id: string; // 文档ID
    file_name: string; // 文档名称
    scene: number; // 场景，0：文档理解，1：病历生成，2：医疗问答，3：病历问答
}

// 获取所有会话
interface GetSessionListData {
    session_id: string; // 会话ID
    title: string; // 会话标题
    docs: GetSessionListDocItem[]; // 关联的文档（仅文档理解使用）
    create_time: string; // 创建时间
    update_time: string; // 修改时间
    doc_ids: string[]; // 关联的文档理解文档ID以及病历问答的病历id
}

const useDocContent = () => {
    const [state, setState] = useState<number>(1); // 文档状态
    const [isSingle, setIsSingle] = useState<boolean>(true);
    const [newDisabled, setNewDisabled] = useState<boolean>(true);
    const [sessionId, setSessionId] = useState<string>();
    const [isInit, setIsInit] = useState<boolean>(true);
    const [emr, setEmr] = useState<any>();
    const [showDocPrew, setShowDocPrew] = useState(false); // 展示文档预览
    const [sessionInfo, setSessionInfo] = useState<GetSessionListData>();

    return {
        emr,
        setEmr,
        isInit,
        setIsInit,
        state,
        setState,
        isSingle,
        setIsSingle,
        sessionId,
        setSessionId,
        newDisabled,
        setNewDisabled,
        showDocPrew,
        setShowDocPrew,
        sessionInfo,
        setSessionInfo
    };
};

export default useDocContent;
