import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';
import styles from '../lobbyStyle.module.css';
import { ConnectInfo } from '../containers/ConnectInfo';
import { RootState } from '../../../redux';
import { setNickName, setModalStatus, setRoomName } from '../../../redux/actions/appDataAction';
import {
    setHostData,
    setSocketConnection,
    setNewHost,
} from '../../../redux/actions/socketsDataAction';
import { HostSettings } from '../containers/HostSettings';

export const Lobby = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { nickName, roomName } = useSelector((state: RootState) => state.appData);
    const { connectedSocket, hostsData } = useSelector((state: RootState) => state.socketsData);

    // const foundNickName = useSelector((state: RootState) => state.appData.nickName);
    // const foundRoomName = useSelector((state: RootState) => state.appData.roomName);

    // const connectedSocket = useSelector((state: RootState) => state.socketsData.connectedSocket);
    // const foundHosts = useSelector((state: RootState) => state.socketsData.hostsData);

    useEffect(() => {
        console.log(`USE EFFECT --- LOBBY`);
        console.log(connectedSocket);

        console.log(`********* ${params.nickName} - ${nickName}`);

        if (params.nickName !== nickName) {
            dispatch(setNickName(params.nickName!));
        }
        if (Object.keys(connectedSocket).length !== 0) {
            console.log(`foundRoomName -${roomName}`);

            if (roomName !== '') {
                console.log(`User left ${connectedSocket.id}`);
                // connectedSocket.disconnect();
                connectedSocket.emit('leaveTheRoom', roomName);
                // connectedSocket.removeAllListeners('connectToRoom'); // важная штука - удаляет событие
                dispatch(setRoomName(''));
            }
            return;
        }

        const socket = socketIOClient();
        dispatch(setSocketConnection(socket));

        socket.on('addNewHost', (data) => {
            dispatch(setNewHost(data));
            console.log(`added new host ${JSON.stringify(data)}`);
        });

        socket.on('hostsData', (data: []) => {
            console.log(`All hosts --- ${JSON.stringify(data)}`);
            dispatch(setHostData(data));
        });
        console.log(`TEST`);

        // window.onbeforeunload = () => {
        //     return true;
        // };
    }, []);

    const getHostMenu = () => {
        console.log(hostsData);
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
