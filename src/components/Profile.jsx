import { useAuth0 } from "@auth0/auth0-react";
import { IconButton, Avatar, Box, Container, Grid } from '@mui/material';
import React from "react";
import { auth0AuthProvider } from "../auth";


export default function Profile() {

    let user = async () => await auth0AuthProvider.getUser();
    let isAuthenticated = async () => await auth0AuthProvider.isAuthenticated();
    //if (isLoading) {
    //    return <div>Loading ...</div>;
    //}

    return (
        isAuthenticated && (
            <Container>
                <Grid container rowspacing={1} columnSpacing={{ xs: 12, sm: 12, md: 12 }} justifyContent={ "center" } spacing>
                    <Grid container rowspacing={1} columnSpacing={{ xl: 1 }} justifyContent={"center"}>
                        <Avatar alt={user.name} src={user.picture} />
                    </Grid>
                    <Grid container rowspacing={1} columnSpacing={{ xl: 1 }} justifyContent={"center"}>
                        <Grid>
                            <h2>{user.name}</h2>
                        </Grid>
                    </Grid>
                </Grid>
            </ Container>
        )
    );
};


