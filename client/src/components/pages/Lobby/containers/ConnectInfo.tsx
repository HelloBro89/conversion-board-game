import styles from '../lobbyStyle.module.css';
export const ConnectInfo = () => {
    // const dispatch = useDispatch();
    // const searchNickName = useSelector((state: RootState) => state.nickName);
    return (
        <div className={styles.connectInfo}>
            <div className={styles.firstCol}>Test HOST</div>
            <div className={styles.secondCol}>Long</div>
            <div className={styles.thirdCol}>3</div>
        </div>
    );
};
