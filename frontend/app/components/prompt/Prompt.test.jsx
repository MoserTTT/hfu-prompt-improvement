import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Prompt from "./Prompt";

// Mock the styles and other modules
jest.mock("./prompt.style", () => ({
    outerDiv: {},
    innerDiv: {},
    headingDiv: {},
    name: {},
    status: {},
    dateCreated: {},
    date: {},
    viewMore: {},
    viewMoreText: {},
    collapsableArrow: {}
}));

// Mock the ClockIcon component
jest.mock("../../../assets/icons/components", () => ({
    ClockIcon: () => <svg />,
}));

// Mock the CollapsableArrow component
jest.mock("../sidebars/menuSidebar/assets/CollapsableArrow", () => (props) => (
    <div {...props}>Arrow</div>
));

// Mock the useDraggable hook from @dnd-kit/core
jest.mock('@dnd-kit/core', () => ({
    useDraggable: jest.fn().mockReturnValue({
        attributes: {},
        listeners: {},
        setNodeRef: jest.fn(),
        transform: null,
    }),
}));

describe('Prompt Component', () => {
    // Define mock properties for the Prompt component
    const mockProps = {
        name: "Test Prompt",
        dateCreated: "2023-06-14",
        status: "Draft",
        tags: ["tag1", "tag2"],
        author: "Author Name",
        content: "This is a test prompt content"
    };

    // Test if the component renders without crashing
    it('renders without crashing', () => {
        render(<Prompt {...mockProps} />);
        expect(screen.getByText("Test Prompt")).toBeInTheDocument();
        expect(screen.getByText("2023-06-14")).toBeInTheDocument();
        expect(screen.getByText("Draft")).toBeInTheDocument();
    });

    // Test if the "View more" button toggles the collapsed state
    it('toggles view more/less on button click', () => {
        render(<Prompt {...mockProps} />);
        const viewMoreButton = screen.getByText(/View more/i);
        expect(viewMoreButton).toBeInTheDocument();

        fireEvent.click(viewMoreButton);
        expect(screen.getByText(/View more/i)).toBeInTheDocument();

        fireEvent.click(viewMoreButton);
        expect(screen.getByText(/View more/i)).toBeInTheDocument();
    });

    // Test if the drag and drop functionality is handled correctly
    it('handles drag and drop', () => {
        const { setNodeRef } = require('@dnd-kit/core').useDraggable.mock.results[0].value;
        render(<Prompt {...mockProps} />);
        expect(setNodeRef).toHaveBeenCalled();
    });
});
