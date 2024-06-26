import { useAuth0 } from "@auth0/auth0-react";
import {
    IconButton, Avatar, Box, Container, Grid, Rating, Button, ListItemText, List, ListItem,
    Typography, ButtonGroup, Divider, TextField, FormControl
} from '@mui/material';
import { sizing, spacing } from '@mui/system'
import React from "react";
import { useLoaderData, Form } from "react-router-dom";
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

    let user = useLoaderData()?.profileInfo?.data;
    let isAuthenticated = useLoaderData().isAuthenticated;
    //if (isLoading) {
    //    return <div>Loading ...</div>;
    //}
    const buttonGroupProps = {
        orientation: isSmallScreen ? "vertical" : "horizontal",
    };

    function toggleEdit(e) {
        toggleDisabledTextBox(!disabledTextBox)
    }

    return (
        isAuthenticated && (
            <Container maxwidth="sm" sx={{ height: 800, mt: 5, display:"flex"}} >
                <Grid container sx={{ plr: 2, display: "flex", justifyContent: 'center', columnGap: 5 }}>
                    <Grid item direction="row" spacing={4} sx={{display:"flex", justifyContent: "center"} }>
                        <Box>
                            <Box component="img" sx={{ height: 300, width: '100%', minWidth: 250 }}></Box>
                            <Button sx={{ width: "100%" }} type="Upload" name="uploadPic">Upload</Button>
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
                            <List sx={{ pl: '16px', pr:'16px' }}>
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
                            <Typography variant="h1" sx={{ fontSize: 12 }}>Personal Information</Typography>
                            <Form method="post" action="/profile">
                                <FormControl sx={{  width: "100%" }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", rowGap: 1 }}>
                                        <Divider />
                                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%" , justifyContent: "space-between" }}>
                                            <TextField size="small" label="First Name" sx={{ width: "45%" }} disabled={disabledTextBox} name="firstName" defaultValue={ user.firstName } >FirstName</TextField>
                                            <TextField size="small" label="Last Name" sx={{ width: "45%" }} disabled={disabledTextBox} name="lastName" defaultValue={ user.lastName }>LastName</TextField>
                                        </Box>
                                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%" ,justifyContent: "space-between" }}>
                                            <TextField size="small" label="Address" sx={{ width: "70%" }} disabled={disabledTextBox} name="address" defaultValue={ user.address }>Address 1</TextField>
                                            <TextField size="small" label="Apt #" sx={{ width: "20%" }} disabled={disabledTextBox} name="apartmentNumber" defaultValue={ user.apartmentNumber }>Apt #</TextField>
                                        </Box>
                                        <TextField size="small" label="E-mail" disabled={disabledTextBox} defaultValue={ user.email } name="email">E-mail</TextField>
                                        <ButtonGroup variant="contained" aria-label="Basic button group" sx={{ width: "30%", minWidth: "137px" }} >
                                            <Button sx={{ width: "50%"}} onClick={(e) => { toggleEdit(e) } }>Edit</Button>
                                            <Button sx={{ width: "50%" }} type="submit" onClick={(e) => { toggleEdit(e) }} name="profileSubmit">Submit</Button>
                                        </ButtonGroup>
                                    </Box>
                                </FormControl>
                            </Form>
                        </Box>
                    </Grid>
                </Grid>
            </ Container>
        )
    );
};
