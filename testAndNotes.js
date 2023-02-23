// *******************    COMPRASSION URL ADRESS with params and strick url

// const locationParams = location.search;
// const fullPath = window.location.href;

// const neededParamsNickName = fullPath.split('?')[1].split('&');
// // const nickNameParam = neededParamsNickName[0];
// // const checkHostParam = neededParamsNickName[1].split('/')[0];
// const nickNameParam = neededParamsNickName[0].split('=')[1];
// const checkHostParam = neededParamsNickName[1].split('/')[0].split('=')[1];

// // const comparisonPath = `/hostRoom/${params.hostName}?${nickNameParam}&${checkHostParam}`;
// const comparisonPath = `/hostRoom/${params.hostName}?nickName=${nickNameParam}&checkHost=${checkHostParam}`;
// console.log(comparisonPath);

// console.log(`Nick name params --- ${nickNameParam}`);
// console.log(`CHeck host params --- ${checkHostParam}`);
// if (
//     (comparisonPath !== `${location.pathname}${locationParams}` && comparisonPath + '/' !== `${location.pathname}${locationParams}`) ||
//     nickNameParam === '' ||
//     (checkHostParam !== 'true' && checkHostParam !== 'false')
// ) {
//     navigate('/error');
//     return;
// }

// DELETE
// let newArr = { ...users, players: [...users.players.filter((item) => item !== whoDel)] };

////////////////////////////////////////////////////////////////////////////
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

// import { Dispatch } from 'redux';
// import { checkUniqueNickName } from '../../requests/requests';
// import axios from '../../services/api';

// export const SET_NICK_NAME = 'SET_NICK_NAME';
// export const SET_STATUS_MODAL_WINDOW = 'SET_STATUS_MODAL_WINDOW';
// export const SET_NUMBER_OF_PLAYERS = 'SET_NUMBER_OF_PLAYERS';
// export const SET_GAME_TIME = 'SET_GAME_TIME';
// export const SET_HOST_NAME = 'SET_HOST_NAME';
// export const SET_CHECK_HOST = 'SET_CHECK_HOST';
// export const RESET_APP_DATA = 'RESET_APP_DATA';
// export const SET_TEMPORARY_NICK_NAME = 'SET_TEMPORARY_NICK_NAME';
// export const GET_ERROR = 'GET_ERROR';

// export function testSetNickName(value: string) {
//     return {
//         type: SET_NICK_NAME,
//         payload: value,
//     };
// }

// export function getError(value: string) {
//     return {
//         type: GET_ERROR,
//         payload: value,
//     };
// }

// export function setNickName(value: string) {
//     return async (dispatch: Dispatch) => {
//         const res = await axios.get(`/chekcNickName/${value}`);
//         console.log(res.data.existence);
//         console.log(res.data);

//         if (res.data.existence) {
//             alert(`This Nick-name ---${value} already exist!!!`);
//             return dispatch(getError('ERROR'));
//         } else {
//             return dispatch(testSetNickName(value));
//         }
//     };
// }
// export function setNickName(value: string) {
//     return {
//         type: SET_NICK_NAME,
//         payload: value,
//     };
// }

// export function setTemporaryNickName(value: string) {
//     return {
//         type: SET_TEMPORARY_NICK_NAME,
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
