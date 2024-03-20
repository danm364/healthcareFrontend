import logo from './logo.svg';
import Login from './components/Login';
import './App.css';
import './sass/main.css'
import React from "react";
import {
    createBrowserRouter,
    RouteProvider,
    Link
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function App() {

    const { logout } = useAuth0();
    const { loginWithRedirect } = useAuth0();


    return (
            <div className="App">
                <nav className="navbar">
                    <div className="navbar-logo">
                        <Link to="/">HealthCare+</Link> {/* Adjust the link and text as needed */}
                    </div>
                    <ul className="nav-links">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/Profile">Profile</Link>
                        </li>
                        <li>
                            <Link to="/about">About Us</Link>
                        </li>
                        <li>
                            <Link to="/services">Services</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                        <li>
                            <Link onClick={() => loginWithRedirect()}>Log In</Link>
                        </li>
                        <li>
                            <Link onClick={() => logout({ logoutParams: { returnTo: window.location.origin } } )}>logout</Link>
                        </li>
                    </ul>
                </nav>
            </div>
  );
}

export default App;
