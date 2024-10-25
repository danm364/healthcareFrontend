
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

//utilites
import {linkContext} from "../../utilities/LinkContext"

//pages

export default function LinkedAccounts() {

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
                let connectionData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/profile/getConnections`,
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
    console.log(connections)


                
            }

            getConnections()
    }, [])


    async function CallAuthorization()
    {

        const accessToken = await auth0.getAccessTokenSilently();
        const id = await auth0.getIdTokenClaims();

        
        await SecondaryAccount.loginWithPopup(
            {
                authorizationParams: {
                    connection: 'cigna',
                    redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}profile`

                }

            }
        )

        let cignaid = await SecondaryAccount.getIdTokenClaims()
        let auth0Id = await auth0.getIdTokenClaims()

        let authData = 
        {

        }

        let data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/profile/userAuth0Info`,
            {
                 
                    PrimaryAccountID: auth0Id?.sub,
                    PrimaryAccessToken: await auth0.getAccessTokenSilently(),
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
                    <Box sx={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                        <Box sx={{width:"25%" , p:"1%"}}>{connection.name}</Box>
                        <Box sx={{width:"25%", p:"1%"}}>https://aetna.com</Box>
                        <Box sx={{width:"25%", p:"1%"}}>Aetna</Box>
                        <Button sx={{ p:"1%",width:"27%", display:"flex", textAlign:"start", color:theme.palette.success.light, justifyContent:"end" }} onClick={CallAuthorization}>
                            <Box sx={{width:"60%", textAlign:"start", p:"0%"}}>Link</Box>        
                        </Button>
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

