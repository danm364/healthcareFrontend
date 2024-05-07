import { useAuth0 } from "@auth0/auth0-react";
import {
    IconButton, Avatar, Box, Container, Grid, Rating, Button, ListItemText, List, ListItem,
    Typography, ButtonGroup, Divider, TextField, FormControl
} from '@mui/material';
import { sizing, spacing } from '@mui/system'
import React from "react";
import { useLoaderData } from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckIcon from '@mui/icons-material/Check';
import MessageIcon from '@mui/icons-material/Message';
import { LocationOnOutlined } from "../../node_modules/@mui/icons-material/index";
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import PersonIcon from '@mui/icons-material/Person';
import BugReportIcon from '@mui/icons-material/BugReport';
import { useTheme } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { useFormControl } from '@mui/material/FormControl';
import axios from "axios";

export default function Profile() {
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("mobile"));
    const auth0 = useAuth0();
    let token = auth0.getAccessTokenSilently()
    const [disabledTextBox, toggleDisabledTextBox] = useState(true)

    let user = useLoaderData().user;
    let isAuthenticated = useLoaderData().isAuthenticated;
    //if (isLoading) {
    //    return <div>Loading ...</div>;
    //}
    const buttonGroupProps = {
        orientation: isSmallScreen ? "vertical" : "horizontal",
    };

    function toggleEdit(e) {
        console.log(e)
        toggleDisabledTextBox(!disabledTextBox)
    }

    function profileFormUpdate(e) {
        console.log(e)
            let data = axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login/profileInfo`,
                {
                }
                ,
                {
                    withCredentials: true,
                    headers:
                    {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
    }

    return (
        isAuthenticated && (
            <Container maxwidth="sm" sx={{ height: 800, mt: 5, display:"flex"}} >
                <Grid container sx={{ plr: 2, display: "flex", justifyContent: 'center', columnGap: 5 }}>
                    <Grid item direction="row" spacing={4} sx={{display:"flex", justifyContent: "center"} }>
                        <Box>
                            <Box component="img" sx={{ height: 300, width: '50%', minWidth: 250 }}></Box>
                        </Box>
                    </Grid>
                    <Grid item sx={{display: "flex", flexDirection:"column", flexWrap:"wrap" }} >
                        <Box >
                            <List disablePadding sx={{display:"flex", flexDirection:"column"} }>
                                <ListItem  alignItems="center">
                                    <ListItemText
                                        alignItems="flex-start"
                                        primary="Daniel McGill"
                                        secondary="Product Designer"
                                    >
                                    </ListItemText>
                                    <Box sx={{ display:"flex"} }>
                                        <LocationOnTwoToneIcon />
                                        <Typography variant="body1" sx={{ fontSize: 14, textAlign: "center", fontWeight:"light" } }>
                                            Location
                                        </Typography>
                                    </Box>
                                </ListItem>
                            </List>
                            <List disablePadding>
                                <ListItem alignItems="center">
                                    <ListItemText
                                        alignItems="flex-start"
                                        secondary="Rating"
                                    >
                                    </ListItemText>
                                    <Rating />
                                </ListItem>
                            </List>
                            <List>
                                <ListItem sx={{ p: 0 }}>
                                    <ButtonGroup sx={{ p: 0, display: "flex", justifyContent: "center", width: '100%'}} {...buttonGroupProps }>
                                        <Button variant="outlined"  startIcon={<MessageIcon />}> Send Messages</Button>
                                        <Button variant="outlined" startIcon={ <PersonIcon /> }>Contact</Button>
                                        <Button variant="outlined" startIcon={ <BugReportIcon /> }>Report Bug</Button>
                                    </ButtonGroup>
                                </ListItem>
                            </List>
                        </Box>
                        <Box sx={{display:"flex", flexDirection: "column"} }>
                            <Typography variant="h1" sx={{fontSize: 12} }>Personal Information</Typography>
                            <FormControl>
                                <Box sx={{ display: "flex", flexDirection: "column", width: "100%", rowGap: 1 }} component="form" onSubmit={(e) => profileFormUpdate(e) } >
                                    <Divider />
                                    <Box sx={{ display: "flex", flexDirection: "row", width: "100%" , justifyContent: "space-between" }}>
                                        <TextField size="small" label="First Name" sx={{ width: "45%" }} disabled={disabledTextBox } >FirstName</TextField>
                                        <TextField size="small" label="Last Name" sx={{ width: "45%" }} disabled={disabledTextBox }>LastName</TextField>
                                    </Box>
                                    <Box sx={{ display: "flex", flexDirection: "row", width: "100%" ,justifyContent: "space-between" }}>
                                        <TextField size="small" label="Address" sx={{ width: "70%" }} disabled={disabledTextBox}>Address 1</TextField>
                                        <TextField size="small" label="Apt #" sx={{ width: "20%" }} disabled={disabledTextBox}>Apt #</TextField>
                                    </Box>
                                    <TextField size="small" label="E-mail" disabled={disabledTextBox}>E-mail</TextField>
                                    <ButtonGroup variant="contained" aria-label="Basic button group" sx={{ width: "30%", minWidth: "137px" }} >
                                        <Button sx={{ width: "50%"}} onClick={(e) => { toggleEdit(e) } }>Edit</Button>
                                        <Button sx={{ width: "50%"}}>Submit</Button>
                                    </ButtonGroup>
                                </Box>
                            </FormControl>
                        </Box>
                    </Grid>
                </Grid>
            </ Container>
        )
    );
};
