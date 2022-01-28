import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { RootState } from '../../redux';
import { setNickName, setRoomName } from '../../redux/actions/appDataAction';
// import {
//     setHostData,
//     setNewHost,
//     setSocketConnection,
// } from '../../redux/actions/socketsDataAction';
import { setMainEvents } from '../../helpers/setMainEvents';

export const HostRoom = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams /* setSearchParams */] = useSearchParams();
    const { playerNames, connectedSocket } = useSelector((state: RootState) => state.socketsData);
    const { roomName, nickName } = useSelector((state: RootState) => state.appData);

    const dispatch = useDispatch();
    useEffect(() => {
        console.log(`USE EFFECT --- HOST ROOM`);
        const locationParams = location.search;

        console.log(locationParams);

        const windowLocationHref = window.location.href;
        const neededParams = windowLocationHref.split('/')[4].split('=')[1];

        const fullPathForcomparison = `/hostRoom/${params.hostName}?nickName=${neededParams}`;
        const comparisonPathSecond = `/hostRoom/${params.hostName}?nickName=${neededParams}/`;

        if (
            fullPathForcomparison !== `${location.pathname}${locationParams}` &&
            comparisonPathSecond !== `${location.pathname}${locationParams}`
        ) {
            navigate('/error');
        }

        if (Object.keys(connectedSocket).length !== 0) {
            // console.log('There is a SOCKET');
            connectedSocket.emit('joinToRoom', params.hostName);
            connectedSocket.on(`connectToRoom`, (data: any) => {
                console.log(data);
            });
            return;
        }
        const nickName = searchParams.get('nickName');
        dispatch(setNickName(nickName!));
        dispatch(setRoomName(params.hostName!));

        const socket = socketIOClient();
        setMainEvents(socket, (setAction) => dispatch(setAction));

        socket.emit('joinToRoom', params.hostName);

        socket.on(`connectToRoom`, (data) => {
            console.log('TEST connectToRoom ' + data);
        });

        // window.onbeforeunload = () => {
        //     return true;
        // };
    }, []);

    const test = () => {
        console.log(`Current socket in redux: ${connectedSocket}`);
        console.log(`Current nickName in redux ${nickName}`);
        console.log(`Current room-name in redux ${roomName}`);
    };

    return (
        <div>
            <button style={{ marginTop: '100px' }} onClick={test}>
                view data
            </button>
            {playerNames.length ? (
                <div style={{ marginTop: '200px' }}>
                    {playerNames.map((item: string, ind: number) => (
                        <div key={ind}>{item}</div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};
