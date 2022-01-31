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

    const onSubmit = (formValues) => {
        dispatch(editUser(selectedUser, formValues))
        navigate('/');
    }

    //imrovement - could have used FIELDS from UserForm component instead
    const renderContent = () => {
        return <UserForm
            /*lodash helps pick just the values needed from user, set them as initial values of the form*/
            initialValues={_.pick(selectedUser, 'name[title]', 'name[first]', 'name[last]', 'email', 'location[country]', 'location[city]', 'location[street][name]', 'location[street][number]')}
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