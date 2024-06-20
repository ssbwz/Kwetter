import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from 'react';
import identityService from '../services/IdentitiesServer';
import Container from 'react-bootstrap/Container';
import {
    MDBContainer,
    MDBInput,
    MDBIcon
}
    from 'mdb-react-ui-kit';

import { CookiesProvider, useCookies } from 'react-cookie'
import { Navigate, useNavigate } from 'react-router-dom';
import './style/loginPage.css'
import { useGlobalState, useGlobalStateUpdate } from '../GlobalState';

function LoginPage() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [vEmail, setVEmail] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [cookies, setCookie] = useCookies(['token'])
    const [token, setToken] = useState(cookies.token)
    const navigate = useNavigate();
    const isServiceAvailable = useGlobalState();
    const setGlobalState = useGlobalStateUpdate();

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
                window.location.replace("/");
                return
            }).catch(function (error) {
                if (error.response) {
                    if (error.response.status === 400) {
                        setErrorMessage(error.response.data);
                        return
                    }
                    if (error.response.status === 401) {
                        setErrorMessage("Please check your credentials");
                        return
                    }

                    if (error.response.status === 502) {
                        setGlobalState({
                            identityService: false,
                            profileService: isServiceAvailable.profileService,
                            tweetService: isServiceAvailable.tweetService,
                            apiGatewayService: isServiceAvailable.apiGatewayService,
                        })
                    }
                    else
                        setGlobalState({
                            identityService: true,
                            profileService: isServiceAvailable.profileService,
                            tweetService: isServiceAvailable.tweetService,
                            apiGatewayService: isServiceAvailable.apiGatewayService,
                        })

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
    if (isServiceAvailable.identityService === true) {
        return (
            <>
                <CookiesProvider>
                    <Container>
                        <MDBContainer className="p-3 my-5 d-flex flex-column w-50 align-items-center justify-content-center">
                            <MDBIcon size='2x' fab icon="twitter" className='twitter-icon' />
                            <h4>Login to Kwetter</h4>
                            <Form.Label>{vEmail}</Form.Label>
                            <MDBInput id="formBasicEmail" wrapperClass='mb-4' label='Phone, email, or username' onChange={e => setEmail(e.target.value)} type='email' />
                            <Form.Label>{errorMessage}</Form.Label>
                            <MDBInput id="formBasicPassword" wrapperClass='mb-4' label='Password' onChange={e => setPassword(e.target.value)} type='password' />
                            <Button id="loginButton" className="mb-4" onClick={login} >Log in</Button>
                            <div className="text-center">
                                <a style={{ color: 'blue', cursor: "pointer" }} >Forgot password?</a> -
                                <a style={{ color: 'blue', cursor: "pointer" }} onClick={e => { navigate("/Register") }}> Sign up for kwetter</a>
                            </div>
                        </MDBContainer>
                    </Container>
                </CookiesProvider>
            </>
        )
    } else if (isServiceAvailable.identityService !== true) {
        navigate('/service-down')
        return
    }

}

export default LoginPage;