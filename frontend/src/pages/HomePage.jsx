
import TweetComponent from "../components/TweetComponent";
import './style/homePage.css'
function HomePage() {

    return <>
        <h4 className="title">Home</h4>
        <hr style={{ border: "none", backgroundColor: "#333", height: "0.5px", color: "#d8dadb", margin: "0" }}></hr>
        <TweetComponent />
    </>

}

export default HomePage;