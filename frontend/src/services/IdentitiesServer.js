import serverbase from "./Serverbase";

const login = (loginRequest) => {
    return serverbase.post(`login`, loginRequest)
}

export default {
    login
}