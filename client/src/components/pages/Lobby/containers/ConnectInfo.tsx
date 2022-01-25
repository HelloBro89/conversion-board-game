import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../redux';
// import { setHostData } from '../../../redux/actions/socketsDataAction';
import styles from '../lobbyStyle.module.css';
import { IHostData } from '../../../interfaces/Interfaces';
// import { NavLink } from 'react-router-dom';

export const ConnectInfo = () => {
    const foundHostDate = useSelector((state: RootState) => state.socketsData.hostsData);
    const navigate = useNavigate();

    const rootChange = () => {
        const path = `/hostRoom/3`;
        navigate(path);
        // alert('rootChange');
    };
    return (
        <div>
            {foundHostDate.length ? (
                <div>
                    {foundHostDate.map((item: IHostData, ind: number) => (
                        <div
                            onDoubleClick={rootChange}
                            key={ind}
                            //  className={styles.connectInfo}}
                            className={ind % 2 === 0 ? styles.connectInfo : styles.connectInfoTwo}
                            /* className={styles.connectInfo} */
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
