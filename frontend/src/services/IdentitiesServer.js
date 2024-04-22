import serverbase from "./Serverbase";
import { jwtDecode } from 'jwt-decode';


const login = (loginRequest) => {
    return serverbase.post(`login`, loginRequest)
}

const register = (registerRequest) => {
    return serverbase.post(`register`, registerRequest)
}

const getAllIdentities = (getAllIdentitiesRequest) => {
    return serverbase.get("identites/"+ getAllIdentitiesRequest.pageNumber)
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

export default {
    login,
    register,
    getCurrentUserEmail,
    getAllIdentities,
    getCurrentUserRole,
    deleteIdentity
}