import { useAuth0 } from "@auth0/auth0-react";
import { IconButton, Avatar, Box, Container, Grid } from '@mui/material';
import React from "react";

const Profile = () => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            <Container>
                <Grid>
                    <Avatar alt={user.name} src={user.picture} />
                    <img src={user.picture} alt={user.name} />
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <IconButton>Hello world </IconButton>
                </Grid>
            </ Container>
        )
    );
};

export default Profile;