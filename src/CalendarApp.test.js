// src/CalendarApp.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CalendarApp from './App'; // Adjust the import path as necessary

test('should open class modal when "Add Class" button is clicked', () => {
  render(<CalendarApp />);
  
  // Use getByRole for better accessibility
  const addClassButton = screen.getByRole('button', { name: /Add Class/i });
  fireEvent.click(addClassButton);

  // Check if the class creation modal is rendered
  expect(screen.getByText(/Create Class/i)).toBeInTheDocument();
});

test('should create a class and display it in the class list', async () => {
  render(<CalendarApp />);
  
  // Open the class creation modal
  const addClassButton = screen.getByRole('button', { name: /Add Class/i });
  fireEvent.click(addClassButton);

  // Fill out the form
  fireEvent.change(screen.getByLabelText(/Class Name:/i), { target: { value: 'Math 101' } });
  fireEvent.change(screen.getByLabelText(/Time:/i), { target: { value: '10:00' } });
  
  // Select specific weekdays by full names
  fireEvent.click(screen.getByLabelText(/Monday/i));
  fireEvent.click(screen.getByLabelText(/Tuesday/i));

  // Submit the form
  const saveClassButton = screen.getByRole('button', { name: /Save Class/i });
  fireEvent.click(saveClassButton);

  // Check if the class appears in the class list
  await waitFor(() => {
    expect(screen.getByText(/Math 101/i)).toBeInTheDocument();
  });
});

test('should open task modal with the correct date when clicking on a date', async () => {
  render(<CalendarApp />);
  
  // Simulate clicking on a specific date in the calendar
  const dateElement = screen.getByText(/3/i); // Adjust the regex as needed
  fireEvent.click(dateElement);

  // Await the modal to appear
  const modalText = await screen.findByText(/Create Task/i);
  expect(modalText).toBeInTheDocument();
});
