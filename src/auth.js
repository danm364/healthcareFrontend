import { createAuth0Client, getTokenSilently } from "@auth0/auth0-spa-js";

// You probably want these coming from sort of endpoint you can query,
// instead of hardcoded in your application bundle
const AUTH0_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN;
const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH_CLIENT_ID;
const AUTH0_AUDIENCE = process.env.REACT_APP_AUTH_AUDIENCE;

let auth0ClientPromise;
function getClient() {
    if (!auth0ClientPromise) {
        auth0ClientPromise = createAuth0Client({
            domain: AUTH0_DOMAIN,
            clientId: AUTH0_CLIENT_ID,
            audience: AUTH0_AUDIENCE
        });
    }
    return auth0ClientPromise;
}
auth0ClientPromise = await getClient();

export const auth0AuthProvider = {
    async isAuthenticated() {
        let client = await getClient();
        return client.isAuthenticated();
    },
    async username() {
        let client = await getClient();
        let user = await client.getUser();
        return user?.name || null;
    },

    async getToken()
    {
        let client = await getClient();
        let token = await client.getIdTokenClaims();
        token = token["__raw"]
        token = await client.getTokenSilently();
        return token
    },

    async getUser() {
        let client = await getClient();
        return client.getUser();
    },

    async signin() {
        let client = await getClient();
            await client.loginWithRedirect({
                authorizationParams: {
                    redirect_uri: "http://127.0.0.1:3000/"
                },
            });
    },
    async handleSigninRedirect() {
        const query = window.location.search;
        if (query.includes("code=") && query.includes("state=")) {
            let client = await getClient();
            await client.handleRedirectCallback();
        }
    },
    async signout() {
        let client = await getClient();
        await client.logout({
            logoutParams: {
                returnTo: 'http://localhost:3000/'
            }
        });
    },
};