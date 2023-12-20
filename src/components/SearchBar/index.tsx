import React from 'react';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import './style.css';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';

// Define the Props type for the component
type Props = {
    getData: any
}

// SearchBar component function
const SearchBar = ({ getData }: Props) => {
    // Get the access token from the Redux state
    const { accessTokenBearer } = useSelector((state: any) => state.token)

    // State hook for handling the text input
    const [textInput, setTextInput] = useState("");

    // Function to handle text input change
    const handleChange = (e: any) => {
        setTextInput(e.target.value);
    }

    // Function to handle the search operation
    const handleSearch = () => {
        const query: string = textInput;
        const BASE_URL: string = "https://api.spotify.com/v1/search?q=";

        // Asynchronous function to perform Spotify search
        const getSpotifySearch = async () => {
            try {
                // Make a GET request to Spotify API for track search
                const response: AxiosResponse<any> = await axios.get(`${BASE_URL}${query}&type=track&limit=30`, {
                    headers: {
                        'Authorization': accessTokenBearer
                    }
                })
                // Log the response data and pass it to the parent component through getData prop
                console.log(response.data);
                getData(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        // Call the Spotify search function
        getSpotifySearch();
    }

    // Render the search bar with Material-UI components
    return (
        <div>
            <TextField className="textField" label="Type in your track" type="text" value={textInput} onChange={handleChange}></TextField>
            <Button variant="contained" color="primary" onClick={handleSearch} id='search'>Search</Button>
        </div>
    );
}

// Prop type validation for SearchBar component
SearchBar.propTypes = {
    getData: PropTypes.any
}

// Export the SearchBar component for use in other files
export default SearchBar;
