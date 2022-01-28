import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../redux';
import styles from '../lobbyStyle.module.css';
import { IHostData } from '../../../interfaces/Interfaces';
import { setRoomName } from '../../../redux/actions/appDataAction';

export const ConnectInfo = () => {
    const dispatch = useDispatch();
    const foundHostDate = useSelector((state: RootState) => state.socketsData.hostsData);
    const foundNickName = useSelector((state: RootState) => state.appData.nickName);
    // const socketClient = useSelector((state: RootState) => state.socketsData.connectedSocket);
    const navigate = useNavigate();

    const rootChange = (e: MouseEvent) => {
        const hostName = e.currentTarget.firstElementChild?.textContent;
        // console.log(`Joined to room --- ${hostName}`);
        dispatch(setRoomName(hostName!));
        // socketClient.emit('joinToRoom', hostName);
        console.log(`CONNECTION PATH TO ROOM: ${`/hostRoom/${hostName}nickName=${foundNickName}`}`);

        const path = `/hostRoom/${hostName}?nickName=${foundNickName}`;

        navigate(path);
    };
    return (
        <div>
            {/* {console.log(`parsing hosts ${JSON.stringify(foundHostDate)}`)} */}
            {foundHostDate.length ? (
                <div>
                    {foundHostDate.map((item: IHostData, ind: number) => (
                        <div
                            onDoubleClick={(e) => rootChange(e)}
                            key={ind}
                            className={ind % 2 === 0 ? styles.connectInfo : styles.connectInfoTwo}
                        >
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
