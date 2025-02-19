
//auth0
import { useAuth0 } from "@auth0/auth0-react";

//mui components
import {
    IconButton, Avatar, Box, Container, Grid, Rating, Button, ListItemText, List, ListItem,
    Typography, ButtonGroup, Divider, TextField, FormControl, useTheme, useMediaQuery,
    AccordionSummary, AccordionDetails, Accordion
} from '@mui/material';
import { DataGridPro, DataGridProProps, GridColDef } from '@mui/x-data-grid-pro';

//React
import { useNavigate, useLoaderData, Form } from "react-router-dom";
import { useState, useEffect, React } from 'react';

//icons
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import LoadingPage from "../loadingPage/LoadingPage";
import PdfExample from "./0012714837 - Certificate of Organization.pdf"

import { ClaimsLoader } from "../../loaders/GetClaims";

import AdjudicationItemsAccordion from "./AdjudicationItemsAccordion";

export default function ItemsAccordion({rows, columns}) {
    const theme = useTheme();

    return (
        <DataGridPro
            rows={rows}
            columns={columns}
        >

        </DataGridPro>
    );
};