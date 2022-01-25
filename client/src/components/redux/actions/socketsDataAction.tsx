export const SET_SOCKET_HOST_DATA = 'SET_SOCKET_HOST_DATA';
export const SET_SOCKET_CONNECTION = 'SET_SOCKET_CONNECTION';
export const SET_PLAYER_NAMES = 'SET_PLAYER_NAMES';

export function setHostData(value: []) {
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
export function setPlayerNames(value: any) {
    return {
        type: SET_PLAYER_NAMES,
        payload: value,
    };
}
