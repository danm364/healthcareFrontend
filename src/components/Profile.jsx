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

export default function Profile() {

    let user = useLoaderData().user;
    let isAuthenticated = useLoaderData().isAuthenticated;
    //if (isLoading) {
    //    return <div>Loading ...</div>;
    //}
    let disabled = "disabled"

    function toggleEdit(e) {
        console.log(e)
        disabled = ""
    }

    return (
        isAuthenticated && (
            <Container maxwidth="sm" sx={{ height: 800, mt: 5, display:"flex"}} >
                <Grid container sx={{ mr: 2, pl: 2, display: "flex", justifyContent: 'center', columnGap: 5 }}>
                    <Grid item direction="row" spacing={4} sx={{display:"flex", justifyContent: "center"} }>
                        <Box>
                            <Box component="img" sx={{ height: 300, width: '30%', minWidth: 300 }}></Box>
                        </Box>
                    </Grid>
                    <Grid item sx={{display: "flex", flexDirection:"column", flexWrap:"wrap" }} >
                        <Box >
                            <List disablePadding sx={{} }>
                                <ListItem sx={{ mr: 2 }} alignItems="center">
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
                                    <ButtonGroup sx={{p:0} }>
                                        <Button variant="outlined" sx={{ display: "flex" }} startIcon={<MessageIcon />}> Send Messages</Button>
                                        <Button variant="outlined" startIcon={ <PersonIcon /> }>Contact</Button>
                                        <Button variant="outlined" startIcon={ <BugReportIcon /> }>Report Bug</Button>
                                    </ButtonGroup>
                                </ListItem>
                            </List>
                        </Box>
                        <Box sx={{display:"flex", flexDirection: "column"} }>
                            <Typography variant="h1" sx={{fontSize: 12} }>Personal Information</Typography>
                            <FormControl>
                                <Box sx={{ display: "flex", flexDirection: "column", width: "100%", rowGap: 1 }} component="form">
                                    <Divider />
                                    <Box sx={{ display: "flex", flexDirection: "row", width: "100%" , justifyContent: "space-between" }}>
                                        <TextField size="small" label="First Name" sx={{ width: "45%" } } disabled>FirstName</TextField>
                                        <TextField size="small" label="Last Name" sx={{ width: "45%" }} disabled>LastName</TextField>
                                    </Box>
                                    <Box sx={{ display: "flex", flexDirection: "row", width: "100%" ,justifyContent: "space-between" }}>
                                        <TextField size="small" label="Address" sx={{ width: "70%" }} disabled>Address 1</TextField>
                                        <TextField size="small" label="Apt #" sx={{ width: "20%" }} disabled>Apt #</TextField>
                                    </Box>
                                    <TextField size="small" label="E-mail" disabled>E-mail</TextField>
                                    <ButtonGroup variant="contained" aria-label="Basic button group" sx={{ width: "30%" }} >
                                        <Button sx={{ width: "50%" }} onClick={(e) => { toggleEdit(e) } }>Edit</Button>
                                        <Button sx={{ width: "50%" }}>Submit</Button>
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


