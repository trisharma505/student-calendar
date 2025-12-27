import React from "react";
import PropTypes from "prop-types";

// Input box to add a new assignment
const AssignmentInput = ({ newAssignment, setNewAssignment, handleAddAssignment }) => {
    return (
        <>
            <input
                type="text"
                value={newAssignment}
                onChange={(e) => setNewAssignment(e.target.value)}
                placeholder="New Assignment"
                style={inputStyles}
            />
            <button onClick={handleAddAssignment} style={buttonStyles}>
                Add Assignment
            </button>
        </>
    );
};

AssignmentInput.propTypes = {
    newAssignment: PropTypes.string.isRequired,
    setNewAssignment: PropTypes.func.isRequired,
    handleAddAssignment: PropTypes.func.isRequired,
};

const inputStyles = {
    padding: "10px",
    width: "90%",
    marginBottom: "10px"
};

const buttonStyles = {
    padding: "10px",
    width: "100%",
    backgroundColor: "green",
    color: "white",
    border: "none",
    cursor: "pointer",
};

export default AssignmentInput;