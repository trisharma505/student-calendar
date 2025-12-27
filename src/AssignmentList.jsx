import React from "react";
import PropTypes from "prop-types";

// Creates box below "New Assignment" that created assignments are stored until dragged onto calendar
const AssignmentList = ({ assignments }) => {
    return (
        <div id="external-events" style={listStyles}>
            <h3 style={headingStyles}>Drag</h3>
            {assignments.map((assignment, index) => (
                <div
                    key={index}
                    className="fc-event"
                    title={assignment}
                    style={assignmentStyles}
                >
                    {assignment}
                </div>
            ))}
        </div>
    );
};

AssignmentList.propTypes = {
    assignments: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const headingStyles = {
    margin: "1px 0",
};

const listStyles = {
    marginTop: "20px",
    backgroundColor: "lightgray",
    padding: "10px",
    borderRadius: "5px",
    minHeight: "80px",
};

const assignmentStyles = {
    padding: "5px",
    margin: "5px 0",
    backgroundColor: "gray",
    cursor: "grab",
    borderRadius: "4px",
};

export default AssignmentList;