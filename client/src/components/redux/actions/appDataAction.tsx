import { Dispatch } from 'redux';
import axios from '../../services/api';

export const SET_NICK_NAME = 'SET_NICK_NAME';
export const SET_STATUS_MODAL_WINDOW = 'SET_STATUS_MODAL_WINDOW';
export const SET_NUMBER_OF_PLAYERS = 'SET_NUMBER_OF_PLAYERS';
export const SET_GAME_TIME = 'SET_GAME_TIME';
export const SET_HOST_NAME = 'SET_HOST_NAME';
export const SET_CHECK_HOST = 'SET_CHECK_HOST';
export const RESET_APP_DATA = 'RESET_APP_DATA';
export const SET_TEMPORARY_NICK_NAME = 'SET_TEMPORARY_NICK_NAME';

export function receiveReq(value: string) {
    return {
        type: SET_NICK_NAME,
        payload: value,
    };
}

export function setTemporaryNickName(value: string) {
    return {
        type: SET_TEMPORARY_NICK_NAME,
        payload: value,
    };
}

export function setNickName(value: string) {
    return async (dispatch: Dispatch) => {
        const res = await axios.get(`/chekcNickName/${value}`);
        console.log(res.data.existence);

        if (res.data.existence !== -1) {
            return true;
        } else {
            dispatch(receiveReq(value));
            return false;
        }
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

export function setCheckHost(value: boolean) {
    return {
        type: SET_CHECK_HOST,
        payload: value,
    };
}
export function resetAppData() {
    return {
        type: RESET_APP_DATA,
    };
}

// export const SET_NICK_NAME = 'SET_NICK_NAME';
// export const SET_STATUS_MODAL_WINDOW = 'SET_STATUS_MODAL_WINDOW';
// export const SET_NUMBER_OF_PLAYERS = 'SET_NUMBER_OF_PLAYERS';
// export const SET_GAME_TIME = 'SET_GAME_TIME';
// export const SET_HOST_NAME = 'SET_HOST_NAME';
// export const SET_CHECK_HOST = 'SET_CHECK_HOST';
// export const RESET_APP_DATA = 'RESET_APP_DATA';

// export function setNickName(value: string) {
//     return {
//         type: SET_NICK_NAME,
//         payload: value,
//     };
// }

// export function setModalStatus(value: boolean) {
//     return {
//         type: SET_STATUS_MODAL_WINDOW,
//         payload: value,
//     };
// }

// export function setNumberOfPlayers(value: string) {
//     return {
//         type: SET_NUMBER_OF_PLAYERS,
//         payload: value,
//     };
// }
// export function setGameTime(value: string) {
//     return {
//         type: SET_GAME_TIME,
//         payload: value,
//     };
// }
// export function setHostName(value: string) {
//     return {
//         type: SET_HOST_NAME,
//         payload: value,
//     };
// }

// export function setCheckHost(value: boolean) {
//     return {
//         type: SET_CHECK_HOST,
//         payload: value,
//     };
// }
// export function resetAppData() {
//     return {
//         type: RESET_APP_DATA,
//     };
// }
