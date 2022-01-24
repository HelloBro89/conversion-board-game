import { SET_SOCKET_HOST_DATA, SET_SOCKET_CONNECTION } from '../actions/socketsDataAction';
interface ISocketData {
    numOfPlayers: string;
    gameTime: string;
    hostName: string;
}

interface IInitialState {
    socketData: ISocketData[];
    socketClient: any;
}

const initialState: IInitialState = {
    socketData: [
        // { numOfPlayers: '2', gameTime: 'average', hostName: 'TEST TWO name' },
        // { numOfPlayers: '2', gameTime: 'average', hostName: 'TEST TWO name' },
    ],
    socketClient: {},
};

function socketsDataReducer(state = initialState, action: { type: string; payload: [] }) {
    switch (action.type) {
        case SET_SOCKET_HOST_DATA:
            return { ...state, socketData: action.payload };
        case SET_SOCKET_CONNECTION:
            return { ...state, socketClient: action.payload };

        default:
            return state;
    }
}
export default socketsDataReducer;
