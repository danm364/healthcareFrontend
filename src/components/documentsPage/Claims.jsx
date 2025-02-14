
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

import ItemsAccordion from "./ItemsAccordion"
import AjudicationItemsAccordion from "./AjudicationItemsAccordion";

export default function Claims() {
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("mobile"));

    //auth0
    let auth0 = useAuth0();
    let isAuthenticated = auth0.isAuthenticated

    const theme = useTheme();
    const navigation = useNavigate();

    const [explanationOfBenefits, setExplanationOfBenefits] = useState([{}])
    const [items, setItems] = useState([{}])
    const [adjudicationItems, setAdjudicationItems] = useState([{}])
    const [useEffectLoading, setUseEffectLoading] = useState(true)
    const [yearList, setYearList] = useState([])
    


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

                setExplanationOfBenefits(claimsInfo["E"]);
                setItems(claimsInfo["I"]);
                setAdjudicationItems(claimsInfo["A"]);

                let listOfYears = [];

                claimsInfo["E"].forEach(element => {
                    let year = new Date(element?.BillablePeriodStart?.Value).getFullYear();
                    if (!listOfYears.includes(year))
                    {
                        listOfYears.push(year)
                    }
                    else
                    {
                        return;
                    }
                });
        
                setYearList(listOfYears);

                setUseEffectLoading(false)

            }

        }

        returnInfo()


    }, [] )

    if (auth0.isLoading || loading || useEffectLoading)
    {
        return <LoadingPage />
    }

    return (
        isAuthenticated && (
            <Container maxwidth="sm" sx={{ height: 800, mt: 5, display: "flex", flexDirection: "column" }} >
                    { 
                        (yearList != null) ? yearList.sort((a, b) => {
                            return b-a
                        }).map(year => (
                            <Accordion >
                                        <AccordionSummary
                                            expandIcon={<ArrowDropDownIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                        >
                                            <Typography>{year}</Typography>
                                        </AccordionSummary>

                                        { explanationOfBenefits.filter((a) => new Date(a.BillablePeriodStart?.Value).getFullYear() == year).map(item => (
                                            <AccordionDetails sx={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${theme.palette.primary.main}`, flexDirection: "column"}}>
                                                <Box sx={ { width: "100%"} }>
                                                    <Typography>Billing Period: {new Date(item.BillablePeriodStart?.Value).toLocaleDateString()} - {new Date(item.BillablePeriodEnd?.Value).toLocaleDateString()}</Typography>
                                                    <Typography>Type: {item.ExplanationOfBenefitUse}</Typography>
                                                    <Typography>Outcome: {item.Outcome}</Typography>
                                                </Box>
                                                <ItemsAccordion items={items} setItems={setItems} adjudicationItems={adjudicationItems} setAdjudicationItems={setAdjudicationItems}
                                                                explanationOfBenefitIdentifier={item.Identifier}                
                                                />
                                            </AccordionDetails>
                                        ))}
                            </Accordion>
                        )) 
                        :
                        <div></div>
                    }
            </ Container>
        )
    );
};