export const SET_NICK_NAME = 'SET_NICK_NAME';
export const SET_STATUS_MODAL_WINDOW = 'SET_STATUS_MODAL_WINDOW';

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
