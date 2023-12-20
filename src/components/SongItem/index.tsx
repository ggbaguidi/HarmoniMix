import React from 'react';
import { useState } from 'react';
import './style.css';
import PropTypes from 'prop-types';

// Define the Props type for the component
type Props = {
    type: string,
    status: boolean,
    pushToSelectedList: any,
    deleteFromSelectedList: any,
    id: string,
    imgUrl: string,
    songTitle: string,
    artistLink: string,
    artist: string
}

// SongItem component function
const SongItem = ({
    type, status, pushToSelectedList, deleteFromSelectedList, id, imgUrl, songTitle, artistLink, artist
}: Props) => {
    // State hook to manage the status of the item
    const [statusState, setStatusState] = useState(status)

    // Function to handle button click and update the status
    const showAlert = () => {
        setStatusState(!statusState)
        // Call the appropriate function based on the status
        if (!statusState) {
            pushToSelectedList(id);
        } else {
            deleteFromSelectedList(id);
        }
    }

    // Conditional rendering for the button based on the status
    let button: any;
    if (statusState === false) {
        button = <button className="selectButton" onClick={showAlert}>Select</button>
    } else {
        button = <button className="deselectButton" onClick={showAlert}>Deselect</button>
    }

    // Render the SongItem component based on the type
    if (type === "recommendation") {
        return (
            <div className="itemContainer">
                <img src={imgUrl} alt={`${songTitle}`} />
                <p className="songTitle">{songTitle}</p>
                <a className="artist" href={artistLink}>{artist}</a>
            </div>
        )
    }

    // Render the SongItem component with the button
    return (
        <div className="itemContainer">
            <img src={imgUrl} alt={`${songTitle}`} />
            <p className="songTitle">{songTitle}</p>
            <a className="artist" href={artistLink}>{artist}</a>
            <br></br>
            {button}
        </div>
    );
}

// Prop type validation for SongItem component
SongItem.propTypes = {
    type: PropTypes.string,
    status: PropTypes.bool,
    pushToSelectedList: PropTypes.any,
    id: PropTypes.string,
    deleteFromSelectedList: PropTypes.any,
    imgUrl: PropTypes.string,
    songTitle: PropTypes.string,
    artistLink: PropTypes.string,
    artist: PropTypes.string,
}

// Export the SongItem component for use in other files
export default SongItem;
