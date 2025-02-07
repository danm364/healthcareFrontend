
//auth0
import { useAuth0 } from "@auth0/auth0-react";

//mui components
import {
    IconButton, Avatar, Box, Container, Grid, Rating, Button, ListItemText, List, ListItem,
    Typography, ButtonGroup, Divider, TextField, FormControl, useTheme, useMediaQuery,
    AccordionSummary, AccordionDetails, Accordion
} from '@mui/material';

//React
import { useNavigate, useLoaderData, Form } from "react-router-dom";
import { useState, useEffect, React } from 'react';

//icons
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import LoadingPage from "../loadingPage/LoadingPage";
import PdfExample from "./0012714837 - Certificate of Organization.pdf"

import { ClaimsLoader } from "../../loaders/GetClaims";

export default function Claims() {
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("mobile"));

    //auth0
    let auth0 = useAuth0();
    let isAuthenticated = auth0.isAuthenticated

    const theme = useTheme();
    const navigation = useNavigate();

    let loading = navigation.state === "loading"

    useEffect(() =>{
        async function returnInfo()
        {
            let token = await auth0?.getAccessTokenSilently()
            let user = await auth0?.user?.sub;

            if (user && token && isAuthenticated)
            {
                let claimsInfo = await ClaimsLoader.GetClaims(token, user)
                claimsInfo = claimsInfo.data

            }
        }

        returnInfo()
    }, [] )

    if (auth0.isLoading || loading)
    {
        return <LoadingPage />
    }

    return (
        isAuthenticated && (
            <Container maxwidth="sm" sx={{ height: 800, mt: 5, display: "flex", flexDirection: "column" }} >
                <Accordion >
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography>2024</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${theme.palette.primary.main}` }}>
                        <Box sx={ { width: "100%"} }>
                            <Typography>Date Submitted: Jan 2024</Typography>
                            <Typography>Claim Rejected: Mar 2024</Typography>
                        </Box>
                    </AccordionDetails>
                    <AccordionDetails sx={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${theme.palette.primary.main}` }}>
                        <Box sx={{ width: "100%" }}>
                            <Typography>Date Submitted: Jan 2024</Typography>
                            <Typography>Claim Rejected: Mar 2024</Typography>
                        </Box>
                    </AccordionDetails>
                    <AccordionDetails sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Box sx={{ width: "100%" }}>
                            <Typography>Date Submitted: Jan 2024</Typography>
                            <Typography>Claim Rejected: Mar 2024</Typography>
                        </Box>
                    </AccordionDetails>

                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <Typography>2023</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </ Container>
        )
    );
};