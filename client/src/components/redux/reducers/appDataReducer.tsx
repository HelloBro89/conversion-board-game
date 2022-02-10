import {
    SET_NICK_NAME,
    SET_STATUS_MODAL_WINDOW,
    SET_NUMBER_OF_PLAYERS,
    SET_GAME_TIME,
    SET_HOST_NAME,
    SET_CHECK_HOST,
    RESET_APP_DATA,
    SET_TEMPORARY_NICK_NAME,
} from '../actions/appDataAction';

const initialState = {
    nickName: '',
    modalStatus: false,
    numOfPlayers: '2',
    gameTime: 'average',
    hostName: '',
    checkHost: false,
    temporaryNickName: '',
};

function appDataReducer(state = initialState, action: { type: string; payload: any }) {
    switch (action.type) {
        case SET_NICK_NAME:
            return { ...state, nickName: action.payload };

        case SET_TEMPORARY_NICK_NAME:
            return { ...state, temporaryNickName: action.payload };

        case SET_STATUS_MODAL_WINDOW:
            return { ...state, modalStatus: action.payload };

        case SET_NUMBER_OF_PLAYERS:
            return { ...state, numOfPlayers: action.payload };

        case SET_GAME_TIME:
            return { ...state, gameTime: action.payload };

        case SET_HOST_NAME:
            return { ...state, hostName: action.payload };

        case SET_CHECK_HOST:
            return { ...state, checkHost: action.payload };

        case RESET_APP_DATA:
            return initialState;

        default:
            return state;
    }
}
export default appDataReducer;

// import {
//     SET_NICK_NAME,
//     SET_STATUS_MODAL_WINDOW,
//     SET_NUMBER_OF_PLAYERS,
//     SET_GAME_TIME,
//     SET_HOST_NAME,
//     SET_CHECK_HOST,
//     RESET_APP_DATA,
//     SET_TEMPORARY_NICK_NAME,
//     CHECK_STATE_NICK_NAME,
//     CHECK_STATE_NICK_NAME_SUCCSESS,
// } from '../actions/appDataAction';

// const initialState = {
//     nickName: '',
//     modalStatus: false,
//     numOfPlayers: '2',
//     gameTime: 'average',
//     hostName: '',
//     checkHost: false,
//     temporaryNickName: '',
//     loading: false,
// };

// function appDataReducer(state = initialState, action: { type: string; payload: any }) {
//     switch (action.type) {
//         case CHECK_STATE_NICK_NAME:
//             return { ...state, loading: true };

//         case CHECK_STATE_NICK_NAME_SUCCSESS:
//             return { ...state, loading: true };

//         // case SET_STATE_NICK_NAME:
//         //     return { ...state, nickName: action.payload };

//         case SET_NICK_NAME:
//             return { ...state, nickName: action.payload };
//         case SET_TEMPORARY_NICK_NAME:
//             return { ...state, temporaryNickName: action.payload };

//         case SET_STATUS_MODAL_WINDOW:
//             return { ...state, modalStatus: action.payload };

//         case SET_NUMBER_OF_PLAYERS:
//             return { ...state, numOfPlayers: action.payload };

//         case SET_GAME_TIME:
//             return { ...state, gameTime: action.payload };

//         case SET_HOST_NAME:
//             return { ...state, hostName: action.payload };

//         case SET_CHECK_HOST:
//             return { ...state, checkHost: action.payload };

//         case RESET_APP_DATA:
//             return initialState;

//         default:
//             return state;
//     }
// }
// export default appDataReducer;
