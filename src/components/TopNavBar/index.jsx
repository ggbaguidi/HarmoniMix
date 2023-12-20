import React from 'react';
import PropTypes from 'prop-types';
import './style.css'
import { Link } from 'react-router-dom';

// TopNavBar component function
const TopNavBar = (props) => {
    // Conditional rendering based on the 'title' prop
    if (props.title === "home") {
        return (
            <div className="containerTopNavBar">
                <h2 className="selected">Create Playlists</h2>
                {/* Link to the recommendations page */}
                <Link to='/recommendations'>
                    <h2 className="unselected">Recommendations</h2>
                </Link>
            </div>
        )
    }
    // Render when 'title' is not "home"
    return (
        <div className="containerTopNavBar">
            {/* Link to the create-playlist page */}
            <Link to='create-playlist'>
                <h2 className="unselected">Create Playlists</h2>
            </Link>
            <h2 className="selected">Recommendations</h2>
        </div>
    )
}

// Prop type validation for TopNavBar component
TopNavBar.propTypes = {
    title: PropTypes.string
}

// Export the TopNavBar component for use in other files
export default TopNavBar;
