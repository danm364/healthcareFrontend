import NavBar from "./NavBar"
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { linkContext } from './utilities/LinkContext';

const Auth0ProviderSecondaryAccount = ({children, ...props}) => 
    {
        const navigate = useNavigate();
        const onRedirectCallback = (appState) => {
          navigate((appState && appState.returnTo) || window.location.pathname);
        };
        return (
          <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
            {children}
          </Auth0Provider>
        );
    }
    const linkProviderConfig = {
        clientId:`${process.env.REACT_APP_AUTH_CLIENT_ID}`,
        connection:"aetna",
        domain:`${process.env.REACT_APP_AUTH_DOMAIN}`,
        context: linkContext,
        authorizationParams:
        {
            redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}profile`,
            scope: "openid+profile+email"
        },
        skipRedirectCallback: window.location.href.includes('?primary'),
    };


      console.log(process.env.REACT_APP_AUTH_DOMAIN)

    const primaryProvider =
    {
        domain:`${process.env.REACT_APP_AUTH_DOMAIN}`,
        clientId:`${process.env.REACT_APP_AUTH_CLIENT_ID}`,
        audience:`${process.env.REACT_APP_AUTH_AUDIENCE}`,
        authorizationParams:
        {
            audience: `${process.env.REACT_APP_AUTH_AUDIENCE}`,
            redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}?primary`,
            scope: "openid+profile+email"
        },
        skipRedirectCallback: window.location.href.includes('?secondary'),
    }


export default function ContextLayer()
{
    console.log(useAuth0())
    console.log(useAuth0(linkContext))



    return (
        <Auth0ProviderSecondaryAccount  {...linkProviderConfig}>

        <Auth0ProviderSecondaryAccount  {...primaryProvider}>
                <NavBar />
            </Auth0ProviderSecondaryAccount>            
        </Auth0ProviderSecondaryAccount>
    )
}