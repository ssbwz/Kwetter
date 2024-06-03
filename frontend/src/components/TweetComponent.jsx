import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCheckbox ,
    MDBTextArea
}
    from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import tweetService from '../services/TweetServer';


function TweetComponent() {

    const [tweetText, setTweetText] = useState('');
    const [vTweetText, setVTweetText] = useState('');
    const [isEighteenPlus, setIsEighteenPlus] = useState(false);

    async function shareTweet(e) {
        e.preventDefault()
        debugger
        if (!tweetText) {
            setVTweetText("Please fill the fields.")
            return
        }
        debugger;
        const shareTweetRequest = {
            textContent: tweetText,
            isEighteenPlus: isEighteenPlus
        }
        await tweetService.shareTweet(shareTweetRequest)

        setIsEighteenPlus(false)
        setTweetText('')
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
                        <MDBCheckbox name='flexCheck'  onClick={e => setIsEighteenPlus(!isEighteenPlus)} checked={isEighteenPlus} id='flexCheckDefault' label='Is this 18+ content?'  />
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