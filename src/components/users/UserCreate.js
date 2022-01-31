import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createUser } from "../../actions";
import Modal from "../Modal";
import UserForm from "./UserForm";

const UserCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (formValues) => {
        dispatch(createUser(formValues))
        navigate('/');
    }

    const renderContent = () => {
        return <UserForm onSubmit={onSubmit} isAdd={true}/>
    }

    return <div>
        <Modal
            title="Create new User"
            content={renderContent()}
            onDismiss={() => navigate('/')}
        />
    </div>
}

export default UserCreate;