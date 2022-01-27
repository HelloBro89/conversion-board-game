import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { RootState } from '../../redux';
import { setNickName, setRoomName } from '../../redux/actions/appDataAction';
import {
    setHostData,
    setNewHost,
    setSocketConnection,
} from '../../redux/actions/socketsDataAction';

export const HostRoom = () => {
    const params = useParams();
    const [searchParams /* setSearchParams */] = useSearchParams();
    const foundNames = useSelector((state: RootState) => state.socketsData.playerNames);
    const socketClient = useSelector((state: RootState) => state.socketsData.connectedSocket);
    const foundRoomName = useSelector((state: RootState) => state.appData.roomName);
    const foundNickName = useSelector((state: RootState) => state.appData.nickName);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(`USE EFFECT --- HOST ROOM`);
        // console.log(`searchParams TEST ${searchParams.get('nickName')}`);
        // console.log(`Are there SOCKETS ${socketClient}`);
        // console.log(`Room name ${foundRoomName}`);
        // console.log(`CHECK ROOM NAME from params.hostName  --- ${JSON.stringify(params.hostName)}`);
        if (Object.keys(socketClient).length !== 0) {
            // console.log('There is a SOCKET');
            socketClient.emit('joinToRoom', params.hostName);

            // dispatch(setRoomName(params.hostName!));
            // socketClient.removeAllListeners('hostsData');
            socketClient.on(`connectToRoom`, (data: any) => {
                console.log(data);
            });
            return;
        }
        const nickName = searchParams.get('nickName');
        dispatch(setNickName(nickName!));
        dispatch(setRoomName(params.hostName!));
        const socket = socketIOClient();
        dispatch(setSocketConnection(socket));
        socket.emit('joinToRoom', params.hostName);
        socket.on(`connectToRoom`, (data: any) => {
            console.log('TEST connectToRoom ' + data);
        });
        socket.on('addNewHost', (data: any) => {
            dispatch(setNewHost(data));
            console.log(`added new host ${JSON.stringify(data)}`);
        });

        socket.on('hostsData', (data: []) => {
            console.log(`All hosts --- ${JSON.stringify(data)}`);
            dispatch(setHostData(data));
        });
        // window.onbeforeunload = () => {
        //     return true;
        // };
    }, []);

    const test = () => {
        console.log(foundNickName);
        console.log(`room name ${foundRoomName}`);
    };

    return (
        <div>
            <button style={{ marginTop: '100px' }} onClick={test}></button>
            {foundNames.length ? (
                <div style={{ marginTop: '200px' }}>
                    {foundNames.map((item: string, ind: number) => (
                        <div key={ind}>{item}</div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};
