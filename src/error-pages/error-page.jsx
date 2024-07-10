import { useRouteError } from "react-router-dom";
import {
    IconButton, Avatar, Box, Container, Grid, Rating, Button, ListItemText, List, ListItem,
    Typography, ButtonGroup, Divider, TextField, FormControl
} from '@mui/material';
import error404 from '../images/404error.jpg';

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <Box component="img" alt="404 Error" src={error404} sx={ { width: "100%", height: "100%" } } >
                </Box>
    );
}