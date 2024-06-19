
import TweetComponent from "../components/TweetComponent";
import TweetSearchComponent from "../components/TweetSearchComponent";
import TweetsTrendsComponent from "../components/TweetsTrendsComponent";
import './style/homePage.css'
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBContainer,
    MDBInput,
    MDBIcon
}
    from 'mdb-react-ui-kit';
function HomePage() {

    /*        <h4 className="title">Home</h4>
        */
    return <>
        <MDBRow>
            <TweetsTrendsComponent />
            <TweetComponent />
            <TweetSearchComponent />
        </MDBRow>
    </>

}

export default HomePage;