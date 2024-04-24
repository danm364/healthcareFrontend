import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { App } from './App';

//const AUTH0_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN;
//const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH_CLIENT_ID;
//const AUTH0_AUDIENCE = process.env.REACT_APP_AUTH_AUDIENCE;
//const auth0 = await createAuth0Client({
//    domain: AUTH0_DOMAIN,
//    clientId: AUTH0_CLIENT_ID,
//    audience: AUTH0_AUDIENCE
//});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Auth0Provider
            domain={process.env.REACT_APP_AUTH_DOMAIN}
            clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
            audience={process.env.REACT_APP_AUTH_AUDIENCE}
            authorizationParams={{
                audience: `${process.env.REACT_APP_AUTH_AUDIENCE}`,
                redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}`,
                scope: "openid+profile+email"
            }}
        >
            <App />
        </Auth0Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
