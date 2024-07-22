import { useAuth0 } from "@auth0/auth0-react";
import {
    IconButton, Avatar, Box, Container, Grid, Rating, Button, ListItemText, List, ListItem,
    Typography, ButtonGroup, Divider, TextField, FormControl
} from '@mui/material';
import React from "react";
import { useLoaderData, Form } from "react-router-dom";
import MessageIcon from '@mui/icons-material/Message';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import PersonIcon from '@mui/icons-material/Person';
import BugReportIcon from '@mui/icons-material/BugReport';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
export default function Profile() {
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("mobile"));
    const navigation = useNavigate();
    console.log("maybe")
    let load = navigation.state === "loading"

    const auth0 = useAuth0();
    const [disableSubmitAndTextbox, toggleDisableSubmitAndTextbox] = useState(true)
    const [setUploadDisplay, uploadDisplay] = useState("none")


    let user = useLoaderData()?.profileInfo?.data;

    console.log(user)

    let userInfo =
    {
        firstName       : user?.firstName ? user.firstName : "",
        lastName        : user?.lastName ? user.lastName : "",
        address         : user?.address ? user.address : "",
        apartmentNumber : user?.apartmentNumber ? user.apartmentNumber : "",
        email           : user?.email ? user.email : ""
    }

    console.log(userInfo)

    let isAuthenticated = auth0.isAuthenticated;

    const buttonGroupProps =
    {
        orientation: isSmallScreen ? "vertical" : "horizontal",
    };

    function toggleEdit(e)
    {
        toggleDisableSubmitAndTextbox(!disableSubmitAndTextbox)
    }

    function toggleSubmit()
    {
        setTimeout(() => {
            toggleDisableSubmitAndTextbox(true)
        }, 100)
    }

    function toggleDisplay(e)
    {
        setUploadDisplay("inline-flex")
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    console.log("state change")
    console.log(window.location)

    if (auth0.isLoading || load) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            <Container maxwidth="sm" sx={{ height: 800, mt: 5, display:"flex"}} >
                <Grid container sx={{ plr: 2, display: "flex", justifyContent: 'center', columnGap: 5 }}>
                    <Grid item direction="row" spacing={4} sx={{display:"flex", justifyContent: "center"} }>
                        <Form method="post" action="/profile">
                            <Box component="img" sx={{ height: 300, width: '100%', minWidth: 250 }}></Box>
                            <Button
                                sx={{ width: "100%" }}
                                name="intent"
                                role={ undefined }
                                component="label"
                                startIcon={<CloudUploadIcon />}
                                onClick={(e) => { toggleDisplay(e) }}
                            >
                                Change Photo
                                <VisuallyHiddenInput type="file" name="picture"/>
                            </Button>
                            <Button sx={{ width: "100%", display: uploadDisplay }} disabled="true" type="submit" name="intent" value="upload" >Upload</Button>
                        </Form>
                    </Grid>
                    <Grid item sx={{display: "flex", flexDirection:"column", flexWrap:"wrap" }} >
                        <Box >
                            <List disablePadding sx={{display:"flex", flexDirection:"column"} }>
                                <ListItem  alignItems="center">
                                    <ListItemText
                                        alignItems="flex-start"
                                        primary={ `${userInfo.firstName} ${userInfo.lastName}` }
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
                                            <TextField size="small" label="First Name" sx={{ width: "45%" }} disabled={disableSubmitAndTextbox} name="firstName"  value={userInfo.firstName } ></TextField>
                                            <TextField size="small" label="Last Name" sx={{ width: "45%" }} disabled={disableSubmitAndTextbox} name="lastName" value={userInfo.lastName }></TextField>
                                        </Box>
                                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%" ,justifyContent: "space-between" }}>
                                            <TextField size="small" label="Address" sx={{ width: "70%" }} disabled={disableSubmitAndTextbox} name="address"  value={ userInfo.address }></TextField>
                                            <TextField size="small" label="Apt #" sx={{ width: "20%" }} disabled={disableSubmitAndTextbox} name="apartmentNumber"  value={userInfo.apartmentNumber }></TextField>
                                        </Box>
                                        <TextField size="small" label="E-mail" required disabled={disableSubmitAndTextbox}  value={ userInfo.email } name="email"></TextField>
                                        <ButtonGroup variant="contained" aria-label="Basic button group" sx={{ width: "30%", minWidth: "137px" }} >
                                            <Button sx={{ width: "50%"}} onClick={(e) => { toggleEdit(e) } }>Edit</Button>
                                            <Button sx={{ width: "50%" }} type="submit" name="intent" value="submit" onClick={(e) => { toggleSubmit(e) }} disabled={ disableSubmitAndTextbox }>Submit</Button>
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
