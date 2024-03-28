import serverbase from "./Serverbase";

const getUserById = (id) => {
    return serverbase.get(`profiles/${id}`)
}

export default {
    getUserById
}