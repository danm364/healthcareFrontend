import React from 'react';
import './index.css';
import Profile from './components/profilePage/Profile';
import LandingPage from './components/landingpage/LandingPage';
import ErrorPage from './error-pages/error-page';
import {
    RouterProvider,
    createBrowserRouter,
    redirect
} from "react-router-dom";
import { ProfileLoader } from "./loaders/ProfileLoader";
import { ProfileAction } from "./actions/ProfileAction";
import { useAuth0 } from '@auth0/auth0-react';
import NavBar from "./NavBar"
import { deepmerge } from '@mui/utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const App = () => {
    const auth0 = useAuth0();

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

    const router = React.useMemo(() => { // <-- memoize router reference
        return createBrowserRouter([
            {
                path: "/",
                element: <NavBar />,
                errorElement: <ErrorPage />,
                loader: async function loader() {

                    let isAuthenticated = auth0.isAuthenticated
                    return auth0
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
                            let user = await auth0.user;
                            let authenticated = auth0.isAuthenticated;
                            let profileInfo;
                            if (authenticated && user) {
                                let token = await auth0.getAccessTokenSilently();
                                profileInfo = await ProfileLoader.loadProfileInfo(token, user);
                            }
                            // Our root route always provides the user, if logged in
                            return { user: user, isAuthenticated: authenticated, profileInfo: profileInfo};
                        },
                        action: async function ({ request }) {
                            await ProfileAction.updateProfileInfo(request, auth0)
                            return redirect("/profile")
                        }
                    },

                    {
                        path: "home",
                        element: <LandingPage />,
                        errorElement: <ErrorPage />
                    }
                ]
            },
        ]);
    }, [auth0]); // <-- auth0 external dependency

    return <ThemeProvider theme={theme }><RouterProvider router={router} /></ThemeProvider>;
};

