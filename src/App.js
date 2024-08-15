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
    Route
} from "react-router-dom";
import { ProfileLoader } from "./loaders/ProfileLoader";
import { ProfileAction } from "./actions/ProfileAction";
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


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthLayout />}>
            <Route path="/" element={<NavBar />} errorElement={<ErrorPage />}>
                <Route index element={<LandingPage />} errorElement={<ErrorPage />} ></Route>
                <Route
                    path="/profile"
                    element={<Profile />}
                    errorElement={<ErrorPage />}
                    loader={async () =>  {
                        let auth0 = useAuth0()

                        //let user = await auth0?.user;
                        //let authenticated = auth0?.isAuthenticated;
                        //let profileInfo;
                        //if (authenticated && user) {
                        //    let token = await auth0?.getAccessTokenSilently();

                        //    profileInfo = await ProfileLoader.loadProfileInfo(token, user);


                        //    console.log("here")
                        //    console.log(window)
                        //    return { user: user, isAuthenticated: authenticated, profileInfo: profileInfo }
                        //}
                        return null
                    }}
                    action={async function ({ request }) {
                        let auth0 = useAuth0()
                        let formData = await request.formData();
                        let intent = formData.get("intent")

                        if (intent === "submit") {
                            await ProfileAction.updateProfileInfo(formData, auth0)
                            return redirect("/profile")
                        }

                        if (intent === "upload") {
                            console.log(formData)
                            console.log(formData.get("picture"))
                            return redirect("/profile")
                        }

                    }}
                >

                </Route>
                <Route path="/documents" element={<DocumentsPage />} errorElement={<ErrorPage />} ></Route>
                <Route path="/home" element={<NewLandingPage />} errorElement={<ErrorPage />} ></Route>
                <Route path="/about" element={ <ErrorPage />}></Route>
            </Route>
        </Route>

    ))

