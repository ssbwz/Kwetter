import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBIcon,
    MDBCol,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,
} from 'mdb-react-ui-kit';
import { CookiesProvider, useCookies } from 'react-cookie'

import { useNavigate } from 'react-router-dom';
import IdentitiesServer from '../services/IdentitiesServer';
import "./style/navbar.css"
import { useState } from 'react';

function NavBar() {

    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const navigate = useNavigate()
    function logOut() {
        removeCookie('token')
        window.location.replace("/login");
    }
    const [firstSection, setFirstSection] = useState(false);
    const [secondSection, setSecondSection] = useState(false);

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
            }
        ]
    }

    function navigatetor(e, path) {
        e.preventDefault();
        navigate(path)
    }
    function viewMyProfile(e) {
        e.preventDefault();
        if (["User"].includes(IdentitiesServer.getCurrentRole())) {
            navigate("/me")
        }
    }

    if (cookies.token) {
        return (
            <>
                <MDBNavbar expand='lg' >
                    <MDBContainer fluid>
                        <MDBNavbarToggler
                            aria-controls='navbarSupportedContent'
                            aria-expanded='false'
                            aria-label='Toggle navigation'
                            onClick={() => setFirstSection(!firstSection)}
                        >
                            <MDBIcon icon='bars' fas />
                        </MDBNavbarToggler>
                        <MDBCollapse navbar open={firstSection}>
                            <MDBNavbarNav id='startnavbar'>
                                {links.map(link => {
                                    return (
                                        <>
                                            <MDBNavbarItem>
                                                <MDBNavbarLink className='link-icon' onClick={e => navigatetor(e, link.path)} key={link.id} href='#'> <MDBIcon fas icon={link.icon} size='xl' className='link-icon' /> {link.text}
                                                </MDBNavbarLink>
                                            </MDBNavbarItem>
                                        </>
                                    )
                                })}
                            </MDBNavbarNav>
                        </MDBCollapse>
                        <MDBNavbarBrand id="midNavbar" onClick={e => navigatetor(e, "/")} href='#' > <MDBIcon size='2x' fab icon="twitter" className='icon-twitter' /> </MDBNavbarBrand>
                        <MDBNavbarNav id='endnavbar' className='justify-content-end'>
                            <MDBNavbarItem >
                                <div class="dropdown">
                                    <img
                                        data-mdb-button-init
                                        data-mdb-ripple-init data-mdb-dropdown-init class="btn btn-primary dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButton"
                                        data-mdb-toggle="dropdown"
                                        aria-expanded="false"
                                        src='https://kwetter001.blob.core.windows.net/profile/userPic.jpg'
                                        className='img-fluid rounded-circle'
                                        alt='User image'
                                        onClick={e => viewMyProfile(e)}
                                    />
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <li><a class="dropdown-item" href="#"><MDBIcon fas icon="cog" className='link-icon' />Settings</a></li>
                                        <li><a class="dropdown-item" onClick={logOut} link><MDBIcon fas icon="sign-out-alt" className='link-icon' /> log out</a></li>
                                    </ul>
                                </div>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBContainer>
                </MDBNavbar>
            </>

        );
    }
    else {
        return (
            <></>
        );
    }
}


export default NavBar;