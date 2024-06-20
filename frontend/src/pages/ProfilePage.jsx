import { useEffect, useState } from "react";
import profilesServer from "../services/ProfilesServer"
import IdentitiesServer from "../services/IdentitiesServer";
import Container from 'react-bootstrap/Container';
import "./style/profilePage.css"
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
import { Button } from 'react-bootstrap';
import { useGlobalState, useGlobalStateUpdate } from "../GlobalState";

function ProfilePage() {
    const [profile, setProfile] = useState()
    const [identity, setIdentity] = useState()
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState()
    const [bio, setBio] = useState()
    const [vName, setVName] = useState();
    const [birthdate, setBirthdate] = useState();
    const [vBirthdate, setVBirthdate] = useState();
    const isServiceAvailable = useGlobalState();
    const setGlobalState = useGlobalStateUpdate();

    useEffect(() => {
        profilesServer.getCurrentProfile().then((res) => {
            setProfile(res.data.profile)
            setIdentity(res.data.identity)
            if (res.data.identity) {
                setBirthdate(res.data.identity.birthdate)
            }
            setName(res.data.profile.name)
            setBio(res.data.profile.bio)
        }).catch((error) => {
            if (error.response.status === 502) {
                setGlobalState({
                    identityService: isServiceAvailable.identityService,
                    profileService: false,
                    tweetService: isServiceAvailable.tweetService,
                    apiGatewayService: isServiceAvailable.apiGatewayService,
                })
            }
            console.log(error.stack)
        })
        setGlobalState({
            identityService: isServiceAvailable.identityService,
            profileService: true,
            tweetService: isServiceAvailable.tweetService,
            apiGatewayService: isServiceAvailable.apiGatewayService,
        })
    }, [])

    const updateProfile = async (e) => {
        try {
            e.preventDefault()

            const updateProfileRequest = {
                name: name,
                bio: bio,
                ProfileImage: "",
                birthdate: birthdate
            }

            if (!name) {
                setVName("Please enter a name.")
                return;
            } else
                setVName(undefined)

            if (identity && !birthdate) {
                setVBirthdate("Please fill birthdate.")
                return;
            }
            else
                setVBirthdate(undefined)

            await profilesServer.updateProfile(updateProfileRequest);
            profilesServer.getCurrentProfile().then((res) => {
                setProfile(res.data.profile)
                if (res.data.identity) {
                    setIdentity(res.data.identity)
                    setBirthdate(res.data.identity.birthdate)
                }
                setName(res.data.profile.name)
                setBio(res.data.profile.bio)
            }).catch((error) => {
                if (error.response.status === 502) {
                    setGlobalState({
                        identityService: false,
                        profileService: false,
                        tweetService: isServiceAvailable.tweetService,
                        apiGatewayService: isServiceAvailable.apiGatewayService,
                    })
                }
            })
            setEditMode(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    var userDetialsCard = undefined;
    if (identity) {

        userDetialsCard = <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
            <MDBCardBody>
                Personal details
                <MDBRow >

                    <MDBCol>
                        Birthdate: {identity.birthdate}
                    </MDBCol>
                </MDBRow>
            </MDBCardBody>
        </MDBCard>
    } else {
        userDetialsCard = "Sorry your details is not available at this moment"
    }
    if (isServiceAvailable.profileService === true) {
        if (!profile) {
            return <>loading...</>
        } else {
            const updateBirthdateElement = isServiceAvailable.identityService ?
                <>
                    {vBirthdate}
                    <MDBCol >
                        <MDBInput label='Your birthdate' id='form2' value={birthdate} onChange={e => setBirthdate(e.target.value)} type='date' />
                    </MDBCol>
                </> : undefined;

            if (editMode) {
                return <> <Container fluid>
                    <MDBCard className='text-black m-6' style={{ borderRadius: '25px' }}>
                        <MDBCardBody>
                            <MDBRow >
                                <MDBCol >
                                    {vName}
                                    <MDBInput label='Name' id='form3' onChange={e => setName(e.target.value)} value={name} type='text' />
                                </MDBCol>

                                <MDBCol >
                                    <MDBInput label='Bio' id='form3' onChange={e => setBio(e.target.value)} value={bio} type='text' />
                                </MDBCol>


                                {updateBirthdateElement}

                                <MDBCol className="d-flex justify-content-center">
                                    <Button onClick={e => updateProfile(e)} size='lg'>Save</Button>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>

                </Container>
                </>
            } else
                return <>
                    <Container fluid>

                        <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                            <MDBCardBody>
                                <MDBRow >
                                    <MDBCol>
                                        <img style={{ height: "10rem", width: "10rem" }} className='img-fluid rounded-circle' src="https://kwetter001.blob.core.windows.net/profile/userPic.jpg" />
                                    </MDBCol>
                                    <MDBCol>
                                        Name {profile.name}
                                    </MDBCol>

                                    <MDBCol>
                                        Bio: {profile.bio}
                                    </MDBCol>
                                    <MDBCol>
                                        <Button className='mb-4' onClick={e => setEditMode(true)} size='lg'>Edit</Button>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                        {userDetialsCard}
                    </Container>
                </>
        }
    }
    else if (isServiceAvailable.profileService === false) {
        return <>
            Sorry this feature is temporarily unavailable
        </>
    }
}

export default ProfilePage;