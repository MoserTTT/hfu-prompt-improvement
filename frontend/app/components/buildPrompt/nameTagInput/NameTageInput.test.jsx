import '@testing-library/jest-dom';  // Import jest-dom for custom assertions
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NameTagInput from './NameTagInput';

test('adds and deletes a tag', () => {
    render(<NameTagInput />);

    // Adding a tag
    const tagInput = screen.getByLabelText('Add tag');
    fireEvent.change(tagInput, { target: { value: 'TestTag' } });

    const addButton = screen.getByRole('button');
    fireEvent.click(addButton);

    // Check if the tag is added
    expect(screen.getByText('TestTag')).toBeInTheDocument();

    // Deleting the tag
    const deleteButton = screen.getByTestId('CancelIcon'); // Ensure 'CancelIcon' matches the correct test ID or attribute
    fireEvent.click(deleteButton);

    // Check if the tag is deleted
    expect(screen.queryByText('TestTag')).not.toBeInTheDocument();
});
