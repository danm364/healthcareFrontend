import React from 'react';
import './index.css';
import Profile from './components/profilePage/Profile';
import LandingPage from './components/landingpage/LandingPage';
import DocumentsPage from './components/documentsPage/Documents';
import ErrorPage from './error-pages/error-page';
import { ProfileLoader } from "./loaders/ProfileLoader";
import { ProfileAction } from "./actions/ProfileAction";
import { useAuth0 } from '@auth0/auth0-react';
import NavBar from "./NavBar"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    Await,
    defer,
    useLoaderData,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
    redirect
} from "react-router-dom";

import { Auth0ProviderWithNavigate } from "./Auth0ProviderWithNavigate"

export default function NewApp()  {
    //auth0 = useAuth0();
    const theme = createTheme({
        breakpoints: {
            values: {
                mobile: 430,
                tablet: 640,
                laptop: 1024,
                desktop: 1200,
            },
        },
    });

    //async function profileLoader() {
    //    let user = await auth0?.user;
    //    let authenticated = auth0?.isauthenticated;
    //    let profileinfo;
    //    if (authenticated && user) {
    //        let token = await auth0?.getaccesstokensilently();

    //        let profileinfo = await profileloader.loadprofileinfo(token, user);


    //        console.log("here")
    //        console.log(window)
    //        return { user: user, isauthenticated: authenticated, profileinfo: profileinfo }
    //    }
    //}

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={Auth0ProviderWithNavigate} path="/"
            >
                <Route index path="/" element={ LandingPage  } />
                <Route path="/profile" element={Profile}
                />
                <Route path="/documents" element={ DocumentsPage} />
            </Route>


        )
    );

    return <ThemeProvider theme={theme}><RouterProvider router={router} /></ThemeProvider>;
};
