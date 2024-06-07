import React, { useState } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
    MDBCheckbox,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn
}
    from 'mdb-react-ui-kit';
import IdentitiesServer from "../services/IdentitiesServer"
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [vEmail, setVEmail] = useState();
    const [vPassword, setVPassword] = useState();
    const [birthdate, setBirthdate] = useState();
    const [vBirthdate, setVBirthdate] = useState();
    const [vIsAgreed, setVIsAgreed] = useState();
    const [isagreed, setIsAgreed] = useState(false);
    const navigate = useNavigate();

    const [termsPopModal, setTermsPopModal] = useState(false);

    const toggleShow = () => {
        console.log(termsPopModal)
        setTermsPopModal(!termsPopModal)
    };

    const register = async () => {
        try {
            if (!validateEmail(email)) {
                setVEmail("Please enter valid email.")
                return;
            } else
                setVEmail(undefined)
            if (!validatePassword(password)) {
                setVPassword("Password should contain numbers and letters and at least 6 characters.")
                return;
            }
            else
                setVPassword(undefined)
            if (!birthdate) {
                setVBirthdate("Please fill birthdate.")
                return;
            }
            else
                setVBirthdate(undefined)

            if (!isagreed) {
                setVIsAgreed("You have to agree on the terms and conditions.")
                return;
            }
            else
                setVIsAgreed(undefined)

            const reigsterUser = {
                "password": password,
                "email": email,
                "birthdate": birthdate
            }

            var response = await IdentitiesServer.register(reigsterUser)
                .catch(function (error) {
                    if (error.response) {
                        if (error.response.status === 400) {
                            setVEmail("This email is already been used");
                        }
                        else
                            setVEmail(undefined)
                    }
                })
                
            if (response.status === 201) {                
                navigate("/login")
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    function validateEmail(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    function validatePassword(password) {
        var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        return re.test(password);
    }

    const popterms =
        <>
            <MDBModal open={termsPopModal} onClose={() => setTermsPopModal(false)} tabIndex='-1'>
                <MDBModalDialog size="xl">
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Terms and conditions</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <h1>Welcome to Kwetter!</h1>
                            <p>These terms and conditions ("Terms") outline the rules and regulations for using our social media platform, Kwetter ("Platform"). By accessing or using the Platform, you agree to be bound by these Terms and our <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/">Privacy Policy</a>.</p>

                            <p>If you disagree with any part of these Terms, you may not access or use the Platform.</p>

                            <h2>1. Account Creation and Use</h2>

                            <p>To use the Platform fully, you must create an account by providing your email address, username, and date of birth.</p>

                            <p>You are responsible for maintaining the confidentiality of your account information, including your password. You are also responsible for all activity that occurs under your account.</p>

                            <p>You agree to use the Platform for lawful purposes only and in accordance with these Terms.</p>

                            <p>You agree not to use the Platform to:</p>

                            <ul>
                                <li>Upload, post, or share any content that is illegal, harmful, threatening, abusive, harassing, defamatory, obscene, hateful, or racially or ethnically offensive.</li>
                                <li>Violate the privacy of others.</li>
                                <li>Impersonate any person or entity.</li>
                                <li>Interfere with or disrupt the Platform or servers or networks connected to the Platform.</li>
                                <li>Use the Platform to transmit any advertising or promotional material (spam) without our prior written consent.</li>
                            </ul>

                            <h2>2. User Data</h2>

                            <p>Kwetter collects your email address, username, and date of birth to create your account and personalize your experience.</p>

                            <p>We may also collect other information about your use of the Platform, such as your IP address, browsing history, and preferences. This information is used to improve the Platform and personalize your experience.</p>

                            <p>You have the right to access, update, and delete your personal data at any time. You can do this by accessing your account settings.</p>

                            <p>We will retain your personal data for as long as your account is active or as needed to provide you with services. We will also retain your data as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.</p>

                            <h2>3. Content and Intellectual Property</h2>

                            <p>We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the revised Terms on the Platform. Your continued use of the Platform after the posting of any revised Terms constitutes your acceptance of the revised Terms.</p>


                        </MDBModalBody>

                        <MDBModalFooter>

                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>

    return (
        <Container>
            <MDBContainer fluid>

                <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol className='order-2 order-lg-1 d-flex flex-column'>

                                <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                {vEmail}
                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="envelope me-3" size='lg' />
                                    <MDBInput label='Your Email' id='form2' onChange={e => setEmail(e.target.value)} type='email' />
                                </div>

                                {vPassword}
                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="lock me-3" size='lg' />
                                    <MDBInput label='Password' id='form3' onChange={e => setPassword(e.target.value)} type='text' />
                                </div>


                                {vBirthdate}
                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="envelope me-3" size='lg' />
                                    <MDBInput label='Your birthdate' id='form4' onChange={e => setBirthdate(e.target.value)} type='date' />
                                </div>


                                <a style={{ textDecoration: "underline", color: 'blue', cursor: "pointer" }} onClick={toggleShow}>View terms and conditions</a>
                                {popterms}
                                {vIsAgreed}
                                <MDBCheckbox name='flexCheck' onClick={e => setIsAgreed(!isagreed)} checked={isagreed} id='termsAndConditions' label='I agree to the terms and conditions.' />
                                <Button id='registerbtn' className='mb-4' onClick={register} size='lg'>Register</Button>

                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>

            </MDBContainer>
        </Container>
    );
}

export default RegisterPage;


