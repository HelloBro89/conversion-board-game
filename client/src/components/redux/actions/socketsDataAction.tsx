export const SET_SOCKET_HOST_DATA = 'SET_SOCKET_HOST_DATA';

export function setHostData(value: []) {
    return {
        type: SET_SOCKET_HOST_DATA,
        payload: value,
    };
}
