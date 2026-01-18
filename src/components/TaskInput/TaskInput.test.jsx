import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TaskInput from './TaskInput';

describe('TaskInput', () => {
    it('renders input and button', () => {
        render(<TaskInput onAdd={() => { }} />);
        expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    });

    it('calls onAdd when form is submitted with text', () => {
        const handleAdd = vi.fn();
        render(<TaskInput onAdd={handleAdd} />);

        const input = screen.getByPlaceholderText(/add a new task/i);
        const button = screen.getByRole('button', { name: /add/i });

        fireEvent.change(input, { target: { value: 'New Task' } });
        fireEvent.click(button);

        expect(handleAdd).toHaveBeenCalledWith('New Task');
        expect(input).toHaveValue(''); // Should clear input
    });

    it('does not call onAdd when input is empty', () => {
        const handleAdd = vi.fn();
        render(<TaskInput onAdd={handleAdd} />);

        const button = screen.getByRole('button', { name: /add/i });
        fireEvent.click(button);

        expect(handleAdd).not.toHaveBeenCalled();
    });
});
