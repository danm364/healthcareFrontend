
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
import DetailPanel from "./DetailPanel";
import AdjudicationItemsAccordion from "./AdjudicationItemsAccordion";

export default function ChildGrid({childRows, childColumns, adjudicationItems, row}) {
    const theme = useTheme();
    let variable;
    const getDetailPanelHeight = () => 400


    // const getDetailPanelContent = React.useCallback(
    //     (childRow) => <DetailPanel childRows={childRows}  row={childRow}/>,
    //     [],
    //     );

            
    return (
        <DataGridPro
            rows={childRows.filter((a) => a.ExplanationOfBenefitIdentifier === row.id)}
            columns={childColumns}
            getDetailPanelHeight={getDetailPanelHeight}
            getDetailPanelContent={<DetailPanel />}
        >

        </DataGridPro>
    );
};