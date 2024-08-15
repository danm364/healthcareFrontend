import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { router } from "./App"
import { RouterProvider } from '../node_modules/react-router-dom/dist/index';

const theme = createTheme({
    breakpoints: {
        values: {
            mobile: 430,
            tablet: 640,
            laptop: 1024,
            desktop: 1200,
        },
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#f50057',
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        
        <ThemeProvider theme={theme}>
            <RouterProvider router={router } />
        </ThemeProvider>
);

