import React from "react";
import { render, screen } from "@testing-library/react";
import Calendar from "./Calendar";

jest.mock("@fullcalendar/react", () => {
    function MockFullCalendar({ eventReceive }) {
        return (
            <div>
                <div data-testid="full-calendar">Mock FullCalendar</div>
                <button onClick={() => eventReceive({ event: { title: "Math Hw" } })}>Drop Math Hw</button>
            </div>
        );
    };

    return MockFullCalendar;
});

describe("Calendar Component", () => {
    test("Renders FullCalendar", () => {
        render(<Calendar assignments={[]} setAssignments={jest.fn()} />);
        expect(screen.getByTestId("full-calendar")).toBeInTheDocument();
    });

    test("Handles dropping assignments", () => {
        const setAssignmentsMock = jest.fn();
        const assignments = ["Math Hw", "Phys Lab"];

        render(<Calendar assignments={assignments} setAssignments={setAssignmentsMock} />);
        screen.getByText("Drop Math Hw").click();
        
        expect(screen.queryByText("Math Hw") == null);
        expect(screen.queryByText("Phys Lab") != null);
    });
});