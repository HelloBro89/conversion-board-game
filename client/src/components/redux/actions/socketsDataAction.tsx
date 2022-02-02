import { IHostData } from '../../interfaces/Interfaces';
export const SET_SOCKET_HOST_DATA = 'SET_SOCKET_HOST_DATA';
export const SET_SOCKET_CONNECTION = 'SET_SOCKET_CONNECTION';
export const SET_PLAYER_NAMES = 'SET_PLAYER_NAMES';
export const SET_NEW_HOST = 'SET_NEW_HOST';

export function setHostData(value: IHostData[]) {
    return {
        type: SET_SOCKET_HOST_DATA,
        payload: value,
    };
}
export function setSocketConnection(value: any) {
    return {
        type: SET_SOCKET_CONNECTION,
        payload: value,
    };
}
export function setPlayerNames(value: string[]) {
    return {
        type: SET_PLAYER_NAMES,
        payload: value,
    };
}
export function setNewHost(value: IHostData) {
    return {
        type: SET_NEW_HOST,
        payload: value,
    };
}
