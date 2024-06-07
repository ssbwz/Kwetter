import React, { useState } from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn
} from 'mdb-react-ui-kit';
import IdentitiesServer from "../services/IdentitiesServer";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';


export default function Footer() {
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const navigate = useNavigate()

    const [deleteMyAccountPopModal, setDeleteMyAccountPopModal] = useState(false);
    const [comingSoonPopModal, setComingSoonPopModal] = useState(false);


    function deleteMyAccountShow() {
        setDeleteMyAccountPopModal(!deleteMyAccountPopModal)
    }

    async function deleteMyAccount() {
        await IdentitiesServer.deleteCurrentIdentity()
        navigate("/login")
    }

    function comingSoonShow() {
        setComingSoonPopModal(!comingSoonPopModal)
    }


    const comingSoonPopUp =
        <MDBModal open={comingSoonPopModal} onClose={() => setComingSoonPopModal(false)} tabIndex='-1'>
            <MDBModalDialog size="xl">
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle></MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={comingSoonShow}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <h1>Coming soon</h1>
                        <p>The feature that you clicked on is coming soon, thank you for showing interest.</p>

                    </MDBModalBody>
                    <MDBModalFooter>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>

    const deleteMyAccountPopUp = <MDBModal open={deleteMyAccountPopModal} onClose={() => setDeleteMyAccountPopModal(false)} tabIndex='-1'>
        <MDBModalDialog size="xl">
            <MDBModalContent>
                <MDBModalHeader>
                    <MDBModalTitle>How to delete my account?</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={deleteMyAccountShow}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                    <h1>Account deletion</h1>
                    <p>We understand that sometimes you may want to take a break from Kwetter. However, before you proceed, we want to clearly explain what happens when you delete your account.</p>

                    <p style={{ fontWeight: "bold" }}>Account deletion is permanent.</p>

                    <p>Once you confirm your deletion, the following will occur:</p>

                    <ul>
                        <li>All your Kwetter data, including your profile information, tweets, messages, and followers list, will be permanently removed.</li>
                        <li>Your Kwetter username will no longer be available.</li>
                    </ul>

                    <p> <span style={{ fontWeight: "bold" }}>Please note</span> This action cannot be undone. After confirming deletion, you won't be able to recover your account or any of its data.</p>

                    <p>However, you can still create a new account with the same email address in the future if you choose to rejoin Kwetter.</p>

                    <p>If you're sure you want to proceed with account deletion, please click the "Delete Account" button below. Otherwise, you can click "Cancel" to return to your account settings.</p>


                </MDBModalBody>

                <MDBModalFooter>
                    <MDBBtn color='secondary' onClick={deleteMyAccountShow}>
                        Cancel
                    </MDBBtn>
                    <MDBBtn onClick={deleteMyAccount}>Delete Account</MDBBtn>
                </MDBModalFooter>
            </MDBModalContent>
        </MDBModalDialog>
    </MDBModal>
    if (cookies.token) {
        return (
            <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
                <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>

                </section>

                <section className=''>
                    <MDBContainer className='text-center text-md-start mt-5'>
                        <MDBRow className='mt-3'>
                            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>
                                    <MDBIcon icon="gem" className="me-3" />
                                    Kwetter
                                </h6>
                                <p>
                                    Kwetter is a social media platform where you can post short messages called Kwets. It lets you share updates, thoughts, and ideas with your followers, and see what others are kwetting about.
                                </p>
                            </MDBCol>

                            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
                                <p>
                                    <a style={{ cursor: "pointer" }} onClick={comingSoonShow} className='text-reset'>
                                        Advertisement management
                                    </a>
                                </p>
                                <p>
                                    <a style={{ cursor: "pointer" }} onClick={comingSoonShow} className='text-reset'>
                                        Influence products
                                    </a>
                                </p>
                                {comingSoonPopUp}
                            </MDBCol>

                            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Profile management</h6>
                                <p>
                                    <a style={{ cursor: "pointer" }} onClick={deleteMyAccountShow} className='text-reset'>
                                        How to delete my account?
                                    </a>
                                    {deleteMyAccountPopUp}
                                </p>

                            </MDBCol>

                            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>

                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>

                <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                    © 2024 Copyright:
                    <a className='text-reset fw-bold' >
                        Kwetter.com
                    </a>
                </div>
            </MDBFooter>
        );
    }
    else {
        return <>
            <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
                <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>

                </section>

                <section className=''>
                    <MDBContainer className='text-center text-md-start mt-5'>
                        <MDBRow className='mt-3'>
                            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>
                                    <MDBIcon icon="gem" className="me-3" />
                                    Kwetter
                                </h6>
                                <p>
                                    Kwetter is a social media platform where you can post short messages called Kwets. It lets you share updates, thoughts, and ideas with your followers, and see what others are kwetting about.
                                </p>
                            </MDBCol>

                            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
                                <p>
                                    <a style={{ cursor: "pointer" }} onClick={comingSoonShow} className='text-reset'>
                                        Advertisement management
                                    </a>
                                </p>
                                <p>
                                    <a style={{ cursor: "pointer" }} onClick={comingSoonShow} className='text-reset'>
                                        Influence products
                                    </a>
                                </p>
                                {comingSoonPopUp}

                            </MDBCol>


                            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>

                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>

                <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                    © 2024 Copyright:
                    <a className='text-reset fw-bold' >
                        Kwetter.com
                    </a>
                </div>
            </MDBFooter>
        </>
    }
}