
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
export default function DetailPanel({adjudicationItems, selectedRow, detailPanelRows, detailPanelColumns}) {
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("mobile"));



    return (
        <Stack
        sx={{ py: 2, height: '100%', boxSizing: 'border-box' }}
        direction="column"
      >
        <Paper sx={{ flex: 1, mx: 'auto', width: '90%', p: 1 }}>
          <Stack direction="column" spacing={1} sx={{ height: 1 }}>
            <Typography variant="h6">{`Order #`}</Typography>
            <Grid container>
              <Grid item md={6}>
                <Typography variant="body2" color="textSecondary">
                  Customer information
                </Typography>
                <Typography variant="body1"></Typography>
                <Typography variant="body1"></Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="body2" align="right" color="textSecondary">
                  Shipping address
                </Typography>
                <Typography variant="body1" align="right">
                </Typography>
                <Typography variant="body1" align="right">
                </Typography>
              </Grid>
            </Grid>
            <DataGridPro
              density="compact"
              columns={detailPanelColumns}
              rows={detailPanelRows.filter(element => element.ItemID == selectedRow.id && selectedRow.row.ExplanationOfBenefitIdentifier == element.ExplanationOfBenefitIdentifier)}
              sx={{ flex: 1 }}
              hideFooter
            />
          </Stack>
        </Paper>
      </Stack>
    );
};

