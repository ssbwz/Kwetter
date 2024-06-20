import { base as serverbase } from "./Serverbase";

const getUserByEmail = (email) => {
    return serverbase.get(`profiles?email=${email}`)
}

const updateProfile = (updateProfileRequest) => {
    return serverbase.put(`profiles`, updateProfileRequest)
}

const getCurrentProfile = (email) => {
    return serverbase.get(`profiles/me`)
}
const isServiceHealthy = async () => {
    try {
        var res = await serverbase.get("profiles/health")
        return res.status === 200
    }
    catch (error) {
        return false
    }
}

export default {
    isServiceHealthy,
    getUserByEmail,
    updateProfile,
    getCurrentProfile
}