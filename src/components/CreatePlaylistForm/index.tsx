import React from 'react';
import { useState } from 'react';
import './style.css';
import axios, { AxiosResponse } from 'axios';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';

// Define the Props type for the component
type Props = {
    userId: string,
    selectedTracks: Array<string>
}

// CreatePlaylistForm component function
const CreatePlaylistForm = ({userId, selectedTracks}: Props) => {
    // Get the access token from the Redux state
    const {accessTokenBearer} = useSelector((state: any) => state.token)

    // State hooks for handling title and description input
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // Function to handle form submission
    const handleSubmit = async (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        // Validate title and description length
        if (title.length < 10 || description.length < 20) {
            alert("Title must be minimum 10 characters\nDescription must be minimum 20 characters!")
        } else {
            try {
                // Spotify API endpoint for creating a playlist
                const endpoint: string = `https://api.spotify.com/v1/users/${userId}/playlists`;
                // Make a POST request to create the playlist
                const response: AxiosResponse<any> = await axios.post(endpoint, {
                    name: title,
                    description: description,
                    collaborative: false,
                    public: false
                }, {
                    headers: {
                        'Authorization': accessTokenBearer,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                // Get the playlist ID from the response
                const id: string = response.data.id;
                // Add selected tracks to the created playlist
                await axios({
                    method: 'post',
                    url: `https://api.spotify.com/v1/playlists/${id}/tracks`,
                    data: {
                        uris: selectedTracks
                    },
                    headers: {
                        'Authorization': accessTokenBearer,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    alert(`Successfully created ${title} playlist!`)
                })
            } catch (error) {
                console.error(error);
            }
        }
    }

    // Function to handle title input change
    const handleTitle = (e: React.ChangeEvent<any>) => {
        setTitle(e.target.value);
    }

    // Function to handle description input change
    const handleDescription = (e: React.ChangeEvent<any>) => {
        setDescription(e.target.value);
    }

    // Render the form with Material-UI components
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField className="textField" variant="outlined" label="Title" onChange={handleTitle}/>
                <TextField className="textField" variant="outlined" label="Description" onChange={handleDescription}/>
                <Button type="submit" variant="contained" color="primary" id='submit'>Submit</Button>
            </form>
        </div>
    );
}

// Prop type validation for CreatePlaylistForm component
CreatePlaylistForm.propTypes = {
    userId: PropTypes.string,
    selectedTracks: PropTypes.array,
}

// Export the CreatePlaylistForm component for use in other files
export default CreatePlaylistForm;