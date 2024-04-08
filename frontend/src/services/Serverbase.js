import axios from "axios";

const header = () => {
    if (document.cookie.split('=')[1] !== null) {
        return {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + document.cookie.split('=')[1]
            }
        }
    }
    else
        return {
            "Content-type": "application/json"
        }
}

export default axios.create({
    baseURL: "http://localhost:5044/",
    ...header()
}
);