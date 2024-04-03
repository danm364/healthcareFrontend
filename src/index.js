import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Register from './components/Register';
import Profile from './components/Profile';
import LandingPage from './components/landingpage/LandingPage';
import { accessToken } from "./components/AccessToken";
import ErrorPage from './error-pages/error-page';
import { Auth0Provider } from '@auth0/auth0-react';
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
import { auth0AuthProvider } from "./auth";
import { ProfileLoader } from "./loaders/ProfileLoader";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [

            {
                path: "",
                element: <LandingPage />,
                errorElement: <ErrorPage />
            },

            {
                path: "profile",
                element: <Profile />,
            errorElement: <ErrorPage />,
            loader: async function loader() {
                console.log("hello")
                let user = await auth0AuthProvider.username();
                let authenticated = await auth0AuthProvider.isAuthenticated();
                if (authenticated && user) {
                    let token = await auth0AuthProvider.getToken();
                    console.log(token);

                    let dbData = await ProfileLoader.loadProfileInfo(token);
                    console.log(dbData)

                }
                console.log(authenticated)
                // Our root route always provides the user, if logged in
                return { user };
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
    {
        path: "/login-result",
        loader: {
            async loader() {
                await auth0AuthProvider.handleSigninRedirect();
                let isAuthenticated = await auth0AuthProvider.isAuthenticated();
                if (isAuthenticated) {
                    let redirectTo =
                        new URLSearchParams(window.location.search).get("redirectTo") || "/";
                    return redirect(redirectTo);
                }
                return redirect("/");
            },
            Component: () => null,
        }
    },
    {
        path: "/logout",
        action: {
            async action() {
                // We signout in a "resource route" that we can hit from a fetcher.Form
                await auth0AuthProvider.signout();
                return redirect("/");
            }
        }
    },
]);
console.log(process.env.REACT_APP_AUTH_AUDIENCE)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Auth0Provider
            domain="healthease.us.auth0.com"
            clientId="OJEAiU4DNGAh06kPtZnsq90T36O9AIy6"
            audience="process.env.REACT_APP_AUTH_AUDIENCE"
            authorizationParams={{
                redirect_uri: "http://127.0.0.1:3000/"
            }}
        >
            <RouterProvider router={router} />
        </Auth0Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
