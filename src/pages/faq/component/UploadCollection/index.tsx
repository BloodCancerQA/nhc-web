import React, {FC} from 'react';
import {Button, message, Upload, UploadProps} from "antd";
import {UploadOutlined} from "@ant-design/icons";

export type UploadCollectionProps = {
    collectionName: string,
    setLoading: (loading: boolean) => void,
    buttonContent?: string,
}

const UploadCollection: FC<UploadCollectionProps> = ({
    collectionName, setLoading, buttonContent
}) => {
    const props: UploadProps = {
        name: 'file',
        action: '/qa_api/upload_qa_data',
        headers: {
            authorization: 'authorization-text',
        },
        showUploadList: false,
        data: {
            collectionName: collectionName,
        },
        onChange(info) {
            setLoading(true);
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                setLoading(false);
                message.success(`${info.file.name} 知识库上传成功`);
            } else if (info.file.status === 'error') {
                setLoading(false);
                message.error(`${info.file.name} 数据导入失败`);
            }
        },
    };
    return (
        <Upload {...props} >
            <Button icon={<UploadOutlined />}>{buttonContent || '上传知识库文件'}</Button>
        </Upload>
    );
};

export default UploadCollection;
