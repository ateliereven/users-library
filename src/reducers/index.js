import _ from 'lodash';
import {
    CREATE_USER,
    FETCH_USER,
    FETCH_USERS,
    EDIT_USER,
    DELETE_USER
} from "../actions/types";

const userReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_USER:
            return { ...state, [action.payload.id]: action.payload }; // [action.payload.id] is a new key we are assigning to the state object. not an array
        case CREATE_USER:
            return [...state, action.payload ];
        case EDIT_USER:
            return { ...state, [action.payload.id]: action.payload };
        case FETCH_USERS:
            return [ ...state, ...action.payload ]; // adding an array to the object. mapKey turns the array to an object and makes the id property into a key in the new object. ... is for spreading the object and adding the separate objects to the state object
        case DELETE_USER:
            return _.omit(state, action.payload); // omit doesnt change the original state object, creates new object without the item in the payload
        default: return state;
    }
}

export default userReducer;
