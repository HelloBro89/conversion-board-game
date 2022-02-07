import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../redux';
import styles from '../lobbyStyle.module.css';
import { IHostData } from '../../../interfaces/Interfaces';
import { setHostName } from '../../../redux/actions/appDataAction';

export const ConnectInfo = () => {
    const dispatch = useDispatch();
    const { hostsData } = useSelector((state: RootState) => state.socketsData);
    const { nickName } = useSelector((state: RootState) => state.appData);
    // const socketClient = useSelector((state: RootState) => state.socketsData.connectedSocket);
    const navigate = useNavigate();

    const hostSelection = (e: MouseEvent) => {
        const hostName = e.currentTarget.childNodes[0].firstChild?.textContent;
        // console.log(`Joined to room --- ${hostName}`);
        dispatch(setHostName(hostName!));

        const path = `/hostRoom/${hostName}?nickName=${nickName}&checkHost=false`;

        navigate(path);
    };
    return (
        <div>
            {hostsData.length ? (
                <div>
                    {hostsData.map((item: IHostData, ind: number) => (
                        <div
                            onDoubleClick={(e) => hostSelection(e)}
                            key={ind}
                            className={ind % 2 === 0 ? styles.connectInfo : styles.connectInfoTwo}
                        >
                            <div className={styles.activeConnectInfo}>
                                <div className={styles.firstCol}>{item.hostName}</div>
                                <div className={styles.secondCol}>{item.gameTime}</div>
                                <div className={styles.thirdCol}>{item.numOfPlayers}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

// ************************************** OLDER *****************

{
    /* <NavLink
    className={styles.navToHost}
    key={ind}
    to={`/hostRoom/3`}
    onClick={(e) => e.preventDefault()}
    onDoubleClick={(e) => true}
>
</NavLink>; */
}

// return (
//     <div>
//         {foundHostDate.length ? (
//             <div>
//                 {/* {console.log(foundHostDate)} */}
//                 {foundHostDate.map((item: IHostData, ind: number) => (
//                     <div className={styles.connectInfo} key={ind}>
//                         <div className={styles.firstCol}>{item.hostName}</div>
//                         <div className={styles.secondCol}>{item.gameTime}</div>
//                         <div className={styles.thirdCol}>{item.numOfPlayers}</div>
//                     </div>
//                 ))}
//             </div>
//         ) : null}
//     </div>
// );
