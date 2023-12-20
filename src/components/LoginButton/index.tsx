// Importing the Button component from Material-UI
import { Button } from '@material-ui/core';
import React from 'react';
import './style.css';

// Define constants for the website URL and Spotify authorization URL
const MY_WEBSITE: string = "https://harmonimix.vercel.app/callback";
const REDIRECT_URL: string = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=${MY_WEBSITE}&scope=playlist-modify-private`

// LoginButton component function
const LoginButton = () => {
    // Return a link wrapped around a Material-UI Button
    return (
        <a href={REDIRECT_URL}>
            {/* Material-UI Button with specified style and color */}
            <Button variant="contained" color="primary" className="myButton">
                Login
            </Button>
        </a>
    );
}

// Export the LoginButton component for use in other files
export default LoginButton;
