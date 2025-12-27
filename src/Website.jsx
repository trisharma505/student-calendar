import React, { useState } from "react";
import Calendar from "./Calendar.jsx";
import AssignmentInput from "./AssignmentInput.jsx";
import AssignmentList from "./AssignmentList.jsx";
import Deletion from './Deletion.jsx';
import AddCourse from './AddCourse.jsx';

function Website() {

    const [assignments, setAssignments] = useState([]);
    const [newAssignment, setNewAssignment] = useState("");
    const [courses, setCourses] = useState([]);
    const [currentWeekStart, setCurrentWeekStart] = useState(new Date());

    const handleAddAssignment = () => {
        if (newAssignment.trim() !== "") {
            setAssignments((prevAssignments) => [...prevAssignments, newAssignment]);
            setNewAssignment("");
        }
    };

    const handleDeleteAssignment = (assignmentTitle) => {
        setAssignments((prevAssignments) => prevAssignments.filter((assignment) => assignment !== assignmentTitle));
    };

    return (
        <div>

            <header style={styles.header}>
                <h1>TimeTrack</h1>
            </header>

            <main style={styles.main}>
                <div style={styles.container}>

                    <div style={styles.assignmentsContainer}>
                        <h2>Assignments</h2>
                        <AssignmentInput
                            newAssignment={newAssignment}
                            setNewAssignment={setNewAssignment}
                            handleAddAssignment={handleAddAssignment}
                        />
                        <AssignmentList assignments={assignments} />
                        <Deletion onDrop={handleDeleteAssignment} />
                        <h2>Courses</h2>
                        <AddCourse
                            setCourses={setCourses}
                            currentWeekStart={currentWeekStart}
                        />
                    </div>

                    <div style={styles.calendarContainer}>
                        <h2>Calendar</h2>
                        <Calendar 
                            assignments={assignments}
                            setAssignments={setAssignments}
                            handleDeleteFromCalendar={handleDeleteAssignment}
                            courses={courses}
                            setCurrentWeekStart={setCurrentWeekStart}
                        />
                        <br/>
                    </div>

                </div>
            </main>
        </div>
    );
}

const styles = {
    header: { padding: "0 40px" },
    main: { display: "flex", justifyContent: "center", padding: "0 40px", boxSizing: "border-box" },
    container: { width: "100%", position: "relative", display: "flex" },
    assignmentsContainer: { width: "20%", paddingRight: "20px", paddingTop: "110px" },
    calendarContainer: { width: "80%" }
};

export default Website;