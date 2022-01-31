import axios from "axios";

import {
    CREATE_USER,
    FETCH_USERS,
    EDIT_USER,
    DELETE_USER
} from "./types"


export const createUser = formValues => async (dispatch, getState) => {
    const newUser = { ...formValues, _id: getState().length + 1 };
    dispatch({
        type: CREATE_USER,
        payload: newUser
    });
}

export const fetchUsers = () => async dispatch => {
    const response = await axios.get('https://randomuser.me/api/?results=10.');
    const results = response.data.results;
    for (let result of results) {
        result._id = results.indexOf(result) + 1;
    }
    dispatch({ type: FETCH_USERS, payload: results });
}

export const editUser = (selectedUser, formValues) => {
    const editedUser = { ...formValues }
    editedUser._id = selectedUser._id;
    editedUser.picture = selectedUser.picture;
    return { type: EDIT_USER, payload: editedUser }
}

export const deleteUser = (selectedUser) => {
    console.log(selectedUser)
    return { type: DELETE_USER, payload: selectedUser }
}