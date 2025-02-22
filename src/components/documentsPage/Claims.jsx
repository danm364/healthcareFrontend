
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
import ClaimsWrapperChild from "./ClaimsWrapperChild"

export default function ClaimsWrapper()
{
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("mobile"));

    //auth0
    let auth0 = useAuth0();
    let isAuthenticated = auth0.isAuthenticated

    const theme = useTheme();
    const navigation = useNavigate();
    let loading = navigation.state === "loading"


    const [explanationOfBenefits, setExplanationOfBenefits] = useState([{}])
    const [items, setItems] = useState([{}])
    const [adjudicationItems, setAdjudicationItems] = useState([{}])
    const [useEffectLoading, setUseEffectLoading] = useState(true)
    const [yearList, setYearList] = useState([])
    const [dataDisplay, toggleDataDisplay] = useState(false)
    const [columnNames, setColumnNames] = useState([])
    const [parentRows, setParentRows] = useState([])
    const [parentColumns, setParentColumns] = useState([])
    const [childRows, setChildRows] = useState([])
    const [childColumns, setChildColumns] = useState([])

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
                let rows = []
                let explanationOfBenefitsKeys = Object.keys(claimsInfo["E"][0]);

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

                let gridParentColumnProps = 
                [
                    {field: "Identifier", headerName: "Identifer", width:150},
                    {field: "BillablePeriodStart", headerName: "Billable Period Start", width:150, valueFormatter: (value) => {
                        if (value)
                        {
                            return (new Date(value)).toDateString();
                        }
                        else
                        {
                            return '';
                        }
                    }},
                    {field: "BillablePeriodEnd", headerName: "Billable Period End", width:150, valueFormatter: (value) => {
                        if (value)
                        {
                            return (new Date(value)).toDateString();
                        }
                        else
                        {
                            return '';
                        }
                    }},
                    {field: "TotalCategoryDisplay", headerName: "Total Category Display", width:150},
                    {field: "Status", headerName: "Status", width:150},
                    {field: "Outcome", headerName: "Outcome", width:150},
                    {field: "ExplanationOfBenefitUse", headerName: "Use", width:150},
                    {field: "TotalAmount", headerName: "Total Amount", width:150}

                ];

                let gridChildColumnProps = 
                [
                    {field: "ExplanationOfBenefitIdentifier", headerName: "Identifier", width:150},
                    {field: "ItemID", headerName: "Item ID", width:150},
                    {field: "ProductDisplay", headerName: "Product", width:150},
                    {field: "ItemValue", headerName: "Item Value", width:150},
                    {field: "ItemQuantity", headerName: "Item Quantity", width:150},
                    {field: "LocationDisplay", headerName: "Location", width:150},
                    {field: "ServicedStartDate", headerName: "Serviced Start Date", width:150},
                    {field: "ServicedEndDate", headerName: "Serviced End Date", width:150}

                ];

                let gridParentRowProps = [];
                let gridChildRowProps = [];


                claimsInfo["E"].forEach(element => {
                    
                    let newRow = {};

                    explanationOfBenefitsKeys.forEach(key => {

                        if (key === "BillablePeriodStart" || key === "BillablePeriodEnd")
                        {
                            newRow[key] = new Date(element[key].Value);
                            newRow["id"] = element["Identifier"]
                        }
                        else
                        {
                            newRow[key] = element[key]
                            newRow["id"] = element["Identifier"]
                        }

                    })
                    
                    gridParentRowProps.push(newRow);
                });

                let itemKeys = []

                gridChildColumnProps.forEach(element => {
                    itemKeys.push(element.field)
                });

                claimsInfo["I"].forEach(element => {

                    let newRow = {};

                    itemKeys.forEach(key => {

                        if (key === "ServicedStartDate" || key === "ServicedEndDate")
                        {
                            newRow[key] = new Date(element[key].Value);
                        }
                        else
                        {
                            newRow[key] = element[key]
                            newRow["id"] = element["ItemID"]
                        }

                    })
                    
                    gridChildRowProps.push(newRow);
                })
        
                setYearList(listOfYears);
                setParentColumns(gridParentColumnProps)
                setParentRows(gridParentRowProps)
                setChildRows(gridChildRowProps)
                setChildColumns(gridChildColumnProps)

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
        <ClaimsWrapperChild 
            explanationOfBenefits={explanationOfBenefits} items={items} adjudicationItems={adjudicationItems} 
            setItems={setItems} toggleDataDisplay={toggleDataDisplay} yearList={yearList} dataDisplay={dataDisplay} parentRows={parentRows} 
            parentColumns={parentColumns} loading={loading} childRows={childRows} childColumns={childColumns} setChildColumns={setChildColumns} setChildRows={setChildRows}
        />
    )
}




