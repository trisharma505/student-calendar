import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { generateUniqueId } from './Calendar.jsx';

function TaskEditForm({ task, onSave, onCancel, onDelete }) {
    // State for task properties
    const [taskName, setTaskName] = useState("");
    const [className, setClassName] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [color, setColor] = useState("#0000ff");

    // Effect to update state when task prop changes (for editing an existing task)
    useEffect(() => {
        if (task) {
            setTaskName(task.taskName);
            setClassName(task.className);
            setDueDate(task.dueDate);
            setStartTime(task.startTime);
            setEndTime(task.endTime);
            setColor(task.color || "#0000ff");
        }
    }, [task]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedTask = {
            id: task ? task.id : generateUniqueId(), // Generate ID for new task
            taskName,
            className,
            dueDate,
            startTime,
            endTime,
            color,
        };
        onSave(updatedTask); // Pass the updated task back to the parent component
    };


}

TaskEditForm.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.string, // Optional since it might not exist for new tasks
        taskName: PropTypes.string.isRequired,
        className: PropTypes.string.isRequired,
        dueDate: PropTypes.string.isRequired,
        startTime: PropTypes.string.isRequired,
        endTime: PropTypes.string.isRequired,
        color: PropTypes.string,
    }),
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default TaskEditForm;
