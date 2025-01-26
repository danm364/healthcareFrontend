import * as React from 'react';
import Alert from '@mui/material/Alert';
import { Box, LinearProgress } from '@mui/material';



export default function ErrorMessage({errorMessage})
{
    return (
        <Box sx={{ width: '100%', mb:"10px" }}>
            <Alert severity="error">{errorMessage}</Alert>
        </Box>
    );
}