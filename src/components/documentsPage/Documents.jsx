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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../loadingPage/LoadingPage";


export default function Profile() {
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("mobile"));
    let auth0 = useAuth0();
    let isAuthenticated = auth0.isAuthenticated

    const navigation = useNavigate();

    let loading = navigation.state === "loading"

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
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
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