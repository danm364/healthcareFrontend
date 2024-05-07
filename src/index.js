import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { App } from './App';

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

