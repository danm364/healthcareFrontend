import { useAuth0 } from "@auth0/auth0-react";
import { IconButton, Avatar, Box, Container, Grid } from '@mui/material';
import { sizing, spacing } from '@mui/system'
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
            <Container maxwidth="sm" sx={{ height: 800, mt: 5 }} >

                <Grid container direction="row" spacing={ 4 }>
                    <Grid item xs={3} >
                        <Grid container>
                            <Grid container >
                                <Box component="img" alt={user.name} src={user.picture} sx={{height : 300, width : 300}} />
                            </Grid>
                            <Grid>
                                <Grid>Insurances</Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item >
                        <Grid container>
                            <Grid container direction="row" >
                                <Grid>username</Grid>
                                <Grid>Location</Grid>
                            </Grid>
                            <Grid container>Job Title</Grid>
                        </Grid>

                        <Grid>E-mail</Grid>
                    </Grid>
                </Grid>
            </ Container>
        )
    );
};


