import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';
import styles from '../lobbyStyle.module.css';
import { ConnectInfo } from '../containers/ConnectInfo';
import { RootState } from '../../../redux';
import { setNickName, setModalStatus } from '../../../redux/actions/appDataAction';
import { setHostData, setSocketConnection } from '../../../redux/actions/socketsDataAction';
import { HostSettings } from '../containers/HostSettings';

export const Lobby = () => {
    const dispatch = useDispatch();
    const foundNickName = useSelector((state: RootState) => state.appData.nickName);
    // const foundHostDate = useSelector((state: RootState) => state.socketsData.socketData);
    // const findModalStatus = useSelector((state: RootState) => state.appData.modalStatus);
    const params = useParams();

    useEffect(() => {
        // const socket = socketIOClient();
        const socket = socketIOClient();
        console.log('USE EFFECT');
        // console.log(socket.open());
        dispatch(setSocketConnection(socket));
        socket.on('hostsData', (data: []) => {
            dispatch(setHostData(data));
        });

        // window.onbeforeunload = () => {
        //     return true;
        // };
        if (params.nickName !== foundNickName) {
            dispatch(setNickName(params.nickName!));
        }
    }, []);

    const getHostMenu = () => {
        // console.log(foundHostDate[0]);
        dispatch(setModalStatus(true));
        // console.log(findModalStatus);
    };

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
            <HostSettings />
        </div>
    );
};
