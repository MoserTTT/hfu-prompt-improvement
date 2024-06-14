import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NameTagInput from './NameTagInput';

describe('NameTagInput Component', () => {
  it('adds and deletes a tag', () => {
    render(<NameTagInput />);

    // Finden Sie das Tag-Input-Feld
    const tagInput = screen.getByLabelText(/add tag/i);
    expect(tagInput).toBeInTheDocument();

    // Simulieren Sie die Eingabe eines Tags
    fireEvent.change(tagInput, { target: { value: 'TestTag' } });

    // Finden Sie den Hinzufügen-Button
    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addButton);

    // Überprüfen Sie, ob das Tag hinzugefügt wurde
    expect(screen.getByText('TestTag')).toBeInTheDocument();

    // Finden Sie den Tag-Lösch-Button und klicken Sie darauf
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    // Überprüfen Sie, ob das Tag gelöscht wurde
    expect(screen.queryByText('TestTag')).not.toBeInTheDocument();
  });
});
