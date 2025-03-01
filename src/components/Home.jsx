import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png'; //  Import the logo image
import '../css/HomeUser.css'; //  Import the associated CSS file for styling

function Home() {
    const navigate = useNavigate(); //  Hook to navigate between routes

    return (
        <div className="home-container">
            {/* Logo Section - Displays the User Management System Logo */}
            <div className="logo-container">
                <img src={logo} alt="User Management System Logo" className="home-logo" />
            </div>

            {/* Main Heading */}
            <h1>User Management System</h1>

            {/*Button Section */}
            <div className="button-container">
                {/*  Button to Navigate to Add User Page */}
                <Button variant="primary" onClick={() => navigate('/AddUser')}>
                    Add User
                </Button>

                {/* Button to Navigate to List User Page */}
                <Button variant="success" onClick={() => navigate('/ListUser')}>
                    List Users
                </Button>
            </div>
        </div>
    );
}

export default Home; //  Exporting the Home component for use in other parts of the app
