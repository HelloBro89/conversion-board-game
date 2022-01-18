import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../lobbyStyle.module.css';
import { ConnectInfo } from '../containers/ConnectInfo';
import { RootState } from '../../../redux';
import { setNickName, setModalStatus } from '../../../redux/actions/appDataAction';
import { HostSettings } from '../containers/hostSettings';
// import { HostSettings } from '../containers/HostSettings';
// import { useDispatch, useSelector } from 'react-redux';

export const Lobby = () => {
    const dispatch = useDispatch();
    const findNickName = useSelector((state: RootState) => state.appData.nickName);
    const findModalStatus = useSelector((state: RootState) => state.appData.modalStatus);
    const params = useParams();

    useEffect(() => {
        if (params.nickName !== findNickName) {
            dispatch(setNickName(params.nickName!));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getHostMenu = () => {
        dispatch(setModalStatus(true));
        // console.log(findModalStatus);
    };

    // const test = () => {
    //     console.log(findModalStatus.status);
    // };

    return (
        <div className={styles.container}>
            <div className={styles.connectionList}>
                <div className={styles.listHeader}>
                    <div className={styles.firstCol}>Host name</div>
                    <div className={styles.secondCol}>Game time</div>
                    <div className={styles.thirdCol}>Number of persons</div>
                </div>
                <ConnectInfo />
            </div>
            <button onClick={getHostMenu} className={styles.createHost}>
                Create host
            </button>
            {/* <button onClick={test}>test</button> */}
            <HostSettings />
        </div>
    );
};
