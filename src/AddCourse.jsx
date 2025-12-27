import React, { useState } from "react";
import PropTypes from "prop-types";
import { format, addDays } from 'date-fns';

// Adds courses to calendar
const AddCourse = ({ setCourses, currentWeekStart }) => {
    const [courseName, setCourseName] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedDays, setSelectedDays] = useState({
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
    });

    const handleDayChange = (day) => {
        setSelectedDays((prevDays) => ({
            ...prevDays,
            [day]: !prevDays[day],
        }));
    };

    const getDayDate = (day, weekOffset = 0) => {
        const daysMap = {
            mon: 1,
            tue: 2,
            wed: 3,
            thu: 4,
            fri: 5,
        };
        return format(addDays(currentWeekStart, daysMap[day] + (weekOffset * 7)), 'yyyy-MM-dd');
    };

    const handleAddCourse = () => {
        if (courseName && selectedTime && Object.values(selectedDays).some(Boolean)) {
            const courseDays = Object.keys(selectedDays).filter(day => selectedDays[day]);
            const weeksToAdd = 20;
            
            let courseEvents = [];
            for (let weekOffset = 0; weekOffset < weeksToAdd; weekOffset++) {
                courseDays.forEach(day => {
                    const dayDate = getDayDate(day, weekOffset);
                    courseEvents.push({
                        title: courseName,
                        start: `${dayDate}T${selectedTime}:00`,
                        end: `${dayDate}T${parseInt(selectedTime.split(':')[0]) + 1}:00`,
                    });
                });
            }
    
            setCourses(prevCourses => [...prevCourses, ...courseEvents]);
            setCourseName("");
            setSelectedTime("");
            setSelectedDays({ mon: false, tue: false, wed: false, thu: false, fri: false });
        }
    };

    return (
        <div>
            <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Course Name"
                style={inputStyles}
            />
            <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                style={{ 
                    padding: "10px",
                    width: "100%",
                    marginBottom: "10px"
                }}
            >
                <option value="">Select Time</option>
                {Array.from({ length: 13 }, (_, i) => i + 8).map(hour => (
                    <option key={hour} value={`${hour < 10 ? `0${hour}` : hour}:00`}>
                        {hour < 10 ? `0${hour}` : hour}:00
                </option>
                ))}
            </select>
            <div>
                <label>
                    <input type="checkbox" checked={selectedDays.mon} onChange={() => handleDayChange('mon')} /> Mon
                </label>
                <label>
                    <input type="checkbox" checked={selectedDays.tue} onChange={() => handleDayChange('tue')} /> Tue
                </label>
                <label>
                    <input type="checkbox" checked={selectedDays.wed} onChange={() => handleDayChange('wed')} /> Wed
                </label>
                <label>
                    <input type="checkbox" checked={selectedDays.thu} onChange={() => handleDayChange('thu')} /> Thu
                </label>
                <label>
                    <input type="checkbox" checked={selectedDays.fri} onChange={() => handleDayChange('fri')} /> Fri
                </label>
            </div>
            <br/>
            <button onClick={handleAddCourse} style={buttonStyles}>
                Add Course
            </button>
        </div>
    );
};

AddCourse.propTypes = {
    setCourses: PropTypes.func.isRequired,
};

const inputStyles = {
    padding: "10px",
    width: "90%",
    marginBottom: "10px",
};

const buttonStyles = {
    padding: "10px",
    width: "100%",
    backgroundColor: "blue",
    color: "white",
    border: "none",
    cursor: "pointer",
};

export default AddCourse;