import React from "react";
import UserCard from "./UserCard";
import { useSelector } from "react-redux";

const UserList = () => {
    // getting user list from store:
    const users = useSelector(state => state);
    //console.log(users);

    const renderList = (users) => {
        return users.map(user => {
            return <UserCard
                key={users.indexOf(user)}
                id={user._id}
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