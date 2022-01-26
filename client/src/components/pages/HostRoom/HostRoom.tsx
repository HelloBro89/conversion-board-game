import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { RootState } from '../../redux';
import { setSocketConnection } from '../../redux/actions/socketsDataAction';

export const HostRoom = () => {
    const params = useParams();
    const foundNames = useSelector((state: RootState) => state.socketsData.playerNames);
    const socketClient = useSelector((state: RootState) => state.socketsData.connectedSocket);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(`USE EFFECT --- HOST ROOM`);

        if (Object.keys(socketClient).length !== 0) {
            console.log('There is a SOCKET');
            socketClient.emit('joinToRoom', params.hostName);
            socketClient.on(`connectToRoom`, (data: any) => {
                console.log(data);
            });
            return;
        }

        const socket = socketIOClient();
        dispatch(setSocketConnection(socket));

        socket.emit('joinToRoom', params.hostName);

        // if (params.hostName !== foundHostName) {
        //     dispatch(setHostName(params.hostName!));
        //     socket.emit('joinToRoom', params.hostName);
        // }
        console.log('TEST connectToRoom');
        socket.on(`connectToRoom`, (data: any) => {
            console.log(data);
        });

        // window.onbeforeunload = () => {
        //     return true;
        // };
    }, []);

    return (
        <div>
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
