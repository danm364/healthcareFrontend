import axios from "axios";

export const ProfileLoader =
{
    async loadProfileInfo(token, user)
    {
        let username = user
        let data =  await axios.post(`${process.env.REACT_APP_IDENTITY_BACKEND_URL}/api/Profile/profileInfo`,
            {
                username
            }
            ,
            {
            withCredentials: true,
            headers:
                {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response) => {
                return (response);
            })
            .catch((err) => {
                console.log(err)
                return err
            })

            return data
    }

}