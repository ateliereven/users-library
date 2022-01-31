import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="ui secondary pointing menu blue">
            <Link to="/" className="active item"><h2>The Users Library</h2></Link>
            <div className="right menu">
                <Link to="/user/new" className="item"><h4 className="ui blue button">Add User</h4></Link>
                <Link to="/" className="item"><h4 className="ui button">All Users</h4></Link>
            </div>
        </div>
    )
}

export default Header;