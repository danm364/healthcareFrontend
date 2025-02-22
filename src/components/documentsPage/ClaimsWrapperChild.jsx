
//auth0
import { useAuth0 } from "@auth0/auth0-react";
import * as React from 'react';

//mui components
import {
    IconButton, Avatar, Box, Container, Grid, Rating, Button, ListItemText, List, ListItem,
    Typography, ButtonGroup, Divider, TextField, FormControl, useTheme, useMediaQuery,
    AccordionSummary, AccordionDetails, Accordion, Paper, Stack
} from '@mui/material';
import { DataGridPro, DataGridProProps, GridColDef } from '@mui/x-data-grid-pro';
//React
import { useNavigate, useLoaderData, Form } from "react-router-dom";
import { useState, useEffect } from 'react';

//icons
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import LoadingPage from "../loadingPage/LoadingPage";
import PdfExample from "./0012714837 - Certificate of Organization.pdf"

import { ClaimsLoader } from "../../loaders/GetClaims";

import ItemsAccordion from "./ItemsAccordion";
import AjudicationItemsAccordion from "./AdjudicationItemsAccordion";
import ChildGrid from "./ChildGrid";
import CacheParentGrid from "./CacheParentGrid"

// function CacheParentGrid({childRows, childColumns, adjudicationItems}) {
//     const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("mobile"));

//     const getDetailPanelContent = React.useCallback(
//         ({ childRows, childColumns, adjudicationItems}) => <ChildGrid row={childRows} columns={childColumns} adjudicationItems={adjudicationItems} />,
//         [childRows, childColumns, adjudicationItems],
//       );

//     return getDetailPanelContent
// };
export default function Claims({items, setItems, adjudicationItems, setAdjudicationItems, explanationOfBenefits, toggleDataDisplay, yearList, 
                                dataDisplay, parentRows, parentColumns, childRows, childColumns, setChildRows, setChildColumns,
                                detailPanelRows, detailPanelColumns}) 
{
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("mobile"));

    //auth0
    let auth0 = useAuth0();
    let isAuthenticated = auth0.isAuthenticated

    const theme = useTheme();
    const navigation = useNavigate();
    const getDetailPanelHeight = React.useCallback(() => 400, [])


    const getDetailPanelContent = React.useCallback(
        (row) => <ChildGrid childRows={childRows} childColumns={childColumns} adjudicationItems={adjudicationItems} 
                            row={row} detailPanelRows={detailPanelRows} detailPanelColumns={detailPanelColumns}
                />, [],);

    return (
        isAuthenticated && (
            <Container maxwidth="sm" sx={{ height: 800, mt: 5, display: "flex", flexDirection: "column" }} >
                    <Box>
                        <Button onClick={() => toggleDataDisplay(true)}>Grid</Button>
                        <Button onClick={() => toggleDataDisplay(false)}>Tree Hierarchy</Button>
                    </Box>
                    { 
                        ((yearList != null) & !dataDisplay) ? yearList.sort((a, b) => {
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

                    {
                        ((yearList != null) & dataDisplay) ? 
                        (
                            <DataGridPro
                                rows={parentRows}
                                columns={parentColumns}
                                getDetailPanelHeight={getDetailPanelHeight}
                                getDetailPanelContent={getDetailPanelContent}
                            >

                            </DataGridPro>

                        )
                        :
                        <div></div>
                    }

            </ Container>
        )
    );
};

