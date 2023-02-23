export const SET_NICK_NAME = 'SET_NICK_NAME';

export function setNickName(value: string) {
    return {
        type: SET_NICK_NAME,
        payload: value,
    };
}
