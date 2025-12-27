import React from 'react';
import PropTypes from 'prop-types';

// Deletes elements from calendar
const Deletion = ({ onDrop }) => {
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const assignmentTitle = e.dataTransfer.getData('text');
        onDrop(assignmentTitle);
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={deletionStyles}
            className="delete-box"
        >
            <h3 style={headingStyles}>Delete</h3>
        </div>
    );
};

Deletion.propTypes = {
    onDrop: PropTypes.func.isRequired,
};

const headingStyles = {
    margin: "1px 0",
};

const deletionStyles = {
    marginTop: "20px",
    backgroundColor: "lightcoral",
    padding: "10px",
    borderRadius: "5px",
    minHeight: "80px",
};

export default Deletion;
