import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import NavBar from './components/NavBar';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';
import { Auth0Provider } from '@auth0/auth0-react';
import LandingPage from './components/landingpage/LandingPage';
import axios from 'axios';
import { redirect } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <NavBar />,
        errorElement: <ErrorPage />,
        action: async () => {
            console.log("reached action")
            return redirect("/home");
        },
        children: [
            {
                path: "login",
                element: <Login />,
                errorElement: <ErrorPage />
            },
            {
                path: "",
                element: <LandingPage />,
                errorElement: <ErrorPage />
            },

            {
                path: "profile",
                element: <Profile />,
                errorElement: <ErrorPage />,
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
    }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Auth0Provider
            domain="healthease.us.auth0.com"
            clientId="OJEAiU4DNGAh06kPtZnsq90T36O9AIy6"
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
reportWebVitals();
