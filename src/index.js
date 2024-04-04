import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Register from './components/Register';
import Profile from './components/Profile';
import LandingPage from './components/landingpage/LandingPage';
import { accessToken } from "./components/AccessToken";
import ErrorPage from './error-pages/error-page';
import { LoaderFunctionArgs } from "react-router-dom";
import {
    Form,
    Link,
    Outlet,
    RouterProvider,
    createBrowserRouter,
    redirect,
    useFetcher,
    useLocation,
    useRouteLoaderData,
} from "react-router-dom";
import { ProfileLoader } from "./loaders/ProfileLoader";
import { createAuth0Client } from '@auth0/auth0-spa-js';

const AUTH0_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN;
const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH_CLIENT_ID;
const AUTH0_AUDIENCE = process.env.REACT_APP_AUTH_AUDIENCE;
const auth0 = await createAuth0Client({
    domain: AUTH0_DOMAIN,
    clientId: AUTH0_CLIENT_ID,
    audience: AUTH0_AUDIENCE
});
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        loader: async function loader() {

            console.log(auth0)

            let isAuthenticated = await auth0.isAuthenticated();
            console.log(isAuthenticated)
            //let isAuthenticated = await auth0.isAuthenticated();
            return [auth0, isAuthenticated]
        },
        children: [

            {
                path: "/",
                element: <LandingPage />,
                errorElement: <ErrorPage />
            },

            {
                path: "profile",
                element: <Profile />,
            errorElement: <ErrorPage />,
            loader: async function loader() {
                console.log("hello")
                let user = await auth0.getUser();
                let authenticated = await auth0.isAuthenticated();
                if (authenticated && user) {
                    let token = await auth0.getTokenSilently();
                    console.log(token);

                    let dbData = await ProfileLoader.loadProfileInfo(token);
                    console.log(dbData)

                }
                console.log(authenticated)
                // Our root route always provides the user, if logged in
                return { user: user, isAuthenticated: authenticated };
            },
            },

            {
                path: "home",
                element: <LandingPage />,
                errorElement: <ErrorPage />
            },

            {
                path: "register",
                element: <Register />,
                errorElement: <ErrorPage />
            }            
        ]
    },
    //{
    //    path: "/login-result",
    //    loader: {
    //        async loader() {
    //            await auth0AuthProvider.handleSigninRedirect();
    //            let isAuthenticated = await auth0AuthProvider.isAuthenticated();
    //            if (isAuthenticated) {
    //                let redirectTo =
    //                    new URLSearchParams(window.location.search).get("redirectTo") || "/";
    //                return redirect(redirectTo);
    //            }
    //            return redirect("/");
    //        },
    //        Component: () => null,
    //    }
    //},
    //{
    //    path: "/logout",
    //    action: {
    //        async action() {
    //            // We signout in a "resource route" that we can hit from a fetcher.Form
    //            await auth0AuthProvider.signout();
    //            return redirect("/");
    //        }
    //    }
    //},
]);
console.log(process.env.REACT_APP_AUTH_AUDIENCE)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
            <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
