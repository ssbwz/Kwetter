import serverbase from "./Serverbase";

const getUserByEmail = (email) => {
    return serverbase.get(`profiles/${email}`)
}

const updateProfile = (updateProfileRequest) => {
    return serverbase.put(`profiles`, updateProfileRequest)
}

export default {
    getUserByEmail,
    updateProfile
}