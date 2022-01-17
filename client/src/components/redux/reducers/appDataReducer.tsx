import { SET_NICK_NAME, SET_STATUS_MODAL_WINDOW } from '../actions/appDataAction';

// interface IInitialState {
//     nickName: string;
//     test: boolean;
// }

const initialState = {
    nickName: '',
    modalStatus: false,
};

function nickNameReducer(state = initialState, action: { type: string; payload: any }) {
    switch (action.type) {
        case SET_NICK_NAME:
            // console.log(typeof action.payload);
            return { ...state, nickName: action.payload };
        case SET_STATUS_MODAL_WINDOW:
            return { ...state, modalStatus: action.payload };

        default:
            return state;
    }
}
export default nickNameReducer;
