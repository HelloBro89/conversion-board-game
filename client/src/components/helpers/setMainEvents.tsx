import {
    IHostData,
    ISetNewHost,
    ISetHostsData,
    ISetSocketConnection,
} from '../interfaces/Interfaces';
import { setHostData, setNewHost, setSocketConnection } from '../redux/actions/socketsDataAction';
import { Dispatch } from 'react';

export const setMainEvents = (
    socket: any,
    dispatch: Dispatch<ISetNewHost | ISetHostsData | ISetSocketConnection>
) => {
    dispatch(setSocketConnection(socket));

    socket.on('addNewHost', (data: IHostData) => {
        dispatch(setNewHost(data));
        console.log(`added new host ${JSON.stringify(data)}`);
    });
    socket.on('hostsData', (data: IHostData[]) => {
        console.log(`All hosts --- ${JSON.stringify(data)}`);
        dispatch(setHostData(data));
    });
};
