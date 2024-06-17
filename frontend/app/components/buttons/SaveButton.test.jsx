import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SaveButton from './SaveButton';

// Mock the styles
jest.mock('./SaveButton.style', () => ({
  backgroundColor: 'blue',
  backgroundColorHover: 'red',
}));

describe('SaveButton Component', () => {
  it('renders with the correct name', () => {
    render(<SaveButton name="Save" />);
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('changes background color on hover',  () => {
    render(<SaveButton name="Save" />);
    const button = screen.getByText('Save');
    
    // Simulate hover
    fireEvent.mouseEnter(button);
    expect(button).toHaveStyle({ backgroundColor: 'red' });

    // Simulate mouse leave
    fireEvent.mouseLeave(button);
    expect(button).toHaveStyle({ backgroundColor: 'blue' });
  });

  it('handles click event', () => {
    render(<SaveButton name="Save" />);
    const button = screen.getByText('Save');
    
    // Simulate click
    fireEvent.click(button);


    // Weitere Tests die Zusammenspiel zwischen >Frontend und Backend Prompts speoichert überprüft

  });
});
