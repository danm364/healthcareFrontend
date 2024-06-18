import axios from "axios";

export const ProfileLoader = {
    async loadProfileInfo(token)
    {
        let username = 'danm364@yahoo.com'
        let data =  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/profile/profileInfo`,
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