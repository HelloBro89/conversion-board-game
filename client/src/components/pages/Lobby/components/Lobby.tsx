import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';
import styles from '../lobbyStyle.module.css';
import { ConnectInfo } from '../containers/ConnectInfo';
import { RootState } from '../../../redux';
import { setNickName, setModalStatus, setRoomName } from '../../../redux/actions/appDataAction';
import { setHostData, setSocketConnection } from '../../../redux/actions/socketsDataAction';
import { HostSettings } from '../containers/HostSettings';

export const Lobby = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const foundNickName = useSelector((state: RootState) => state.appData.nickName);
    const socketClient = useSelector((state: RootState) => state.socketsData.connectedSocket);
    const foundRoomName = useSelector((state: RootState) => state.appData.roomName);

    useEffect(() => {
        console.log(`USE EFFECT --- LOBBY`);
        console.log(`********* ${params.nickName} - ${foundNickName}`);

        if (params.nickName !== foundNickName) {
            dispatch(setNickName(params.nickName!));
        }
        if (Object.keys(socketClient).length !== 0) {
            if (foundRoomName !== '') {
                console.log(`User left ${socketClient.id}`);
                // socketClient.disconnect();
                socketClient.emit('leaveTheRoom', foundRoomName);
                socketClient.removeAllListeners('connectToRoom'); // важная штука - удаляет событие
                dispatch(setRoomName(''));
            }
            return;
        }

        const socket = socketIOClient();
        dispatch(setSocketConnection(socket));
        socket.on('hostsData', (data: []) => {
            console.log('HOST DAATA');
            dispatch(setHostData(data));
        });

        // window.onbeforeunload = () => {
        //     return true;
        // };
    }, []);

    const getHostMenu = () => {
        // console.log(foundRoomName);
        dispatch(setModalStatus(true));
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
