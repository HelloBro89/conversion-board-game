import {
    SET_SOCKET_HOST_DATA,
    SET_SOCKET_CONNECTION,
    SET_PLAYER_NAMES,
} from '../actions/socketsDataAction';
import { IInitialState } from '../../interfaces/Interfaces';

const initialState: IInitialState = {
    hostsData: [],
    connectedSocket: {},
    playerNames: ['Pasha', 'Veronika', 'Lucky'],
};

function socketsDataReducer(state = initialState, action: { type: string; payload: any }) {
    // console.log(state);
    switch (action.type) {
        case SET_SOCKET_HOST_DATA:
            return { ...state, hostsData: action.payload };
        case SET_SOCKET_CONNECTION:
            return { ...state, connectedSocket: action.payload };
        case SET_PLAYER_NAMES:
            return { ...state, playerNames: action.payload };

        default:
            return state;
    }
}
export default socketsDataReducer;
