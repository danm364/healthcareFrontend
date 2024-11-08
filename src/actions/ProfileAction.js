import axios from "axios";

export const ProfileAction =
{
    async updateProfileInfo(formData, auth0)
    {
        let user = await auth0.user;
        let token = await auth0.getAccessTokenSilently();
        let authenticated = auth0.isAuthenticated;
        let username = null
        formData["username"] = username ? username : ""
        formData["user"] = user.sub;
        console.log(formData)
        if (authenticated && user)
        {
            let data = await axios.post(`${process.env.REACT_APP_IDENTITY_BACKEND_URL}/api/profile/updateProfileInfo`,

                formData
                ,
                {
                    withCredentials: true,
                    headers:
                    {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
                .then((response) =>
                {
                    return (response);
                })
                .catch((err) =>
                {
                    console.log(err)
                    return err
                })

            return data
        }
    }
}