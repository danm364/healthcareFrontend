
//auth0
import { useAuth0 } from "@auth0/auth0-react";
//mui components
import {
    IconButton, Avatar, Box, Container, Grid, Rating, Button, ListItemText, List, ListItem,
    Typography, ButtonGroup, Divider, TextField, FormControl, useMediaQuery, Item, useTheme
} from '@mui/material';
import axios from "axios";

//react
import React, { createContext, useEffect, useState } from "react";
import { useLoaderData, Form, Navigate, useNavigate } from "react-router-dom";

//icons

//loaders and actions
import { ProfileLoader } from "../../loaders/ProfileLoader";

//utilites
import {linkContext} from "../../utilities/LinkContext"

//pages

export default function LinkedAccounts({setUserInfo}) {

    let data = useLoaderData()
    let [connections, setConnections] = useState({})
    let [LoadingForPage, setLoadingForPage] = useState(false)


    //auth0
    const auth0 = useAuth0();
    let isAuthenticated = auth0?.isAuthenticated;
    let isLoading = auth0?.isLoading;
    let user = auth0?.user

    //theme
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('tablet'));

    let SecondaryAccount = useAuth0(linkContext);

    useEffect(() => {
            async function getConnections()
            {
                let accessToken = await auth0.getAccessTokenSilently();
                let connectionData = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/profile/getConnections`,
                    {
                        profileID: auth0.user.sub
                    },
                    {
                        withCredentials: true,
                        headers:
                        {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                )

                setConnections(connectionData.data)
                setLoadingForPage(true)
            }

            getConnections()
    }, [])

    //link accounts
    async function CallAuthorization(connectionName)
    {

        const accessToken = await auth0.getAccessTokenSilently();

        if (!auth0.isAuthenticated)
            return

        await SecondaryAccount.loginWithPopup(
            {
                authorizationParams: {
                    connection: connectionName,
                    redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}profile`

                }

            }
        ).then((response) => {
            console.log(response)
        })
        .catch((err) => {
            console.log(err)
            return
        })

        let cignaid = await SecondaryAccount.getIdTokenClaims()
        let auth0Id = await auth0.getIdTokenClaims()

        if (cignaid == null || cignaid == undefined || auth0Id == null || auth0Id == undefined || (cignaid.sub == auth0Id.sub))
        {
            return;
        }

        //where link occurs
        let data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/profile/userAuth0Info`,
            {
                 
                    PrimaryAccountID: auth0Id?.sub,
                    PrimaryAccessToken: accessToken,
                    SecondaryAccountID: cignaid?.sub
            },
            {
                withCredentials: true,
                headers:
                {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )
            .then((response) =>
            {
                return (response);
            })
            .catch((err) =>
            {
                console.log(err)
                return err
            })
            

            //loads user data from insurance company
            let loadUserData = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/User/LoadUserProfile`,
                {
                     
                        PrimaryAccountID: auth0Id?.sub,
                        PrimaryAccessToken: accessToken,
                        ConnectionName: connectionName
                },
                {
                    withCredentials: true,
                    headers:
                    {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )
                .then((response) =>
                {
                    return (response);
                })
                .catch((err) =>
                {
                    console.log(err)
                    return err
                })
                

                //loads patients individual data that needs to be anonymized
                let loadData = await axios.post(`${process.env.REACT_APP_IDENTITY_BACKEND}/api/User/LoadProfile`,
                    {
                         
                            PrimaryAccountID: auth0Id?.sub,
                            PrimaryAccessToken: accessToken,
                            ConnectionName: connectionName
                    },
                    {
                        withCredentials: true,
                        headers:
                        {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                )
                    .then((response) =>
                    {
                        return (response);
                    })
                    .catch((err) =>
                    {
                        console.log(err)
                        return err
                    })

                let profileInfo = await ProfileLoader.loadProfileInfo(accessToken, auth0Id?.sub)
                profileInfo = profileInfo.data
                setUserInfo({
                    firstName: profileInfo?.firstName ? profileInfo.firstName : "",
                    lastName: profileInfo?.lastName ? profileInfo.lastName : "",
                    address: profileInfo?.address ? profileInfo.address : "",
                    apartmentNumber: profileInfo?.apartmentNumber ? profileInfo.apartmentNumber : "",
                    email: profileInfo?.email ? profileInfo.email : ""
                })
            
            async function getConnections()
            {
                let accessToken = await auth0.getAccessTokenSilently();
                let connectionData = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/profile/getConnections`,
                    {
                        profileID: auth0.user.sub
                    },
                    {
                        withCredentials: true,
                        headers:
                        {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                )

                setConnections(connectionData.data)
                setLoadingForPage(true)
            }
            getConnections()

    }

    //unlink

    async function CallUnLink(connectionName)
    {
        let cignaid = await SecondaryAccount.getIdTokenClaims()

        let auth0Id = await auth0.getIdTokenClaims()

        let accessToken = await auth0.getAccessTokenSilently();

        if (!auth0.isAuthenticated)
            return

        let data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/Profile/UnlinkAccount`,
            {
                 
                    PrimaryAccountID: auth0Id?.sub,
                    PrimaryAccessToken: await auth0.getAccessTokenSilently(),
                    ConnectionName: connectionName
            },
            {
                withCredentials: true,
                headers:
                {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )
            .then((response) =>
            {
                console.log(response)
                return (response);
            })
            .catch((err) =>
            {
                console.log(err)
                return err
            })

            async function getConnections()
            {
                let accessToken = await auth0.getAccessTokenSilently();
                let connectionData = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/profile/getConnections`,
                    {
                        profileID: auth0.user.sub
                    },
                    {
                        withCredentials: true,
                        headers:
                        {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                )

                setConnections(connectionData.data)
                setLoadingForPage(true)
            }

            getConnections()

        console.log(connections)
    }

    return (
<Box>
        {(!matches && LoadingForPage) && (
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
                    { connections.map((connection) => 
                    <Box sx={{display:"flex", justifyContent:"space-between", width:"100%"}} key={connection.connectionID}>
                        <Box sx={{width:"25%" , p:"1%"}}>{connection.connectionName}</Box>
                        <Box sx={{width:"25%", p:"1%"}}>{connection.name}</Box>
                        <Box sx={{width:"25%", p:"1%"}}>{connection.name}</Box>
                        { !connection.isLinked ?
                        <Button sx={{ p:"1%",width:"27%", display:"flex", textAlign:"start", color:theme.palette.success.light, justifyContent:"end" }} onClick={() => {CallAuthorization(connection.connectionName)}}>
                            <Box sx={{width:"60%", textAlign:"start", p:"0%"}}>Link</Box>        
                        </Button>
                        :
                        <Button sx={{ p:"1%",width:"27%", display:"flex", textAlign:"start", color:theme.palette.success.light, justifyContent:"end" }} onClick={() => {CallUnLink(connection.connectionName)}}>
                            <Box sx={{width:"60%", textAlign:"start", p:"0%"}}>UnLink</Box>        
                        </Button>
                        }
                    </Box>                                
                      )}
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
    )
};

