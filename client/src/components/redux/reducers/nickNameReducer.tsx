import { SET_NICK_NAME } from '../actions/nickNameAction';

const initialState = {
    nickName: 'NICK-NAME',
};

function nickNameReducer(state = initialState, action: { type: string; payload: string }) {
    switch (action.type) {
        case SET_NICK_NAME:
            return { ...state, nickName: action.payload };

        default:
            return state;
    }
}
export default nickNameReducer;
