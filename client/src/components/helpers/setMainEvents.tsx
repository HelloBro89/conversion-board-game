import {
    IHostData,
    ISetNewHost,
    ISetHostsData,
    ISetSocketConnection,
} from '../interfaces/Interfaces';
import {
    setHostData,
    setNewHost,
    setPlayerNames,
    setSocketConnection,
} from '../redux/actions/socketsDataAction';
import { Dispatch } from 'react';

export const setMainEvents = (
    socket: any,
    dispatch: Dispatch<ISetNewHost | ISetHostsData | ISetSocketConnection>
) => {
    dispatch(setSocketConnection(socket));
    // console.log(`SOCKET ID ${socket.id}`);
    // console.log(socket);
    socket.on('addNewHost', (data: IHostData) => {
        dispatch(setNewHost(data));
        console.log(`********* Added new host event`);
        console.log(`added new host ${JSON.stringify(data.players)}`);
        dispatch(setPlayerNames(data.players));
    });
    socket.on('hostsData', (data: IHostData[]) => {
        console.log(`Listener Host Data Event`);
        console.log(`All hosts --- ${JSON.stringify(data)}`);
        console.log(data);

        dispatch(setHostData(data));
    });
};
