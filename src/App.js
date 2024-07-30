import React from 'react';
import './index.css';
import Profile from './components/profilePage/Profile';
import LandingPage from './components/landingpage/LandingPage';
import DocumentsPage from './components/documentsPage/Documents';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    Await,
    defer,
    useLoaderData,
} from "react-router-dom";

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

                    
                    return auth0
                },
                children: [

                    {
                        path: "/",
                        element: <LandingPage />,
                        errorElement: <ErrorPage />
                    },

                    {
                        path: "/profile",
                        element: <Profile />,
                        errorElement: <ErrorPage />,
                        action: async function ({ request }) {
                            let formData = await request.formData();
                            let intent = formData.get("intent")

                            if (intent === "submit")
                            {
                                await ProfileAction.updateProfileInfo(formData, auth0)
                                return redirect("/profile")
                            }

                            if (intent === "upload")
                            {
                                console.log(formData)
                                console.log(formData.get("picture"))
                                return redirect("/profile")
                            }
                            
                        }
                    },

                    {
                        path: "documents",
                        element: <DocumentsPage />,
                        errorElement: <ErrorPage />,
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

