import { Button } from '@material-ui/core';
import React from 'react';
import './style.css';


const LoginButton = () => {
    const MY_WEBSITE: string = "https://harmonimix.netlify.app/callback";
    const REDIRECT_URL: string = `https://accounts.spotify.com/authorize?client_id=ac81ea031e2e46cabf29f5b89f5ca371&response_type=token&redirect_uri=${MY_WEBSITE}&scope=playlist-modify-private`

    return (
        <a href={REDIRECT_URL}>
            <Button variant="contained" color="primary" className="myButton">Login</Button>
        </a>
    )
    
}

export default LoginButton;