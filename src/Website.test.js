import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Website from "./Website";
import AssignmentInput from "./AssignmentInput";
import AssignmentList from "./AssignmentList";

jest.mock("./Calendar", () => () => {
    const MockCalendar = () => <div>Mock Calendar</div>;
    MockCalendar.displayName = "MockCalendar";
    return MockCalendar;
});

describe("Website works", () => {
    test("Renders header 'TimeTrack'", () => {
        render(<Website />);
        expect(screen.getByText("TimeTrack")).toBeInTheDocument();
    });

    test("Renders AssignmentInput/AssignmentList", () => {
        render(<Website />);
        expect(screen.getByPlaceholderText("New Assignment")).toBeInTheDocument();
        expect(screen.getByText("Assignments")).toBeInTheDocument();
    });

    test("Renders the Calendar", () => {
        render(<Website />);
        expect(screen.getByText("Calendar")).toBeInTheDocument();
    });

    test("Adds new assignments", () => {
        render(<Website />);
    
        const input = screen.getByPlaceholderText("New Assignment");
        fireEvent.change(input, { target: { value: "Math Hw" } });

        fireEvent.click(screen.getByText("Add Assignment"));

        expect(screen.getByText("Math Hw")).toBeInTheDocument();
    });
});

describe("AssignmentInput works", () => {
    const mockSetNewAssignment = jest.fn();
    const mockHandleAddAssignment = jest.fn();

    test("Renders input and button", () => {
        render(
        <AssignmentInput
            newAssignment=""
            setNewAssignment={mockSetNewAssignment}
            handleAddAssignment={mockHandleAddAssignment}
        />
        );
        expect(screen.getByPlaceholderText("New Assignment")).toBeInTheDocument();
        expect(screen.getByText("Add Assignment")).toBeInTheDocument();
    });

    test("Inputs work", () => {
        render(
        <AssignmentInput
            newAssignment=""
            setNewAssignment={mockSetNewAssignment}
            handleAddAssignment={mockHandleAddAssignment}
        />
        );

        const input = screen.getByPlaceholderText("New Assignment");
        fireEvent.change(input, { target: { value: "Phys Lab" } });

        expect(mockSetNewAssignment).toHaveBeenCalledWith("Phys Lab");
    });

    test("Calls handleAddAssignment after clicking", () => {
        render(
        <AssignmentInput
            newAssignment="Phys Lab"
            setNewAssignment={mockSetNewAssignment}
            handleAddAssignment={mockHandleAddAssignment}
        />
        );

        fireEvent.click(screen.getByText("Add Assignment"));

        expect(mockHandleAddAssignment).toHaveBeenCalledTimes(1);
    });
});

describe("AssignmentList works", () => {

    test("Renders empty list", () => {
        render(<AssignmentList assignments={[]} />);
        expect(screen.getByText("Drag Assignments")).toBeInTheDocument();
    });

    test("Renders assignments", () => {
        const assignments = ["Math Hw", "Phys Lab"];
        render(<AssignmentList assignments={assignments} />);
        expect(screen.getByText("Math Hw")).toBeInTheDocument();
        expect(screen.getByText("Phys Lab")).toBeInTheDocument();
    });

});