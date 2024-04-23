
import IdentitiesServer from "../services/IdentitiesServer";
import {
    MDBContainer
}
    from 'mdb-react-ui-kit';
import TweetComponent from "../components/TweetComponent";
import { useCookies } from "react-cookie";

function HomePage() {
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    
    if (cookies.token) {
        console.log(IdentitiesServer.isAuthorized())
        return <>
            <MDBContainer>
                <TweetComponent />
            </MDBContainer>
        </>
    } else {
        return <> login pls</>
    }

}

export default HomePage;