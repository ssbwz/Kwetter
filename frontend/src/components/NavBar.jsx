import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBIcon,
    MDBCol
} from 'mdb-react-ui-kit';

import { CookiesProvider, useCookies } from 'react-cookie'

import { useNavigate } from 'react-router-dom';
import IdentitiesServer from '../services/IdentitiesServer';
import "./style/navbar.css"

function NavBar() {

    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const navigate = useNavigate()
    function logOut(e) {
        e.preventDefault();
        removeCookie('token')
        navigate("/")
    }


    var links = [
        {
            id: 1,
            icon: "home",
            path: "/",
            text: "Home"
        }
    ]

    if (["Admin", "Moderator"].includes(IdentitiesServer.getCurrentRole())) {
        links = [
            {
                id: 1,
                icon: "home",
                path: "/",
                text: "Home"
            },
            {
                id: 2,
                icon: "users",
                path: "/usersmanagement",
                text: "Users management"
            }
        ]
    }


    if (["User"].includes(IdentitiesServer.getCurrentRole())) {
        links = [
            {
                id: 1,
                icon: "home",
                path: "/",
                text: "Home"
            },
            {
                id: 2,
                icon: "user",
                path: "/me",
                text: "Profile"
            }
        ]
    }


    if (cookies.token) {
        return (
            <MDBCol className='col-navbar' size='md'>

            <CookiesProvider>
                 <MDBNavbar className='link-navbar'>
                                <MDBContainer className="link-container-twitter" fluid>
                                    <MDBNavbarBrand className='link-brand-twitter' href="/"> <MDBIcon size='2x' fab icon="twitter" className='link-icon-twitter' /> </MDBNavbarBrand>
                                    <br />
                                </MDBContainer>
                            </MDBNavbar>
                {links.map(link => {
                    return (
                        <>
                            <MDBNavbar className='link-navbar'>
                                <MDBContainer className="link-container" fluid>
                                    <MDBNavbarBrand key={link.id} href={link.path}> <MDBIcon fas icon={link.icon} className='link-icon' /> {link.text}</MDBNavbarBrand>
                                    <br />
                                </MDBContainer>
                            </MDBNavbar>
                        </>
                    )
                })}
            </CookiesProvider>
                        </MDBCol>
        );
    }
    else {
        return (
            <></>
        );
    }
}


export default NavBar;