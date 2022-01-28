import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';
import styles from '../lobbyStyle.module.css';
import { ConnectInfo } from '../containers/ConnectInfo';
import { RootState } from '../../../redux';
import { setNickName, setModalStatus, setRoomName } from '../../../redux/actions/appDataAction';
import { setSocketConnection } from '../../../redux/actions/socketsDataAction';
import { HostSettings } from '../containers/HostSettings';
import { setMainEvents } from '../../../helpers/setMainEvents';

export const Lobby = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { nickName, roomName } = useSelector((state: RootState) => state.appData);
    const { connectedSocket, hostsData } = useSelector((state: RootState) => state.socketsData);

    useEffect(() => {
        console.log(`USE EFFECT --- LOBBY`);
        // console.log(`Current socket in redux: ${connectedSocket}`);

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
        console.log(typeof socket);

        // dispatch(setSocketConnection(socket));
        setMainEvents(socket, (setAction) => dispatch(setAction));

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
