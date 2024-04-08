import { useEffect, useState } from "react";
import profilesServer from "../services/ProfilesServer"
import IdentitiesServer from "../services/IdentitiesServer";

import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBContainer,
    MDBInput
}
    from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';

function ProfilePage() {
    const [profile, setProfile] = useState()
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState()
    const [bio, setBio] = useState()
    const [vName, setVName] = useState();

    useEffect(() => {
        profilesServer.getUserByEmail(IdentitiesServer.getCurrentUserEmail()).then((res) => {
            setProfile(res.data)
            setName(res.data.name)
            setBio(res.data.bio)
        }).catch((err) => {
            console.log(err.stack)
        })
    }, [])

    const updateProfile = async (e) => {
        try {
            e.preventDefault()

            const updateProfileRequest = {
                "name": name,
                "bio": bio,
                "ProfileImage": ""
            }

            if (!name) {
                setVName("Please enter a name.")
                return;
            } else
                setVName(undefined)

            await profilesServer.updateProfile(updateProfileRequest);
            var res = await profilesServer.getUserByEmail(IdentitiesServer.getCurrentUserEmail())
            setProfile(res.data)
            setName(res.data.name)
            setBio(res.data.bio)
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
            return <> <MDBContainer fluid>

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
                            <MDBCol className="d-flex justify-content-center">
                                <Button onClick={e => updateProfile(e)} size='lg'>Save</Button>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>

            </MDBContainer>
            </>
        } else
            return <>
                <MDBContainer fluid>

                    <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                        <MDBCardBody>
                            <MDBRow >
                                <MDBCol>
                                    <img style={{ height: "10rem", width: "10rem" }} src="https://lh3.googleusercontent.com/drive-viewer/AKGpihYWmu57y3iewiAawK9gDysc1bxo0_6X1Ij-aY9qTMBisUmVrzLgCwbuPnzbnvwVeQ25N2yDbdlx3-HRA4jmrh_PkL_cj4HWx6I=s2560" />
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

                </MDBContainer>
            </>
    }
}

export default ProfilePage;