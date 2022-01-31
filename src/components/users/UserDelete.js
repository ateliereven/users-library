import React from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { deleteUser } from "../../actions";
import Modal from "../Modal";

const UserDelete = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    //(need to use == and not ===):
    // eslint-disable-next-line 
    const selectedUser = useSelector(state => state.find(user => user._id == id)) ;

    const handleDeleteClick = () => {
        dispatch(deleteUser(selectedUser));
        navigate('/');
    }

    const renderActions = () => {
        return (
            <React.Fragment>
                <button onClick={() => handleDeleteClick()} className="ui button negative">Delete</button>
                <Link to='/' className="ui button">Cancel</Link>
            </React.Fragment>
        )
    }

    const renderContent = () => {
        if (!selectedUser) {
            return 'Are you sure you want to delete this user?'
        }
        return `Are you sure you want to delete ${selectedUser.name.title} ${selectedUser.name.first} ${selectedUser.name.last}?`
    }

    return (
        <Modal
            title="Delete User"
            content={renderContent()}
            actions={renderActions()}
            onDismiss={() => navigate('/')}
        />
    )
}

export default UserDelete;