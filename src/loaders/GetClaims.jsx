import axios from "axios";

export const ClaimsLoader =
{
    async GetClaims(token, user)
    {
        let username = user
        let data =  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/Claims/GetExplanationOfBenefits`,
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