import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import _ from 'lodash';

import { editUser } from "../../actions";
import Modal from "../Modal";
import UserForm from "./UserForm";

const UserEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    //(need to use == and not ===):
    // eslint-disable-next-line 
    const selectedUser = useSelector(state => state.find(user => user._id == id));
    //imrovement - could have used FIELDS from UserForm component for keys:
    const selectedValues = {
        title: selectedUser.name.title,
        first: selectedUser.name.first,
        last: selectedUser.name.last,
        email: selectedUser.email,
        country: selectedUser.location.country,
        city: selectedUser.location.city,
        street: selectedUser.location.street.name,
        number: selectedUser.location.street.number
    }

    const onSubmit = (formValues) => {
        dispatch(editUser(selectedUser, formValues))
        navigate('/');
    }

    const renderContent = () => {
        return <UserForm
            /*lodash helps pick just the values needed from user, set them as initial values of the form*/
            initialValues={_.pick(selectedValues, 'title', 'first', 'last', 'email', 'country', 'city', 'street', 'number')}
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