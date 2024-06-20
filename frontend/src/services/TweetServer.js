import { base as serverbase } from "./Serverbase";

const shareTweet = (ShareTweetRequest) => {
    return serverbase.post(`tweets`, ShareTweetRequest)
}

const isServiceHealthy = async () => {
    try {
        var res = await serverbase.get("tweets/health")
        return res.status === 200
    }
    catch (error) {
        return false
    }
}

export default {
    shareTweet,
    isServiceHealthy
}