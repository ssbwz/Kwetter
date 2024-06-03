import serverbase from "./Serverbase";

const getUserByEmail = (email) => {
    return serverbase.get(`profiles?email=${email}`)
}

const updateProfile = (updateProfileRequest) => {
    return serverbase.put(`profiles`, updateProfileRequest)
}

const getCurrentProfile = (email) => {
    return serverbase.get(`profiles/me`)
}

export default {
    getUserByEmail,
    updateProfile,
    getCurrentProfile
}