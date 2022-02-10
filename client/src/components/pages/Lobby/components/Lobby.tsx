import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
    const navigate = useNavigate();
    const { nickName, hostName } = useSelector((state: RootState) => state.appData);
    const { connectedSocket, hostsData, playerNames } = useSelector(
        (state: RootState) => state.socketsData
    );

    useEffect(() => {
        console.log(`USE EFFECT --- LOBBY`);
        // console.log(`********* ${params.nickName} - ${nickName}`);

        // if (params.nickName !== nickName) {
        //     console.log(`Nick name check`);
        //     console.log(`${params.nickName} --- ${nickName}`);

        //     dispatch(setNickName(params.nickName!));
        // }

        if (Object.keys(connectedSocket).length !== 0) {
            console.log(`There is a SOCKET`);
            // console.log(`foundRoomName - ${hostName}`);
            // console.log(connectedSocket);

            connectedSocket.removeAllListeners('connectToRoom');
            connectedSocket.removeAllListeners('leavingTheRoom');
            // console.log(`!!!!!!!!!!!`);
            // console.log(playerNames);

            if (hostName !== '') {
                console.log(`User left ${connectedSocket.id}`);
                // connectedSocket.disconnect();
                connectedSocket.emit('leaveTheRoom', hostName);
                dispatch(setHostName(''));

                // dispatch(setRoomName(''));
            }
            return;
        }

        const socket = socketIOClient('http://localhost:4000', {
            query: { nickName: params.nickName },
        });
        setMainEvents(socket, (setAction) => dispatch(setAction));

        if (nickName === '') {
            (async () => {
                const checkExistingNickName = await dispatch(setNickName(params.nickName!));
                if (checkExistingNickName as unknown) {
                    alert(`Nick name already exist!!!`);
                    navigate('/');
                    return;
                }
            })();

            // dispatch(setNickName(params.nickName!));
        }

        // window.onbeforeunload = () => {
        //     return true;
        // };
    }, []);

    const getHostMenu = () => {
        // console.log(hostsData);
        dispatch(setModalStatus(true));
    };

    const testBut = () => {
        console.log('NIck name:');
        console.log(nickName);
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
