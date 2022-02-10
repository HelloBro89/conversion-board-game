import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { RootState } from '../../redux';
import { setCheckHost, setHostName, setNickName } from '../../redux/actions/appDataAction';
import { setMainEvents } from '../../helpers/setMainEvents';
import { setPlayerNames } from '../../redux/actions/socketsDataAction';
import { IHostData } from '../../interfaces/Interfaces';

export const HostRoom = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams /* setSearchParams */] = useSearchParams();
    const { playerNames, connectedSocket } = useSelector((state: RootState) => state.socketsData);
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
        const nickNameFromParams = searchParams.get('nickName');

        if (Object.keys(connectedSocket).length !== 0) {
            connectedSocket.emit('joinToRoom', { roomName: params.hostName, nickName });
            console.log(` STATUS --- ${checkHostFromUrlParams}`);
            connectedSocket.on(
                'connectToRoom',
                (data: { message: string; playerNames: string[] }) => {
                    dispatch(setPlayerNames(data.playerNames));
                    console.log(`******** Connect to room EVENT`);
                }
            );
            connectedSocket.on(
                `leavingTheRoom`,
                (data: { message: string; masterHost?: boolean; players?: string[] }) => {
                    if (data.masterHost === true) {
                        alert('Host has left this room !');
                        console.log(`Host has left this room !`);
                        navigate(`/lobby/${nickNameFromParams}`);
                        // navigate('/error');
                    } else if (data.masterHost === false) {
                        alert('Player has left the room !');
                        dispatch(setPlayerNames(data.players!));
                        console.log(data.players);
                    } else {
                        alert('Something else!!!!!!!!!');
                        console.log(data.message);
                    }
                }
            );
            return;
        }

        dispatch(setHostName(params.hostName!));
        // if (nickName === '') {
        (async () => {
            const checkExistingNickName = await dispatch(setNickName(nickNameFromParams!));
            console.log('TEST');

            console.log(checkExistingNickName);
            if (checkExistingNickName as unknown) {
                alert(`Nick name already exist!!!`);
                navigate('/');
                return;
            }
        })();
        // }

        const socket = socketIOClient('http://localhost:4000', {
            query: { nickName: nickNameFromParams },
        });
        setMainEvents(socket, (setAction) => dispatch(setAction));

        if (checkHostFromUrlParams === 'true') {
            const roomDataLocalStorage = localStorage.getItem('roomData');

            if (roomDataLocalStorage) {
                const parseJSON: IHostData = JSON.parse(roomDataLocalStorage);
                if (params.hostName !== parseJSON.hostName) {
                    navigate('/error');
                }

                dispatch(setHostName(parseJSON.hostName));

                const refreshedHost = {
                    numOfPlayers: parseJSON.hostName,
                    gameTime: parseJSON.gameTime,
                    hostName: parseJSON.hostName,
                    // hostID: socket.id,
                    players: [],
                };
                console.log(`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! `);
                socket.emit('newHost', refreshedHost); // HERE WILL BE A localstorage data
            }
            dispatch(setCheckHost(true));
        }
        socket.emit('joinToRoom', { roomName: params.hostName, nickName: nickNameFromParams });

        socket.on('connectToRoom', (data: { message: string; playerNames: string[] }) => {
            console.log(`Array of players names:`);
            console.log(data.playerNames);

            dispatch(setPlayerNames(data.playerNames));
        });

        socket.on(
            `leavingTheRoom`,
            (data: { message: string; masterHost?: boolean; players?: string[] }) => {
                if (data.masterHost === true) {
                    alert('Host has left this room !');
                    console.log(`Host has left this room !`);
                    navigate(`/lobby/${nickNameFromParams}`);
                    // navigate('/error');
                } else if (data.masterHost === false) {
                    dispatch(setPlayerNames(data.players!));
                    console.log(data.players);
                    alert('Player has left the room !');
                } else {
                    alert('Something else!!!!!!!!!');
                    console.log(data.message);
                }
            }
        );

        // window.onbeforeunload = () => {
        //     return true;
        // };
    }, []);

    return (
        <div>
            {console.log(playerNames)}
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
