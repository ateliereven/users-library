import {
    CREATE_USER,
    FETCH_USERS,
    EDIT_USER,
    DELETE_USER
} from "../actions/types";

const userReducer = (state = [], action) => {
    switch (action.type) {
        case CREATE_USER:
            return [...state, action.payload ];
        case EDIT_USER:
            return [...state.filter(user => user._id !== action.payload._id), action.payload];
        case FETCH_USERS:
            return [ ...state, ...action.payload ];
        case DELETE_USER:
            return state.filter(user => user !== action.payload);
        default: return state;
    }
}

export default userReducer;
