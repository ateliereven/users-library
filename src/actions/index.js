import axios from "axios";

import {
    CREATE_USER,
    FETCH_USER,
    FETCH_USERS,
    EDIT_USER,
    DELETE_USER
} from "./types"

// update all !!!! //
export const createUser = formValues => async (dispatch, getState) => {
    const newUser = { ...formValues, id: getState().length };
    dispatch({
        type: CREATE_USER,
        payload: newUser
    });
}

export const fetchUsers = () => async dispatch => {
    const response = await axios.get('https://randomuser.me/api/?results=10.');
    console.log(response.data.results)
    dispatch({ type: FETCH_USERS, payload: response.data.results });
}


// export const editUser = (id, formValues, navigate)  => {
//     
//     dispatch({ type: EDIT_USER, payload: response.data })
//     navigate('/'); 
// }

export const deleteUser = (selectedUser, dispatch) => {
    console.log(selectedUser);
        dispatch({ type: DELETE_USER, payload: selectedUser })
}