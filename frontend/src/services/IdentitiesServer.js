import serverbase from "./Serverbase";
import { jwtDecode } from 'jwt-decode';


const login = (loginRequest) => {
    return serverbase.post(`login`, loginRequest)
}

const register = (registerRequest) => {
    return serverbase.post(`identites`, registerRequest)
}

const getAllIdentities = (getAllIdentitiesRequest) => {
    return serverbase.get("identites/"+ getAllIdentitiesRequest.pageNumber)
}

const deleteCurrentIdentity = () => {
    return serverbase.delete("identites/me")
}

const deleteIdentity = (deleteIdentityRequest) => {
    return serverbase.delete("identites/" + deleteIdentityRequest.email)
}

const getCurrentUserEmail = () => {

    var token = document.cookie.split('=')[1]
    if(token){
        return jwtDecode(token).Email
    }
    window.location.replace('/login')
    return 
}

const getCurrentUserRole = () => {

    var token = document.cookie.split('=')[1]
    if(token){
        return jwtDecode(token).Role
    }
    window.location.replace('/login')
    return 
}

const getCurrentRole = () => {

    var token = document.cookie.split('=')[1]
    if(token){
        return jwtDecode(token).Role
    }
    return 
}


const isAuthorized = () => {

    var token = document.cookie.split('=')[1]
    if(token){
        return true
    }
    return false 
}

export default {
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