import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { RootState } from '../../redux';
import { setHostName, setNickName } from '../../redux/actions/appDataAction';
import { setMainEvents } from '../../helpers/setMainEvents';
import { setPlayerNames } from '../../redux/actions/socketsDataAction';

export const HostRoom = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams /* setSearchParams */] = useSearchParams();
    const { playerNames, connectedSocket, hostsData } = useSelector(
        (state: RootState) => state.socketsData
    );
    const { nickName } = useSelector((state: RootState) => state.appData);

    useEffect(() => {
        console.log(`USE EFFECT --- HOST ROOM`);
        const locationParams = location.search;
        const fullPath = window.location.href;

        const neededParamsNickName = fullPath.split('?')[1].split('&');
        const nickNameParam = neededParamsNickName[0].split('=')[1];
        const checkHostParam = neededParamsNickName[1].split('/')[0].split('=')[1];

        // const comparisonPath = `/hostRoom/${params.hostName}?${nickNameParam}&${checkHostParam}`;
        const comparisonPath = `/hostRoom/${params.hostName}?nickName=${nickNameParam}&checkHost=${checkHostParam}`;

        if (
            (comparisonPath !== `${location.pathname}${locationParams}` &&
                comparisonPath + '/' !== `${location.pathname}${locationParams}`) ||
            nickNameParam === '' ||
            (checkHostParam !== 'true' && checkHostParam !== 'false')
        ) {
            navigate('/error');
            return;
        }
        const checkHostFromUrlParams = searchParams.get('checkHost');
        if (Object.keys(connectedSocket).length !== 0) {
            if (checkHostFromUrlParams === 'false') {
                connectedSocket.emit('joinToRoom', { roomName: params.hostName, nickName });
                // connectedSocket.on(
                //     'connectToRoom',
                //     (data: { message: string; playerNames: string[] }) => {
                //         dispatch(setPlayerNames(data.playerNames));
                //         console.log(`Listen connect to ROOM`);
                //         // console.log(data);
                //         // console.log(data.message);
                //     }
                // );
                console.log(` STATUS --- ${checkHostFromUrlParams}`);
            }

            connectedSocket.on(
                'connectToRoom',
                (data: { message: string; playerNames: string[] }) => {
                    dispatch(setPlayerNames(data.playerNames));
                    console.log(`Listen connect to ROOM`);
                    // console.log(data);
                    // console.log(data.message);
                }
            );
            connectedSocket.on(
                `leavingTheRoom`,
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

        const nickNameFromParams = searchParams.get('nickName');

        dispatch(setNickName(nickNameFromParams!));
        dispatch(setHostName(params.hostName!));

        const socket = socketIOClient('http://localhost:4000');

        if (checkHostFromUrlParams === 'true') {
            // socket.emit('newHost', newHostData); // HERE WILL BE A localstorage data
            console.log(`STATUS --- ${checkHostFromUrlParams}`);
        }

        setMainEvents(socket, (setAction) => dispatch(setAction));
        socket.emit('joinToRoom', { roomName: params.hostName, nickName });
        socket.on('connectToRoom', (data: { message: string; playerNames: string[] }) => {
            dispatch(setPlayerNames(data.playerNames));
            // console.log(data);
            // console.log(data.message);
        });

        socket.on(`leavingTheRoom`, (data) => {
            console.log('TEST leavingTheRoom ' + data);
        });

        // window.onbeforeunload = () => {
        //     return true;
        // };
    }, []);

    const test = () => {
        const data = localStorage.getItem('roomData');
        console.log(data);

        // console.log(`Socket ID ${connectedSocket.id}`);
        // console.log('Current socket in redux: ');
        // console.log(connectedSocket);
        // console.log(`Socket rooms:`);
        // console.log(connectedSocket.rooms);
        // console.log(`Current nickName in redux ${nickName}`);
        // console.log('Player names:');
        // console.log(playerNames);
        // console.log('Check HostData:');
        // console.log(hostsData);
        // console.log(hostsData[0].players[0]);
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
                        <div style={{ marginLeft: '10px', backgroundColor: 'red' }} key={ind}>
                            {item}
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};
