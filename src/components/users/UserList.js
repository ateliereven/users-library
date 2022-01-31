import React, { useEffect, useCallback } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from '../../actions';

const UserList = () => {

    const dispatch = useDispatch();
    const users = useSelector(state => state);
    console.log(users);
    const dispatchFetchUsers = useCallback(() => dispatch(fetchUsers()), [dispatch]);
    useEffect(() => {
        dispatchFetchUsers();
    }, [dispatchFetchUsers])

    const renderList = (users) => {
        return users.map(user => {
            return <UserCard
                key={users.indexOf(user)}
                id={user.id?.value ? user.id?.value : users.indexOf(user)}
                name={user.name}
                email={user.email}
                image={user.picture?.medium}
                location={user.location}
            />
        })
    }

    if (users) {
        return <div id="user-cards" className="ui cards">
            {renderList(users)}
        </div>

    } else {
        return <div className="ui segment">
            <div className="ui active inverted dimmer">
                <div className="ui text loader">Loading</div>
            </div>
            <p></p>
        </div>
    }

}

export default UserList;