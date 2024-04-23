import serverbase from "./Serverbase";

const shareTweet = (ShareTweetRequest) => {
    return serverbase.post(`tweets`, ShareTweetRequest)
}

export default {
    shareTweet
}