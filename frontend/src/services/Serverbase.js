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

export const isApiGatewayHealthy = async () => {
    try {
        var res = await base.get("/health")
        return res.status === 200
    }
    catch (error) {
        return false
    }
}

export const base = axios.create({
    baseURL: "http://localhost:8080/",
    ...header()
}
);

