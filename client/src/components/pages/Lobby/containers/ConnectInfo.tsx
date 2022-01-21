import { useSelector } from 'react-redux';
import { RootState } from '../../../redux';
// import { setHostData } from '../../../redux/actions/socketsDataAction';
import styles from '../lobbyStyle.module.css';
export const ConnectInfo = () => {
    const foundHostDate = useSelector((state: RootState) => state.socketsData.socketData);
    return (
        <div>
            {foundHostDate.length ? (
                <div>
                    {foundHostDate.map((item, ind) => (
                        <div className={styles.connectInfo} key={ind}>
                            <div className={styles.firstCol}>{item.hostName}</div>
                            <div className={styles.secondCol}>{item.gameTime}</div>
                            <div className={styles.thirdCol}>{item.numOfPlayers}</div>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

// ************************************** OLDER *****************
{
    /* <div className={styles.connectInfo}>
    <div key={ind}>
        <div className={styles.firstCol}>{item.hostName}</div>
        <div className={styles.secondCol}>{item.gameTime}</div>
        <div className={styles.thirdCol}>{item.numOfPlayers}</div>
    </div>
</div>; */
}
