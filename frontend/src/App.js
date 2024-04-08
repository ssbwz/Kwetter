import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route , Navigate} from "react-router-dom";
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import LoginPage from "./pages/LoginPage";
import { useCookies } from "react-cookie";
import { useState } from "react";

import NavBar from "./components/NavBar";
import RegisterPage from './pages/RegisterPage';


function App() {


  return (
    <BrowserRouter>
     <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/me" element={<PrivateRoute Component={ProfilePage} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const PrivateRoute = ({ Component }) => {
  const [cookies, setCookie] = useCookies(['user'])
  const [isAuthenticated, setIsAuthenticated] = useState(cookies.token);
    return isAuthenticated ? <Component /> : <Navigate to="/login" />;
  };