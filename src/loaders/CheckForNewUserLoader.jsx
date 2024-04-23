import axios from "axios";

export const ProfileLoader = {
    async loadProfileInfo(token) {
        let data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login/userCheck`,
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