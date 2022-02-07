import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';
import styles from '../lobbyStyle.module.css';
import { ConnectInfo } from '../containers/ConnectInfo';
import { RootState } from '../../../redux';
import { setNickName, setModalStatus, setHostName } from '../../../redux/actions/appDataAction';
import { HostSettings } from '../containers/HostSettings';
import { setMainEvents } from '../../../helpers/setMainEvents';

export const Lobby = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { nickName, hostName } = useSelector((state: RootState) => state.appData);
    const { connectedSocket, hostsData, playerNames } = useSelector(
        (state: RootState) => state.socketsData
    );
    const dataOne = useSelector((state: RootState) => state.socketsData);
    const dataTwo = useSelector((state: RootState) => state.appData);

    useEffect(() => {
        console.log(`USE EFFECT --- LOBBY`);

        console.log(`All params LOBBY`);
        console.log(dataOne);
        console.log(dataTwo);

        console.log(`********* ${params.nickName} - ${nickName}`);

        if (params.nickName !== nickName) {
            dispatch(setNickName(params.nickName!));
        }
        if (Object.keys(connectedSocket).length !== 0) {
            console.log(`foundRoomName - ${hostName}`);

            connectedSocket.removeAllListeners('connectToRoom');
            connectedSocket.removeAllListeners('leavingTheRoom');
            console.log(`!!!!!!!!!!!`);
            console.log(playerNames);

            if (hostName !== '') {
                console.log(`User left ${connectedSocket.id}`);
                // connectedSocket.disconnect();
                connectedSocket.emit('leaveTheRoom', hostName);
                dispatch(setHostName(''));

                // dispatch(setRoomName(''));
            }
            return;
        }

        const socket = socketIOClient('http://localhost:4000', { query: { nickName: nickName } });
        setMainEvents(socket, (setAction) => dispatch(setAction));

        // window.onbeforeunload = () => {
        //     return true;
        // };
    }, []);

    const getHostMenu = () => {
        // console.log(hostsData);
        dispatch(setModalStatus(true));
    };

    const testBut = () => {
        console.log('Hosts:');
        console.log(hostsData);
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
            <button onClick={testBut} className={styles.createHost}>
                TEST
            </button>
            <button onClick={getHostMenu} className={styles.createHost}>
                Create host
            </button>
            <HostSettings />
        </div>
    );
};
