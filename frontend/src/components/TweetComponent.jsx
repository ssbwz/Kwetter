import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCheckbox,
    MDBIcon,
    MDBBtn,
    MDBInput
}
    from 'mdb-react-ui-kit';
import { useState } from "react";
import tweetService from '../services/TweetServer';
import './style/tweetcomponent.css'


function TweetComponent() {

    const [tweetText, setTweetText] = useState('');
    const [vTweetText, setVTweetText] = useState("What's happening?");
    const [isEighteenPlus, setIsEighteenPlus] = useState(false);

    async function shareTweet(e) {
        e.preventDefault()
        if (!tweetText) {
            setVTweetText("Please fill the fields.")
            return
        }
        const shareTweetRequest = {
            textContent: tweetText,
            isEighteenPlus: isEighteenPlus
        }
        await tweetService.shareTweet(shareTweetRequest)

        setIsEighteenPlus(false)
        setTweetText('')
        setVTweetText("Tweet shared.")
        setTimeout(() => {
            setVTweetText("What's happening?")
        }, 1000);
    }
    //<MDBCheckbox name='flexCheck' onClick={e => setIsEighteenPlus(!isEighteenPlus)} checked={isEighteenPlus} id='flexCheckDefault' label='Is this 18+ content?' />
    
    return <>
        <MDBCard className='box'>
            <MDBCardBody>
                <MDBRow >
                    <MDBCol style={{display: "flex", padding: '0 10px 10px 0'}} >
                    <img
          src='https://kwetter001.blob.core.windows.net/profile/userPic.jpg'
          className='img-fluid rounded-circle'
          alt='User image'
          id='createTweetprofileImage'
        />

                        <MDBInput label={vTweetText} id="tweetform" onChange={e => setTweetText(e.target.value)} value={tweetText} rows="{2}" maxLength={140} />
                    </MDBCol>
                </MDBRow >
                <MDBRow >
                    <MDBCol size="md toolbar" >
                    <MDBIcon far icon="image" style={{marginLeft: "3rem"}}  className='icon'/>
                    <MDBIcon fas icon="poll"  className='icon'/>
                    <MDBIcon far icon="smile" className='icon'/>
                    <MDBIcon fas icon="ellipsis-h"  className='icon'/>

                    </MDBCol>
                    <MDBCol id="col-btn-tweet" size="auto" >
                        <MDBBtn id='btn-tweet' onClick={e => shareTweet(e)} size='lg'>Tweet</MDBBtn>
                    </MDBCol>
                </MDBRow>
            </MDBCardBody>
        </MDBCard>
    </>
}

export default TweetComponent;