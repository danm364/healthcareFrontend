import axios from "axios";

export const ProfileLoader = {
    async loadProfileInfo(token)
    {
        let data = axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login/profileInfo`,
            {
                username: 'danm364@yahoo.com'
            },
            {
            headers:
            {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                console.log(response)
                return (response);
            })
            .catch((err) => {
                console.log(err)
                return err
            })

        return data
    }

}