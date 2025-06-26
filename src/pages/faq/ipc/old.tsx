import styles from './index.less';

const FaqPage = () => {
    return (
        <div className={styles.root}>
            <div className={styles.bgCard}>
                <div className={styles.title}>多轮预问诊</div>
                <iframe
                    src="/ipc"
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none'
                    }}
                />
            </div>
        </div>
    );
};

export default FaqPage;
