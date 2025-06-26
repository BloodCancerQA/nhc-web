import {Layout, Result} from "antd";
import styles from './index.less';

const Others: React.FC = () => {
    return (
        <div className={styles.root}>
            <div className={styles.bgCard}>
                <Result
                    status="info"
                    title="建设中"
                    subTitle={<>联系我们：鹏城实验室宁老师<br/>邮箱：<a>ningkd@pcl.ac.cn</a><br/>（电话/微信：17521613128）</>}
                />
            </div>
        </div>
    )
};

export default Others;
