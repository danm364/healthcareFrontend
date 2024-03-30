import { useAuth0 } from "@auth0/auth0-react";
import { IconButton, Avatar, Box, Container, Grid } from '@mui/material';
import React from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

export const loader = async () => (
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login/profileInfo`, "danm364@yahoo.com")
        .then((response) => {
            console.log(response)
            return (response);
        })
        .catch((err) => {
            console.log(err)
            return err
        })
)

export default function Profile() {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const profileInfo = useLoaderData()

    if (isLoading) {
        return <div>Loading ...</div>;
    }

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


