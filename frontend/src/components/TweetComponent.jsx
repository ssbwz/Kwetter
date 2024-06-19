import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCheckbox,
    MDBIcon,
    MDBBtn,
    MDBInput,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
}
    from 'mdb-react-ui-kit';
import { useState } from "react";
import tweetService from '../services/TweetServer';
import './style/tweetcomponent.css'

function TweetComponent() {

    const [tweetText, setTweetText] = useState('');
    const [vTweetText, setVTweetText] = useState("What's happening?");
    const [isEighteenPlus, setIsEighteenPlus] = useState(false);
    const [basicModal, setBasicModal] = useState(false);

    const toggleOpen = () => setBasicModal(!basicModal);
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
        }, 1500);
    }

    const options = <>
        <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Advanced settings</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <MDBCheckbox name='flexCheck' onClick={e => setIsEighteenPlus(!isEighteenPlus)} checked={isEighteenPlus} id='flexCheckDefault' label='Is this 18+ content?' />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={toggleOpen}>
                            Close
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    </>
    return <>
    <MDBCol size='xl' style={{padding: '0', margin: '10px 0 0 0'}} c>
        <MDBCard className='box'>
            <MDBCardBody>
                <MDBRow >
                    <MDBCol style={{ display: "flex", padding: '0 10px 10px 0' }} >
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
                        <MDBIcon far icon="image" style={{ marginLeft: "3rem" }} className='icon' />
                        <MDBIcon fas icon="poll" className='icon' />
                        <MDBIcon far icon="smile" className='icon' />
                        <MDBIcon style={{ cursor: "pointer" }} onClick={toggleOpen} fas icon="ellipsis-h" className='icon' />
                        {options}
                    </MDBCol>
                    <MDBCol id="col-btn-tweet" size="auto" >
                        <MDBBtn id='btn-tweet' onClick={e => shareTweet(e)} size='lg'>Tweet</MDBBtn>
                    </MDBCol>
                </MDBRow>
            </MDBCardBody>
        </MDBCard>
        <hr style={{ border: "none", backgroundColor: "#333", height: "0.5px", color: "#d8dadb", margin: "0" }}></hr>

        </MDBCol>
    </>
}

export default TweetComponent;