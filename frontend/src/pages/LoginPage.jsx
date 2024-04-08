import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import identityService from '../services/IdentitiesServer';
import Container from 'react-bootstrap/Container';
import {
    MDBContainer,
    MDBInput,
}
    from 'mdb-react-ui-kit';

import { CookiesProvider, useCookies } from 'react-cookie'
import { Navigate, useNavigate } from 'react-router-dom';


function LoginPage() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [vEmail, setVEmail] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [cookies, setCookie] = useCookies(['token'])
    const navigate = useNavigate();

    const login = () => {
        try {

            const credentials = {
                "email": email,
                "password": password
            }

            if (!validateEmail(email)) {
                setVEmail("Please enter valid email")
                return;
            }

            identityService.login(credentials).then((res) => {
                setCookie('token', res.data.token, { path: '/', secure: true, maxAge: 60 * 2 });
                return navigate("/")
            }).catch(function (error) {
                if (error.response) {

                    if (error.response.status === 401) {
                        setErrorMessage("Please check your credentials");
                        return
                    }

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

    return (
        <>
            <CookiesProvider>
                <Container>
                    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
                        <Form.Label>{vEmail}</Form.Label>
                        <MDBInput id="formBasicEmail" wrapperClass='mb-4' label='Email address' onChange={e => setEmail(e.target.value)} type='email' />
                        <Form.Label>{errorMessage}</Form.Label>
                        <MDBInput id="formBasicPassword" wrapperClass='mb-4' label='Password' onChange={e => setPassword(e.target.value)} type='password' />
                        <Button id="loginButton" className="mb-4" onClick={login} >Sign in</Button>
                        <div className="text-center">
                            <a style={{cursor:"pointer"}} onClick={e=>{navigate("/Register")}}> Create a user</a>
                        </div>
                    </MDBContainer>
                </Container>
            </CookiesProvider>
        </>
    )

}

export default LoginPage;