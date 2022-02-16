import React from "react";
import { useSelector } from "react-redux";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import UserCard from "./UserCard";

const UserList = () => {
    // getting user list from store:
    const users = useSelector(state => state);
    //console.log(users);

    const renderList = (users) => {
        return users.sort((a, b) => a._id - b._id).map(user => {
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
        return (
            <main>
                <Container sx={{ py: 5 }} >
                    <Grid container spacing={4} justifyContent="center"
                        alignItems="center">
                        {renderList(users)}
                    </Grid>
                </Container>
            </main>
        )

    } else {
        return (
            <main>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <div className="ui segment">
                        <div className="ui active inverted dimmer">
                            <div className="ui text loader">Loading</div>
                        </div>
                        <p></p>
                    </div>
                </Container>
            </main>
        )
    }

}

export default UserList;