import { useAuth0 } from "@auth0/auth0-react";

export const AccessToken = async () => {
    const { getAccessTokenSilently, user } = useAuth0();

    return {user, getAccessTokenSilently}
}