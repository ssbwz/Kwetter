import React, { useState } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon
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
    const navigate = useNavigate();



    const register = () => {
        try {

            const reigsterUser = {
                "password": password,
                "email": email
            }


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

            IdentitiesServer.register(reigsterUser)
                .then(() => {
                    navigate("/login")
                }).catch(function (error) {
                    if (error.response) {
                        if (error.response.status === 400) {
                            setVEmail("This email is already been used");
                        }
                        else
                            setVEmail(undefined)
                    }
                })
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

                                <Button className='mb-4' onClick={register} size='lg'>Register</Button>

                            </MDBCol>

                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>

            </MDBContainer>
        </Container>
    );
}

export default RegisterPage;