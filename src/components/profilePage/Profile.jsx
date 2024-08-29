//auth0
import { useAuth0 } from "@auth0/auth0-react";
//mui components
import {
    IconButton, Avatar, Box, Container, Grid, Rating, Button, ListItemText, List, ListItem,
    Typography, ButtonGroup, Divider, TextField, FormControl, useMediaQuery, Item, useTheme
} from '@mui/material';
import axios from "axios";

//react
import React, { useEffect, useState } from "react";
import { useLoaderData, Form, Navigate, useNavigate } from "react-router-dom";

//icons
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';
import BugReportIcon from '@mui/icons-material/BugReport';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { styled } from '@mui/material/styles';

//loaders and actions
import { ProfileLoader } from "../../loaders/ProfileLoader";
import { ProfileAction } from "../../actions/ProfileAction";

//pages
import LoadingPage from "../loadingPage/LoadingPage";

export default function Profile() {
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("mobile"));
    const navigation = useNavigate();
    let load = navigation.state === "loading"

    let data = useLoaderData()
    console.log(data)

    //data
    const [userInfo, setUserInfo] = useState({})
    const [profileInput, setProfileInput] = useState({})
    const [useEffectLoading, setUseEffectLoading] = useState(true)

    //display
    const [disableSubmitAndTextbox, toggleDisableSubmitAndTextbox] = useState(true)
    const [setUploadDisplay, uploadDisplay] = useState("none")

    //auth0
    const auth0 = useAuth0();
    let isAuthenticated = auth0?.isAuthenticated;
    let isLoading = auth0?.isLoading;
    let user = auth0?.user

    //theme
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('tablet'));

    console.log(theme)

    useEffect(() =>
    {
        async function returnInfo()
        {
            let token = await auth0?.getAccessTokenSilently()
            let user = await auth0?.user?.sub;

            if (user && token && isAuthenticated)
            {
                let profileInfo = await ProfileLoader.loadProfileInfo(token, user)
                profileInfo = profileInfo.data
                setUserInfo({
                    firstName: profileInfo?.firstName ? profileInfo.firstName : "",
                    lastName: profileInfo?.lastName ? profileInfo.lastName : "",
                    address: profileInfo?.address ? profileInfo.address : "",
                    apartmentNumber: profileInfo?.apartmentNumber ? profileInfo.apartmentNumber : "",
                    email: profileInfo?.email ? profileInfo.email : ""
                })
            }



            setUseEffectLoading(false)
        }
        returnInfo()

    }, [auth0, isAuthenticated])

    if (!isAuthenticated) {
        return <Navigate to="/home" replace={true} />
    }

    const buttonGroupProps =
    {
        orientation: isSmallScreen ? "vertical" : "horizontal",
    };

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


    if (isLoading || load || useEffectLoading) {
        return <LoadingPage />;
    }

    async function SubmitProfileForm(e)
    {
        e.preventDefault();
        let formData = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            address: e.target.address.value,
            apartmentNumber: e.target.apartmentNumber.value
        }
        setUserInfo(formData)

        await ProfileAction.updateProfileInfo(formData, auth0)
    }

    async function CallAuthorization()
    {
        

        const accessToken = await auth0.getAccessTokenSilently();
        const {sub} = user

        const results = await auth0?.loginWithRedirect({
            authorizationParams: {
                client_id: 'OJEAiU4DNGAh06kPtZnsq90T36O9AIy6',
                connection:"aetna",
                redirect_uri: 'http://localhost:3000/profile'
            }
        })

        console.log(results)
        // axios.get("https://healthease.us.auth0.com/authorize?response_type=token&client_id=OJEAiU4DNGAh06kPtZnsq90T36O9AIy6&redirect_uri=http://localhost:3000/profile&connection=aetna&scope=openid%20profile%20email",
        //     {

        //     }
        //     ,
        //     {
        //         withCredentials: true,
        //         headers:
        //         {
        //             Authorization: `Bearer ${accessToken}`,
        //         },
        //     }
        // ).then((response) => {
        //     console.log(response)
        // })
        // .catch((err) => {
        //     console.log(err)
        // })
    }

    return (
        isAuthenticated && (
            <Container maxwidth="sm" sx={{ height: 800, mt: 5, display:"flex", flexDirection:"column",  alignItems:"center"}} >
                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                    <Grid container sx={{ plr: 2,  justifyContent: 'center', columnGap: 5, width:"100%", flexDirection:"row" }}>
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
                                    <Form method="post" onSubmit={ SubmitProfileForm }>
                                        <FormControl sx={{  width: "100%" }}>
                                            <Box sx={{ display: "flex", flexDirection: "column", width: "100%", rowGap: 1 }}>
                                                <Divider />
                                                <Box sx={{ display: "flex", flexDirection: "row", width: "100%" , justifyContent: "space-between" }}>
                                                    <TextField size="small" label="First Name" sx={{ width: "45%" }} disabled={disableSubmitAndTextbox} name="firstName" defaultValue={userInfo.firstName} ></TextField>
                                                    <TextField size="small" label="Last Name" sx={{ width: "45%" }} disabled={disableSubmitAndTextbox} name="lastName" defaultValue={userInfo.lastName }></TextField>
                                                </Box>
                                                <Box sx={{ display: "flex", flexDirection: "row", width: "100%" ,justifyContent: "space-between" }}>
                                                    <TextField size="small" label="Address" sx={{ width: "70%" }} disabled={disableSubmitAndTextbox} name="address" defaultValue={ userInfo.address }></TextField>
                                                    <TextField size="small" label="Apt #" sx={{ width: "20%" }} disabled={disableSubmitAndTextbox} name="apartmentNumber" defaultValue={userInfo.apartmentNumber }></TextField>
                                                </Box>
                                                <TextField size="small" label="E-mail" required disabled={disableSubmitAndTextbox} defaultValue={ userInfo.email } name="email"></TextField>
                                                <ButtonGroup variant="contained" aria-label="Basic button group" sx={{ width: "30%", minWidth: "137px" }} >
                                                    <Button sx={{ width: "50%" }} onClick={(e) => { toggleDisableSubmitAndTextbox(!disableSubmitAndTextbox) } }>Edit</Button>
                                                    <Button sx={{ width: "50%" }} type="submit" name="intent" value="submit"
                                                        onClick={(e) =>
                                                        {
                                                            setTimeout(() =>
                                                            {
                                                                toggleDisableSubmitAndTextbox(true)
                                                            }, 100)
                                                        }}
                                                        disabled={disableSubmitAndTextbox}>Submit
                                                    </Button>
                                                </ButtonGroup>
                                            </Box>
                                        </FormControl>
                                    </Form>
                                </Box>
                            </Grid>
                    </Grid>
                    <Box sx={{color:theme.palette.grey[400]}} component="h1">Linked Accounts:</Box>
                
                {(!matches) && (
                    <Box sx={{display:"flex"}}>
                        <Grid sx={{width:"100%"}}>
                            <Box sx={{display:"flex", justifyContent:"space-between", width:"100%", background:theme.palette.primary.main, color:theme.palette.common.white}}>
                                <Box sx={{width:"25%", p:"1%"}}>Connection</Box>
                                <Box sx={{width:"25%", p:"1%"}}>Url</Box>
                                <Box sx={{width:"25%", p:"1%"}}>Insurance Company</Box>
                                <Box sx={{width:"25%", textAlign:"center", p:"1%", display:"flex", justifyContent:"end"}}>
                                    <Box sx={{width:"60%", textAlign:"start"}}>
                                        Actions
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                                <Box sx={{width:"25%" , p:"1%"}}>Aetna-Auth</Box>
                                <Box sx={{width:"25%", p:"1%"}}>https://aetna.com</Box>
                                <Box sx={{width:"25%", p:"1%"}}>Aetna</Box>
                                <Button sx={{ p:"1%",width:"27%", display:"flex", textAlign:"start", color:theme.palette.success.light, justifyContent:"end" }} onClick={CallAuthorization}>
                                    <Box sx={{width:"60%", textAlign:"start", p:"0%"}}>Link</Box>        
                                </Button>
                            </Box>                                
                        </Grid>                                
                    </Box>  
                )}
                {(matches) && (
                    <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <Box sx={{display:"flex", width:"60%"}}> 
                            <Box sx={{p:"1%", width:"50%", background:theme.palette.primary.main, color:theme.palette.common.white, textAlign:"center"}}>Connection</ Box>
                            <Box sx={{p:"1%", width:"50%", textAlign:"center"}}>Aetna-Auth</ Box>
                        </Box>
                        <Box sx={{display:"flex", width:"60%"}}> 
                            <Box sx={{p:"1%", width:"50%", background:theme.palette.primary.main, color:theme.palette.common.white, textAlign:"center"}}>Url </ Box>
                            <Box sx={{p:"1%", width:"50%", textAlign:"center"}}> </ Box>
                        </Box>
                        <Box sx={{display:"flex", width:"60%"}}> 
                            <Box sx={{p:"1%", width:"50%", background:theme.palette.primary.main, color:theme.palette.common.white, textAlign:"center"}}>Insurance Company </ Box>
                            <Box sx={{p:"1%", width:"50%", textAlign:"center"}}> </ Box>
                        </Box>
                        <Box sx={{display:"flex", width:"60%"}}> 
                            <Box sx={{p:"1%", width:"50%", background:theme.palette.primary.main, color:theme.palette.common.white, textAlign:"center"}}>Actions </ Box>
                            <Box sx={{p:"1%", width:"50%", color:theme.palette.success.light,  textAlign:"center"  }} >Link</Box>
                        </Box>
                    </Box >
                )}

                </Box>                                  
            </ Container>
        )
    );
};
