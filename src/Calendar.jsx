
import React, { useState } from "react";

import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import PropTypes from "prop-types";
import TaskEditForm from "./TaskEditForm";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import 'react-resizable/css/styles.css'; // Importing resizable styles
export const generateUniqueId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

function Calendar({ assignments, setAssignments, setClasses, classes, handleEditTask, handleCreateTask }) {
    const [currentTask, setCurrentTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleEventClick = (info) => {
        // const { id, extendedProps  } = info.event;
        // if (id.startsWith('class-')) {
        //     // It's a class event
        //     const classIndex = extendedProps.classIndex;
        //     const cls = classes[classIndex];
        //     handleEditTask(cls, classIndex); // Pass class object and index
        // } else {
        //     // It's a task event
        //     const assignment = assignments.find((a) => a.id === id);
        //     if (assignment) {
        //         setCurrentTask({ ...assignment });
        //         setIsEditing(true);
        //         handleEditTask(assignment, assignments.indexOf(assignment)); // Call the prop function to handle editing
        //     }
        // }
        const { id, extendedProps } = info.event;

        if (extendedProps && extendedProps.classIndex !== undefined) {
            // It's a class event
            const classIndex = extendedProps.classIndex;
            const cls = classes[classIndex];
            handleEditTask(cls, classIndex); // Pass the class object and index
        } else {
            // It's a task event
            const assignment = assignments.find((a) => a.id === id);
            if (assignment) {
                setCurrentTask({ ...assignment });
                setIsEditing(true);
                handleEditTask(assignment, assignments.indexOf(assignment)); // Call the prop function to handle editing
            }
        }
    };

    const handleEventDrop = (info) => {
        const { event } = info;
        if (event.id.startsWith('class-')) { 
            // It's a class event
            const classIndex = event.extendedProps.classIndex;
            const updatedClass = {
                ...classes[classIndex],
                startTime: event.start.toTimeString().split(' ')[0].substring(0,5),
                endTime: event.end ? event.end.toTimeString().split(' ')[0].substring(0,5) : classes[classIndex].endTime,
            };
            
            setClasses(prevClasses => {
                const updatedClasses = [...prevClasses];
                updatedClasses[classIndex] = updatedClass;
                return updatedClasses;

            });
        } else {
            // It's a task event
            const updatedTask = {
                ...assignments.find(a => a.id === event.id),
                dueDate: event.startStr.split('T')[0],
                startTime: event.startStr.split('T')[1].substring(0,5),
                endTime: event.endStr.split('T')[1].substring(0,5),
            };
            setAssignments(prevAssignments => 
                prevAssignments.map(task => task.id === updatedTask.id ? updatedTask : task)
            );
        }
    };
    

    const handleEventResize = (info) => {
      const { event } = info;
        if (event.id.startsWith('class-')) {
            // It's a class event
            const classIndex = event.extendedProps.classIndex;
            const updatedClass = {
                ...classes[classIndex],
                endTime: event.end.toTimeString().split(' ')[0].substring(0,5),
            };
            setClasses(prevClasses => {
                const updatedClasses = [...prevClasses];
                updatedClasses[classIndex] = updatedClass;
                return updatedClasses;
            });
        } else {
            // It's a task event
            const updatedTask = {
                ...assignments.find(a => a.id === event.id),
                dueDate: event.startStr.split('T')[0],
                startTime: event.startStr.split('T')[1].substring(0,5),
                endTime: event.endStr.split('T')[1].substring(0,5),
            };
            setAssignments(prevAssignments => 
                prevAssignments.map(task => task.id === updatedTask.id ? updatedTask : task)
            );
        }
    };


    

    const handleDateClick = (info) => {
        // Open the edit form with the new task data instead of creating it directly
        handleCreateTask(info.dateStr);
    
    };

    const getClassEventDates = (days, startTime, endTime) => {
        const today = new Date();
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const timePartsStart = startTime.split(':');
        const hourStart = parseInt(timePartsStart[0], 10);
        const minuteStart = parseInt(timePartsStart[1], 10);
        const timePartsEnd = endTime.split(':');
        const hourEnd = parseInt(timePartsEnd[0], 10);
        const minuteEnd = parseInt(timePartsEnd[1], 10);

        return days.map(day => {
            const dayIndex = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(day);
            const eventDateStart = new Date(startOfWeek);
            eventDateStart.setDate(eventDateStart.getDate() + dayIndex);
            eventDateStart.setHours(hourStart);
            eventDateStart.setMinutes(minuteStart);
            const eventDateEnd = new Date(startOfWeek);
            eventDateEnd.setDate(eventDateEnd.getDate() + dayIndex);
            eventDateEnd.setHours(hourEnd);
            eventDateEnd.setMinutes(minuteEnd);
            return {
                start: eventDateStart.toISOString(),
                end: eventDateEnd.toISOString(),
            };
        });
    };



    const events = [ ...assignments.map((assignment) => ({
        id: assignment.id,
        title: `${assignment.taskName} (${assignment.className})`,
        start: `${assignment.dueDate}T${assignment.startTime}`,
        end: `${assignment.dueDate}T${assignment.endTime}`,
        allDay: false,
        backgroundColor: assignment.color || "#0000ff",
    })),
        ...classes.flatMap((cls, index) =>
        getClassEventDates(cls.days, cls.startTime, cls.endTime).map((dates, clsIndex) => ({
            id: `class-${index}-${clsIndex}`, // Ensure unique IDs
            title: `${cls.name} (${cls.instructor})`,
            start: dates.start,
            end: dates.end,
            allDay: false,
            backgroundColor: cls.color || "#ff0000",
            extendedProps: {
                classIndex: index, // To identify which class it belongs to
            },
        }))
  )
];


    return (
        <div>
        

            <Fullcalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"timeGridWeek"}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek",
                }}
                height={"auto"}
                nowIndicator={true}
                allDaySlot={true}
                slotMinTime={"08:00"}
                slotMaxTime={"24:00"}
                editable={true}
                droppable={true}
                events={events}
                dateClick={handleDateClick} // Create task by clicking on the grid
                eventClick= {handleEventClick}
                eventDrop={handleEventDrop}
                eventResize={handleEventResize}
            />


            {isEditing && currentTask && ( // Only render the modal form
                <TaskEditForm
                    task={currentTask}
                    onSave={(updatedTask) => {
                        if (assignments.some(task => task.id === updatedTask.id)) {
                            setAssignments((prevAssignments) =>
                                prevAssignments.map((task) => (task.id === updatedTask.id ? updatedTask : task))
                            );
                        } else {
                            setAssignments((prevAssignments) => [...prevAssignments, updatedTask]);
                        }
                        setIsEditing(false);
                        setCurrentTask(null);
                    }}
                    onCancel={() => {
                        setIsEditing(false);
                        setCurrentTask(null);
                    }}
                    onDelete={() => {
                        setAssignments((prevAssignments) =>
                            prevAssignments.filter((assignment) => assignment.id !== currentTask.id)
                        );
                        setIsEditing(false);
                        setCurrentTask(null);
                    }}
                />
            )}
        </div>
    );
}

Calendar.propTypes = {
    assignments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            taskName: PropTypes.string.isRequired,
            className: PropTypes.string.isRequired,
            dueDate: PropTypes.string.isRequired,
            startTime: PropTypes.string.isRequired,
            endTime: PropTypes.string.isRequired,
            color: PropTypes.string,
        })
    ).isRequired,
    setAssignments: PropTypes.func.isRequired,
    classes: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            instructor: PropTypes.string.isRequired,
            days: PropTypes.arrayOf(PropTypes.string).isRequired,
            startTime: PropTypes.string.isRequired,
            endTime: PropTypes.string.isRequired,
            color: PropTypes.string,
        })
    ).isRequired,
    // onClickDate: PropTypes.func.isRequired,
    // setSelectedDate: PropTypes.func.isRequired,
    handleEditTask: PropTypes.func.isRequired,
    handleCreateTask: PropTypes.func.isRequired,
};

export default Calendar;
