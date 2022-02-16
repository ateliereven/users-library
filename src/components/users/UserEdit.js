import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import _ from 'lodash';

import { editUser } from "../../actions";
import Modal from "../Modal";
import UserForm from "./UserForm";
import FIELDS from "./formFields";

const UserEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    //(need to use == and not ===):
    // eslint-disable-next-line 
    const selectedUser = useSelector(state => state.find(user => user._id == id));

    const onSubmit = (formValues) => {
        dispatch(editUser(selectedUser, formValues))
        navigate('/');
    }

    const renderContent = () => {
        return <UserForm
            /*lodash helps pick just the values needed from user, set them as initial values of the form*/
            initialValues={_.pick(selectedUser, FIELDS[0].name, FIELDS[1].name, FIELDS[2].name, FIELDS[3].name, FIELDS[4].name, FIELDS[5].name, FIELDS[6].name, FIELDS[7].name)}
            onSubmit={onSubmit}
            email={selectedUser.email}
        />
    }

    return <Modal
        title="Edit User"
        content={renderContent()}
        onDismiss={() => navigate('/')}
    />
}

export default UserEdit;