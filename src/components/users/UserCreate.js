import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

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

    const renderActions = () => {
        return (
            <React.Fragment>
                <button onClick={() => onSubmit()} className="ui button teal">Add</button>
                <Link to='/' className="ui button">Cancel</Link>
            </React.Fragment>
        )
    }

    const renderContent = () => {
        return <UserForm onSubmit={onSubmit}/>
    }

    return <div>
        <Modal
            title="Create new User"
            content={renderContent()}
            actions={renderActions()}
            onDismiss={() => navigate('/')}
        />
    </div>
}

export default UserCreate;