import React from 'react';
import './index.css';
import Profile from './components/profilePage/Profile';
import LandingPage from './components/landingpage/LandingPage';
import DocumentsPage from './components/documentsPage/Documents';
import ErrorPage from './error-pages/error-page';
import {
    RouterProvider,
    createBrowserRouter,
    redirect, 
    Route,
    Navigate,
    Link
} from "react-router-dom";
import { ProfileLoader } from "./loaders/ProfileLoader";

import { useAuth0 } from '@auth0/auth0-react';
import NavBar from "./NavBar"
import {
    Await,
    defer,
    useLoaderData,
} from "react-router-dom";

import NewLandingPage from "./components/newLandingPage/NewLandingPage"
import { createRoutesFromElements } from '../node_modules/react-router-dom/dist/index';
import { AuthLayout } from './AuthLayout'
import ErrorImage from "./images/404error.webp"
import ContextLayer from './ContextLayer';





export const router = createBrowserRouter(
    createRoutesFromElements(
            <Route path="/" element={<ContextLayer />} errorElement={<ErrorPage />}>
                    <Route index element={<LandingPage />} errorElement={<ErrorPage />} ></Route>
                    <Route
                        path="/profile"
                        element={<Profile />}
                        errorElement={<ErrorPage />}

                    >

                    </Route>
                    <Route path="/documents" element={<DocumentsPage />} errorElement={<ErrorPage />} ></Route>
                    <Route path="/home" element={<NewLandingPage />} errorElement={<ErrorPage />} ></Route>
                    <Route path="/about" element={ <ErrorPage />}></Route>
                    <Route path="/login" element = { <Link to = {{pathname : process.env.REACT_APP_AUTHORIZE_ENDPOINT}} />}/>

            </Route>
    ))

