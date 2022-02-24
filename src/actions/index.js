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
    // getting users from local storage:
    const isUserList = JSON.parse(localStorage.getItem("users"));
    const isExpiration = localStorage.getItem("expiration");
    // check if data can be fetched from local storage:
    if (isUserList && isExpiration > Number(new Date())) {
        //console.log("getting items from local storage");
        dispatch({ type: FETCH_USERS, payload: isUserList });}
    // else make get request from api and save to local storage:
    else {
        //console.log("calling api")
        const response = await axios.get('https://randomuser.me/api/?results=10.');
        const results = response.data.results;
        for (let result of results) {
            result._id = results.indexOf(result) + 1;
        }
        localStorage.setItem("users", JSON.stringify(results));
        const expiration = Number(new Date()) + 3600 * 1000 * 2; //expires in 2 hours
        localStorage.setItem("expiration", expiration);
        dispatch({ type: FETCH_USERS, payload: results });
    }

}

export const editUser = (selectedUser, formValues) => {
    const editedUser = { ...formValues }
    editedUser._id = selectedUser._id;
    editedUser.picture = selectedUser.picture;
    return { type: EDIT_USER, payload: editedUser }
}

export const deleteUser = (selectedUser) => {
    //console.log(selectedUser)
    return { type: DELETE_USER, payload: selectedUser }
}