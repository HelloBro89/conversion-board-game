export const SET_SOCKET_HOST_DATA = 'SET_SOCKET_HOST_DATA';
export const SET_SOCKET_CONNECTION = 'SET_SOCKET_CONNECTION';

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
