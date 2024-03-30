import { createAuth0Client } from "@auth0/auth0-spa-js";

// You probably want these coming from sort of endpoint you can query,
// instead of hardcoded in your application bundle
const AUTH0_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN;
const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH_CLIENT_ID;

let auth0ClientPromise;

function getClient() {
    if (!auth0ClientPromise) {
        auth0ClientPromise = createAuth0Client({
            domain: AUTH0_DOMAIN,
            clientId: AUTH0_CLIENT_ID,
        });
    }
    return auth0ClientPromise;
}

export const auth0AuthProvider = {
    async isAuthenticated() {
        let client = await getClient();
        console.log(client)
        return client.isAuthenticated();
    },
    async username() {
        let client = await getClient();
        let user = await client.getUser();
        return user?.name || null;
    },

    async username() {
        let client = await getClient();
        let user = await client.getUser();
        return user?.name || null;
    },
    //async signin() {
    //    let client = await getClient();
    //    if (type === "redirect") {
    //        await client.loginWithRedirect({
    //            authorizationParams: {
    //                redirect_uri:
    //                    window.location.origin +
    //                    "/login-result?" +
    //                    new URLSearchParams([["redirectTo", redirectTo]]).toString(),
    //            },
    //        });
    //    } else {
    //        await client.loginWithPopup();
    //    }
    //},
    //async handleSigninRedirect() {
    //    const query = window.location.search;
    //    if (query.includes("code=") && query.includes("state=")) {
    //        let client = await getClient();
    //        await client.handleRedirectCallback();
    //    }
    //},
    //async signout() {
    //    let client = await getClient();
    //    await client.logout();
    //},
};