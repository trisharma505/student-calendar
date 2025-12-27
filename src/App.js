import React, { useState } from 'react';
import Calendar from "./Calendar.jsx";
import Modal from './components/Modal';
import { generateUniqueId } from './Calendar.jsx';
import logo from "./logo.png";
import { format, addDays, parseISO, startOfWeek } from 'date-fns';
import './App.css';

class CollegeClass {
  constructor(name, startTime, endTime, days, instructor = '', location = '', color) {
      this.name = name;
      this.startTime = startTime;
      this.endTime = endTime;
      this.days = days;
      this.instructor = instructor;
      this.location = location;
      this.color = color;
  }

  displayInfo() {
      return `${this.name} taught by ${this.instructor} from ${this.startTime} to ${this.endTime} on ${this.days.join(', ')} in ${this.location}.`;
  }
}

function CalendarApp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [userName, setUserName] = useState('');
  const [assignments, setAssignments] = useState([]); // Ensure this is initialized
  const [classes, setClasses] = useState([]); // Ensure this is initialized
  const [currentTask, setCurrentTask] = useState(null);
  const [currentClass, setCurrentClass] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editClassIndex, setEditClassIndex] = useState(null);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  console.log('Assignments:', assignments);
  console.log('Classes:', classes);

  const openModal = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsClassModalOpen(false);
    setEditIndex(null);
    setEditClassIndex(null);
    setCurrentTask(null);
    setCurrentClass(null);
  };

  const handleCreateClass = () => {
    setCurrentClass(new CollegeClass("", "9:00", "10:00 AM", [], "", "", "#0000ff"));
    setIsClassModalOpen(true);
  };

  // Other logic (handleClassSubmit, handleTaskSubmit, etc.) remains the same

  return (
    <div style={{ flex: 1, textAlign: 'center', marginTop: '50px' }}>
      <header className="App-header">
        <img
          src={logo}
          alt="Logo"
          style={{ position: "absolute", top: "5px", left: "60px", width: "150px", height: "150px" }}
        />
        <button
          onClick={toggleTheme}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: theme === 'light' ? '#333' : '#ccc',
            color: theme === 'light' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </header>
      <h1 style={{ marginBottom: "20px" }}>
        {userName ? `${userName}'s Calendar` : "My Calendar"}
      </h1>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Type your name"
        style={{
          padding: "8px",
          fontSize: "14px",
          marginBottom: "44px",
          textAlign: "center",
          display: "block",
          margin: "0 auto",
          width: "150px",
          marginTop: "20px",
        }}
      />
      <button onClick={handleCreateClass} style={{ padding: '8px 10px', margin: '5px', cursor: 'pointer', backgroundColor: 'green', color: 'white' }}>Add Class</button>
      <Calendar
        assignments={assignments}
        setAssignments={setAssignments}
        classes={classes}
        setClasses={setClasses}
        handleEditTask={() => {}}
        handleCreateTask={() => {}}
      />
      {/* Other modal logic remains unchanged */}
    </div>
  );
}

export default CalendarApp;
