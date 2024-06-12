import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import LoginPage from "./pages/LoginPage";
import { useCookies } from "react-cookie";
import { useState } from "react";

import NavBar from "./components/NavBar";
import RegisterPage from './pages/RegisterPage';
import UsersManagementPage from './pages/UsersManagementPage';
import AccessDeniedPage from './pages/AccessDeniedPage';
import IdentitiesServer from './services/IdentitiesServer';
import Footer from './components/Footer';
import {
  MDBContainer,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';

function App() {


  return (
    <>

      <BrowserRouter>
        <MDBContainer>
          <MDBRow>
            <MDBCol className='col-navbar' size='md'>
              <NavBar />
            </MDBCol>
            <MDBCol size='md'>
              <Routes>
                <Route path="/" element={<PrivateRoute Component={HomePage} Role={["User", "Admin", "Moderator"]} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/me" element={<PrivateRoute Component={ProfilePage} Role={["User"]} />} />
                <Route path="/usersmanagement" element={<PrivateRoute Component={UsersManagementPage} Role={["Admin", "Moderator"]} />} />
                <Route path="/accessdenied" element={<AccessDeniedPage />} />
              </Routes>
            </MDBCol>
            <MDBCol className='col-hashtages' size='md'>

            </MDBCol>
          </MDBRow>


          <Footer />
        </MDBContainer>
      </BrowserRouter>
    </>
  );
}

export default App;

const PrivateRoute = ({ Component, Role }) => {
  const [cookies, setCookie] = useCookies(['user'])
  const [isAuthenticated, setIsAuthenticated] = useState(cookies.token);
  if (isAuthenticated) {

    if (Role.includes(IdentitiesServer.getCurrentUserRole())) {
      return <Component />
    } else {
      return <Navigate to="/accessdenied" />
    }
  } else {
    return <Navigate to="/login" />
  }
};