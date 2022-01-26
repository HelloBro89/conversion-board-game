export const SET_NICK_NAME = 'SET_NICK_NAME';
export const SET_STATUS_MODAL_WINDOW = 'SET_STATUS_MODAL_WINDOW';
export const SET_NUMBER_OF_PLAYERS = 'SET_NUMBER_OF_PLAYERS';
export const SET_GAME_TIME = 'SET_GAME_TIME';
export const SET_HOST_NAME = 'SET_HOST_NAME';
export const SET_SOCKET_HOST_DATA = 'SET_SOCKET_HOST_DATA';
export const SET_ROOM_NAME = 'SET_ROOM_NAME';

export function setNickName(value: string) {
    return {
        type: SET_NICK_NAME,
        payload: value,
    };
}

export function setModalStatus(value: boolean) {
    return {
        type: SET_STATUS_MODAL_WINDOW,
        payload: value,
    };
}

export function setNumberOfPlayers(value: string) {
    return {
        type: SET_NUMBER_OF_PLAYERS,
        payload: value,
    };
}
export function setGameTime(value: string) {
    return {
        type: SET_GAME_TIME,
        payload: value,
    };
}
export function setHostName(value: string) {
    return {
        type: SET_HOST_NAME,
        payload: value,
    };
}

export function setHostSocketData(value: []) {
    return {
        type: SET_SOCKET_HOST_DATA,
        payload: value,
    };
}
export function setRoomName(value: string) {
    return {
        type: SET_ROOM_NAME,
        payload: value,
    };
}
