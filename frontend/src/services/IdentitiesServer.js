import { base as serverbase } from "./Serverbase";
import { jwtDecode } from 'jwt-decode';


const login = (loginRequest) => {
    return serverbase.post(`login`, loginRequest)
}

const register = (registerRequest) => {
    return serverbase.post(`identites`, registerRequest)
}

const getAllIdentities = (getAllIdentitiesRequest) => {
    return serverbase.get("identites/" + getAllIdentitiesRequest.pageNumber)
}

const deleteCurrentIdentity = () => {
    return serverbase.delete("identites/me")
}

const isServiceHealthy = async () => {
    try {
        var res = await serverbase.get("identities/health")
        return res.status === 200
    }
    catch (error) {
        return false
    }
}

const deleteIdentity = (deleteIdentityRequest) => {
    return serverbase.delete("identites/" + deleteIdentityRequest.email)
}

const getCurrentUserEmail = () => {

    var token = document.cookie.split('=')[1]
    if (token) {
        return jwtDecode(token).Email
    }
    window.location.replace('/login')
    return
}

const getCurrentUserRole = () => {

    var token = document.cookie.split('=')[1]
    if (token) {
        return jwtDecode(token).Role
    }
    window.location.replace('/login')
    return
}

const getCurrentRole = () => {

    var token = document.cookie.split('=')[1]
    if (token) {
        return jwtDecode(token).Role
    }
    return "Anonymous"
}


const isAuthorized = () => {

    var token = document.cookie.split('=')[1]
    if (token) {
        return true
    }
    return false
}

export default {
    isServiceHealthy,
    login,
    register,
    getCurrentUserEmail,
    getAllIdentities,
    getCurrentUserRole,
    deleteIdentity,
    isAuthorized,
    deleteCurrentIdentity,
    getCurrentRole
}