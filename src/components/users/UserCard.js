import React from "react";
import { Link } from "react-router-dom";
import cardStyles from "../../css/UserCard.module.css";

const UserCard = ({ id, name, email, image, location }) => {
    return <div className="card">
        {image && 
            <div className={cardStyles.images}>
                <img className={cardStyles.images} src={image} alt="my user pic" />
            </div>
        }
        
        <div className="content">
            <div className="ui blue header">{`${name.title} ${name.first} ${name.last}`}</div>
            <div className="meta">
                <i className="mail icon"></i>
                <a href={`mailto:${email}`}>{email}</a>
            </div>
            <div className="description">
                <i className="marker icon"></i>
                {`${location.country}, ${location.city}, ${location.street?.number} ${location.street?.name}`}
            </div>
        </div>
        <div className="extra content">
            <span className="right floated">
                <i className="user icon"></i>
                {id}
            </span>
            <span>
                <Link to={`/user/edit/${id}`}><i className="ui teal large edit icon"></i></Link>
                <Link to={`/user/delete/${id}`}><i className="ui red large trash alternate icon"></i></Link>
            </span>
        </div>
    </div>
}

export default UserCard;