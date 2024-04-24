import { useAuth0 } from "@auth0/auth0-react";
import { IconButton, Avatar, Box, Container, Grid } from '@mui/material';
import React from "react";
import { useLoaderData } from "react-router-dom";

export default function Profile() {

    let user = useLoaderData().user;
    let isAuthenticated = useLoaderData().isAuthenticated;
    //if (isLoading) {
    //    return <div>Loading ...</div>;
    //}

    return (
        isAuthenticated && (
            <Container maxwidth="sm">
                <Grid>
                    <Grid>
                        <Avatar alt={user.name} src={user.picture} />
                    </Grid>
                    <Grid >
                        <Grid>
                            <h2>{user.name}</h2>
                        </Grid>
                    </Grid>
                </Grid>
            </ Container>
        )
    );
};


