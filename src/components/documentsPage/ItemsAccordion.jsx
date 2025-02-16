
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

import AdjudicationItemsAccordion from "./AdjudicationItemsAccordion";

export default function ItemsAccordion({items, setItems, adjudicationItems, setAdjudicationItems, explanationOfBenefitIdentifier}) {
    const theme = useTheme();

    return (
            <Box sx={{display:"block"}}>
                { items.filter((a) => a.ExplanationOfBenefitIdentifier == explanationOfBenefitIdentifier).map(item => (
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography>Item</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ display: "block", justifyContent: "space-between", borderBottom: `1px solid ${theme.palette.primary.main}` }}>
                            <Box sx={ { width: "100%"} }>
                                <Typography>Item: {item.ProductDisplay} </Typography>
                                <Typography>Location: {item.LocationDisplay}</Typography>
                                <Typography>Item Value: {item.ItemValue}</Typography>
                            </Box>
                            <AdjudicationItemsAccordion adjudicationItems={adjudicationItems} explanationOfBenefitIdentifier={explanationOfBenefitIdentifier} itemID={item.ItemID}/>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </ Box>
    );
};