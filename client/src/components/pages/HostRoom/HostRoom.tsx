import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { RootState } from '../../redux';
import { setHostName, setNickName } from '../../redux/actions/appDataAction';
import { setMainEvents } from '../../helpers/setMainEvents';

export const HostRoom = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams /* setSearchParams */] = useSearchParams();
    const { playerNames, connectedSocket } = useSelector((state: RootState) => state.socketsData);
    const { nickName } = useSelector((state: RootState) => state.appData);

    const dispatch = useDispatch();
    useEffect(() => {
        console.log(`USE EFFECT --- HOST ROOM`);
        const locationParams = location.search;
        const windowLocationHref = window.location.href;
        const neededParams = windowLocationHref.split('/')[4].split('=')[1];

        // console.log(`Window full  ${windowLocationHref} `);
        // console.log(`All needed params ${windowLocationHref.split('/')[4].split('=')}`);
        // console.log(`Window zero ${neededParams}`);
        // console.log(`Window one ${windowLocationHref.split('/')[4].split('=')[0]} `);

        const comparisonPathFirst = `/hostRoom/${params.hostName}?nickName=${neededParams}`;
        // const comparisonPathSecond = `/hostRoom/${params.hostName}?nickName=${neededParams}/`;

        if (
            comparisonPathFirst !== `${location.pathname}${locationParams}` &&
            comparisonPathFirst + '/' !== `${location.pathname}${locationParams}`
        ) {
            navigate('/error');
            return;
        }

        if (Object.keys(connectedSocket).length !== 0) {
            // console.log('There is a SOCKET');
            connectedSocket.emit('joinToRoom', params.hostName);
            connectedSocket.on(
                `connectToRoom`,
                (data: { message: string; masterHost?: boolean }) => {
                    if (data.masterHost === false) {
                        alert('Host has left this room !');
                    } else if (data.masterHost === true) {
                        alert('Prosto user pokinyl komnatu');
                    } else {
                        console.log(data.message);
                    }
                }
            );
            return;
        }
        const nickName = searchParams.get('nickName');
        dispatch(setNickName(nickName!));
        dispatch(setHostName(params.hostName!));

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
        console.log(`Socket ID ${connectedSocket.id}`);
        console.log('Current socket in redux: ');
        console.log(connectedSocket);
        // console.log(`Socket rooms:`);
        // console.log(connectedSocket.rooms);
        console.log(`Current nickName in redux ${nickName}`);
        // console.log(`Current room-name in redux ${roomName}`);
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
