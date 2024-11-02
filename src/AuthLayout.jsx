import { useLoaderData, useOutlet } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';


export const AuthLayout = () => {
    const outlet = useOutlet();

    return (
        <Auth0Provider
            domain={process.env.REACT_APP_AUTH_DOMAIN}
            clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
            audience={process.env.REACT_APP_AUTH_AUDIENCE}
            authorizationParams=
            {{
                audience: `${process.env.REACT_APP_AUTH_AUDIENCE}`,
                redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}`,
                scope: "openid+profile+email"
            }}
        >
            {outlet}
        </Auth0Provider>
    );
};