import { SET_SOCKET_HOST_DATA } from '../actions/socketsDataAction';

const initialState: IInitialState = {
    socketData: [
        // { numOfPlayers: '2', gameTime: 'average', hostName: 'TEST TWO name' },
        // { numOfPlayers: '2', gameTime: 'average', hostName: 'TEST TWO name' },
    ],
};

interface ISocketData {
    numOfPlayers: string;
    gameTime: string;
    hostName: string;
}

interface IInitialState {
    socketData: ISocketData[];
}

function socketsDataReducer(state = initialState, action: { type: string; payload: [] }) {
    switch (action.type) {
        case SET_SOCKET_HOST_DATA:
            return { ...state, socketData: action.payload };

        default:
            return state;
    }
}
export default socketsDataReducer;
