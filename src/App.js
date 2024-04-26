import React from 'react';
import './index.css';
import Register from './components/Register';
import Profile from './components/Profile';
import LandingPage from './components/landingpage/LandingPage';
import ErrorPage from './error-pages/error-page';
import {
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import { ProfileLoader } from "./loaders/ProfileLoader";
import { useAuth0 } from '@auth0/auth0-react';
import NavBar from "./NavBar"


export const App = () => {
    const auth0 = useAuth0();

    const router = React.useMemo(() => { // <-- memoize router reference
        return createBrowserRouter([
            {
                path: "/",
                element: <NavBar />,
                errorElement: <ErrorPage />,
                loader: async function loader() {

                    let isAuthenticated = auth0.isAuthenticated
                    //let isAuthenticated = await auth0.isAuthenticated();
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
                            console.log(auth0)
                            let user = await auth0.user;
                            let authenticated = auth0.isAuthenticated;
                            if (authenticated && user) {
                                let token = await auth0.getAccessTokenSilently();
                                let dbData = await ProfileLoader.loadProfileInfo(token);
                            }
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
        ]);
    }, [auth0]); // <-- auth0 external dependency

    return <RouterProvider router={router} />;
};

