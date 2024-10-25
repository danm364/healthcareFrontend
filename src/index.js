import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { router } from "./App"
import { RouterProvider } from '../node_modules/react-router-dom/dist/index';
import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { linkContext } from './utilities/LinkContext';

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
    // <Auth0Provider
    //     domain={process.env.REACT_APP_AUTH_DOMAIN}
    //     clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
    //     audience={process.env.REACT_APP_AUTH_AUDIENCE}
    //     authorizationParams=
    //     {{
    //         audience: `${process.env.REACT_APP_AUTH_AUDIENCE}`,
    //         redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}`,
    //         scope: "openid+profile+email"
    //     }}
    // >
            <ThemeProvider theme={theme}>
                <RouterProvider router={router } />
            </ThemeProvider>
    // </Auth0Provider>
);

