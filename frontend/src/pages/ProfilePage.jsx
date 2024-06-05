import { useEffect, useState } from "react";
import profilesServer from "../services/ProfilesServer"
import IdentitiesServer from "../services/IdentitiesServer";
import Container from 'react-bootstrap/Container';

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

function ProfilePage() {
    const [profile, setProfile] = useState()
    const [identity, setIdentity] = useState()
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState()
    const [bio, setBio] = useState()
    const [vName, setVName] = useState();
    const [birthdate, setBirthdate] = useState();
    const [vBirthdate, setVBirthdate] = useState();

    useEffect(() => {
        profilesServer.getCurrentProfile().then((res) => {
            setProfile(res.data.profile)
            setIdentity(res.data.identity)
            setBirthdate(res.data.identity.birthdate)
            setName(res.data.profile.name)
            setBio(res.data.profile.bio)
        }).catch((err) => {
            console.log(err.stack)
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
            if (!birthdate) {
                setVBirthdate("Please fill birthdate.")
                return;
            }
            else
                setVBirthdate(undefined)

            await profilesServer.updateProfile(updateProfileRequest);
            profilesServer.getCurrentProfile().then((res) => {
                setProfile(res.data.profile)
                setIdentity(res.data.identity)
                setBirthdate(res.data.identity.birthdate)
                setName(res.data.profile.name)
                setBio(res.data.profile.bio)
            }).catch((err) => {
                console.log(err.stack)
            })
            setEditMode(false);
        }
        catch (error) {
            console.log(error);
        }
    }


    if (!profile) {
        return <>loading...</>
    } else {

        if (editMode) {
            return <> <Container fluid>

                <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                    <MDBCardBody>
                        <MDBRow >
                            <MDBCol >
                                {vName}
                                <MDBInput label='Name' id='form3' onChange={e => setName(e.target.value)} value={name} type='text' />
                            </MDBCol>

                            <MDBCol >
                                <MDBInput label='Bio' id='form3' onChange={e => setBio(e.target.value)} value={bio} type='text' />
                            </MDBCol>


                            {vBirthdate}
                            <MDBCol >
                                <MDBInput label='Your birthdate' id='form2'  value={birthdate} onChange={e => setBirthdate(e.target.value)} type='date' />
                            </MDBCol>

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
                                    <img style={{ height: "10rem", width: "10rem" }} src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" />
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


                    <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                        <MDBCardBody>
                            Personal details
                            <MDBRow >

                                <MDBCol>
                                    Birthdate: {identity.birthdate}
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>

                </Container>
            </>
    }
}

export default ProfilePage;