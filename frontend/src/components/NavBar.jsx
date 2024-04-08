import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { CookiesProvider, useCookies } from 'react-cookie'

import { useNavigate } from 'react-router-dom';

function NavBar() {

    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const navigate = useNavigate()
    function logOut(e) {
        e.preventDefault();
        removeCookie('token')
        navigate("/")
    }

    const links = [
        {
            id: 1,
            path: "/",
            text: "Home"
        }
    ]


    if (cookies.token != undefined) {

        return (
            <CookiesProvider>
                <Container>
                    <Navbar bg="light" variant="light">
                        <Container>
                            <Nav className="me-auto">
                                {links.map(link => {
                                    return (
                                        <Navbar.Brand key={link.id} href={link.path}>
                                            {link.text}
                                        </Navbar.Brand >
                                    )
                                })}
                                <Navbar.Brand href="/me">
                                    My profile
                                </Navbar.Brand >
                            </Nav>
                            <Navbar.Collapse className="justify-content-end">
                                <Navbar.Toggle />
                                <Button variant="primary" onClick={e => logOut(e)}>Logout</Button>{' '}
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </Container>
            </CookiesProvider>
        );
    }
    else {
        return (
            <CookiesProvider>
                <Container>
                    <Navbar bg="light" variant="light">
                        <Container>
                            <Nav className="me-auto">
                                {links.map(link => {
                                    return (
                                        <div >
                                            <Navbar.Brand key={link.id} href={link.path}>
                                                {link.text}
                                            </Navbar.Brand >
                                            <Navbar.Toggle />
                                        </div>
                                    )
                                })}
                            </Nav>

                            <Navbar.Collapse className="justify-content-end">
                                <div>
                                    <Nav.Link href="/login">
                                        <Button variant="primary">log in / Register</Button>
                                    </Nav.Link >
                                    <Navbar.Toggle />
                                </div>
                            </Navbar.Collapse>

                        </Container>
                    </Navbar>
                </Container>
            </CookiesProvider>
        );
    }
}


export default NavBar;