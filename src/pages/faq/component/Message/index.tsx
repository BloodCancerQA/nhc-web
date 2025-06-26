import {Card, Divider, Image, Typography} from 'antd';

const { Title } = Typography;

import styles from './index.less';

import UserIcon from '@/assets/userIcon.png';

export interface MessageItem {
    role: 'model' | 'user';
    content: string;
    source?: string;
}

const Message: React.FC<MessageItem> = (props) => {

    let { role, content = '', source } = props;

    if (role === 'user') {
        let question = content.split('\n');
        return (
            <div className={styles.rightCard}>
                <div className={styles.right}>
                    {question.map((item: string, index: number) => (
                        <div key={index}>{item}</div>
                    ))}
                </div>
                <Image width={40} preview={false} src={UserIcon} alt="头像" />
            </div>
        );
    } else {
        // type === 'model'
        let answer = content.split('\\n');
        return (
            <div className={styles.leftCard}>
                <Image width={40} preview={false} src={UserIcon} alt="头像" />
                <div className={styles.left}>
                    <Card style={{ boxShadow: 'none', padding: 0 }} bordered={false} size="small" title={source && `回复引用自：${source}`}>
                        {answer.map((item: string, index: number) => (
                            <div key={index}>{source === '智能大模型' ? `${item}  (回答未经专业医师认证，仅供参考)`: item}</div>
                        ))}
                    </Card>
                </div>
            </div>
        );
    }
};

export default Message;
