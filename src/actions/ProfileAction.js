import axios from "axios";

export const ProfileAction =
{
    async updateProfileInfo(formData, auth0)
    {
        let user = await auth0.user;
        let token = await auth0.getAccessTokenSilently();
        let authenticated = auth0.isAuthenticated;
        let username = user.sub

        if (authenticated && user)
        {
            const profileData = formData;
            const firstName = profileData.get("firstName")
            const lastName = profileData.get("lastName")
            const apartmentNumber = profileData.get("apartmentNumber")
            const address = profileData.get("address")
            const email = profileData.get("email")
            const profileInfo =
            {
                firstName: firstName,
                lastName: lastName,
                apartmentNumber: apartmentNumber,
                address: address,
                email: email,
                username: username
            }
            let data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/profile/updateProfileInfo`,

                profileInfo
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