
import IdentitiesServer from "../services/IdentitiesServer";
import {
    MDBContainer
}
    from 'mdb-react-ui-kit';
import TweetComponent from "../components/TweetComponent";
import { useCookies } from "react-cookie";
import Footer from "../components/Footer";

function HomePage() {
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    
    if (cookies.token) {
        return <>
            <MDBContainer>
                <TweetComponent />

            </MDBContainer>
            <Footer/>
        </>
    } else {
        return <> login pls
                        <Footer/></>
    }

}

export default HomePage;