import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

// Define the Props type for the component
type Props = {
    title: string
}

// SectionTitle component function
const SectionTitle = ({ title }: Props) => {
    // Render an h1 element with the specified title and a CSS class
    return (
        <h1 className="songsTitle">{title}</h1>
    );
}

// Prop type validation for SectionTitle component
SectionTitle.propTypes = {
    title: PropTypes.string
}

// Export the SectionTitle component for use in other files
export default SectionTitle;
