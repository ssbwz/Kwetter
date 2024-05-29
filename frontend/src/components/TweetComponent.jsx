import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBTextArea
}
    from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import tweetService from '../services/TweetServer';


function TweetComponent() {

    const [tweetText, setTweetText] = useState('');
    const [vTweetText, setVTweetText] = useState('');

    async function shareTweet(e) {
        e.preventDefault()
        debugger
        if (!tweetText) {
            setVTweetText("Please fill the fields.")
            return
        }
        const shareTweetRequest = {
            textContent: tweetText,
        }
        await tweetService.shareTweet(shareTweetRequest)

        setVTweetText("Tweet shared.")
        setTimeout(() => {
            setVTweetText("")
        }, 1000);
    }
    return <>
        <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
            <MDBCardBody>
                <MDBRow >
                    <MDBCol >
                        {vTweetText}
                        <MDBTextArea label="Tweet" id="tweetform" onChange={e => setTweetText(e.target.value)} value={tweetText} rows="{4}" maxLength={140} />
                    </MDBCol>

                    <MDBCol className="">
                        <Button onClick={e => shareTweet(e)} size='lg'>Share</Button>
                    </MDBCol>
                </MDBRow>
            </MDBCardBody>
        </MDBCard>
    </>
}

export default TweetComponent;