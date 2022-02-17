import {
    SET_SOCKET_HOST_DATA,
    SET_SOCKET_CONNECTION,
    SET_PLAYER_NAMES,
    SET_NEW_HOST,
    DEL_HOST,
    RESET_SOCKET_DATA,
} from '../actions/socketsDataAction';
import { IInitialState } from '../../interfaces/Interfaces';

const initialState: IInitialState = {
    hostsData: [],
    connectedSocket: {},
    playerNames: [],
};

function socketsDataReducer(state = initialState, action: { type: string; payload: any }) {
    switch (action.type) {
        case SET_SOCKET_HOST_DATA:
            return { ...state, hostsData: action.payload };

        case SET_NEW_HOST:
            return { ...state, hostsData: [...state.hostsData, action.payload] };

        case DEL_HOST:
            // return {
            //     ...state,
            //     hostsData: [...state.hostsData.filter((item) => item.hostName !== action.payload)],
            // };
            return {
                ...state,
                hostsData: state.hostsData.filter((item) => item.hostName !== action.payload),
            };

        case SET_SOCKET_CONNECTION:
            return { ...state, connectedSocket: action.payload };

        case SET_PLAYER_NAMES:
            return { ...state, playerNames: action.payload };

        case RESET_SOCKET_DATA:
            return initialState;

        default:
            return state;
    }
}
export default socketsDataReducer;
