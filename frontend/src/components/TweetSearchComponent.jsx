
import {
    MDBCol
} from 'mdb-react-ui-kit';
import { useCookies } from 'react-cookie';

export default function TweetSearchComponent() {
    const [cookies, setCookie] = useCookies(['token'])

    if (cookies.token) {
        return <>
            <MDBCol className='col-hashtages' size='md'>

            </MDBCol>
        </>
    } else {
        return <>
        </>
    }
}