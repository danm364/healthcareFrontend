import axios from "axios";

export const ProfileAction = {
    async updateProfileInfo(request, token) {
        const profileData = await request.formData();
        let username = 'danm364@yahoo.com'

        const firstName = profileData.get("firstName")
        const lastName = profileData.get("lastName")
        const apartmentNumber = profileData.get("apartmentNumber")
        const address = profileData.get("address")
        const email = profileData.get("email")
        const profileInfo = {
            firstName: firstName,
            lastName: lastName,
            apartmentNumber: apartmentNumber,
            address: address,
            email: email,
            username: username
        }
        let data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login/updateProfileInfo`,
            {
                profileInfo
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