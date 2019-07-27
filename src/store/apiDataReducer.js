const intitialState = {};

export default function apiDataReducer(state = intitialState, action) {
    if (action.type === `GET_GIT_USER_LIST`) {

        const newState = {
            ...state,
            ...action.data,
        };

        return newState;
    }
    return state;
}
