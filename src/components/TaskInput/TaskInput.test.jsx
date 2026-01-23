import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskInput from './TaskInput';

describe('TaskInput', () => {
    it('renders input field with placeholder', () => {
        const mockOnAdd = vi.fn();
        render(<TaskInput onAdd={mockOnAdd} />);

        const input = screen.getByPlaceholderText('What needs to be done?');
        expect(input).toBeInTheDocument();
    });

    it('allows user to type in the input field', async () => {
        const mockOnAdd = vi.fn();
        const user = userEvent.setup();
        render(<TaskInput onAdd={mockOnAdd} />);

        const input = screen.getByPlaceholderText('What needs to be done?');
        await user.type(input, 'Buy groceries');

        expect(input).toHaveValue('Buy groceries');
    });

    it('calls onAdd with trimmed text when form is submitted', async () => {
        const mockOnAdd = vi.fn();
        const user = userEvent.setup();
        render(<TaskInput onAdd={mockOnAdd} />);

        const input = screen.getByPlaceholderText('What needs to be done?');
        await user.type(input, 'New task');

        const form = input.closest('form');
        fireEvent.submit(form);

        expect(mockOnAdd).toHaveBeenCalledWith('New task');
        expect(mockOnAdd).toHaveBeenCalledTimes(1);
    });

    it('clears input after successful submission', async () => {
        const mockOnAdd = vi.fn();
        const user = userEvent.setup();
        render(<TaskInput onAdd={mockOnAdd} />);

        const input = screen.getByPlaceholderText('What needs to be done?');
        await user.type(input, 'Task to clear');

        const form = input.closest('form');
        fireEvent.submit(form);

        expect(input).toHaveValue('');
    });

    it('does not call onAdd when submitting empty text', () => {
        const mockOnAdd = vi.fn();
        render(<TaskInput onAdd={mockOnAdd} />);

        const input = screen.getByPlaceholderText('What needs to be done?');
        const form = input.closest('form');
        fireEvent.submit(form);

        expect(mockOnAdd).not.toHaveBeenCalled();
    });

    it('does not call onAdd when submitting whitespace-only text', async () => {
        const mockOnAdd = vi.fn();
        const user = userEvent.setup();
        render(<TaskInput onAdd={mockOnAdd} />);

        const input = screen.getByPlaceholderText('What needs to be done?');
        await user.type(input, '   ');

        const form = input.closest('form');
        fireEvent.submit(form);

        expect(mockOnAdd).not.toHaveBeenCalled();
    });

    it('trims whitespace from input before calling onAdd', async () => {
        const mockOnAdd = vi.fn();
        const user = userEvent.setup();
        render(<TaskInput onAdd={mockOnAdd} />);

        const input = screen.getByPlaceholderText('What needs to be done?');
        await user.type(input, '  Task with spaces  ');

        const form = input.closest('form');
        fireEvent.submit(form);

        expect(mockOnAdd).toHaveBeenCalledWith('Task with spaces');
    });

    it('submits form when Enter key is pressed', async () => {
        const mockOnAdd = vi.fn();
        const user = userEvent.setup();
        render(<TaskInput onAdd={mockOnAdd} />);

        const input = screen.getByPlaceholderText('What needs to be done?');
        await user.type(input, 'Task via Enter{Enter}');

        expect(mockOnAdd).toHaveBeenCalledWith('Task via Enter');
    });

    it('shows submit button when text is entered', async () => {
        const mockOnAdd = vi.fn();
        const user = userEvent.setup();
        render(<TaskInput onAdd={mockOnAdd} />);

        const input = screen.getByPlaceholderText('What needs to be done?');

        // Button should not be visible initially
        expect(screen.queryByRole('button', { type: 'submit' })).not.toBeInTheDocument();

        // Type some text
        await user.type(input, 'New task');

        // Button should now be visible
        expect(screen.getByRole('button', { type: 'submit' })).toBeInTheDocument();
    });

    it('hides submit button when input is empty', async () => {
        const mockOnAdd = vi.fn();
        const user = userEvent.setup();
        render(<TaskInput onAdd={mockOnAdd} />);

        const input = screen.getByPlaceholderText('What needs to be done?');

        // Type and then clear
        await user.type(input, 'Text');
        expect(screen.getByRole('button', { type: 'submit' })).toBeInTheDocument();

        await user.clear(input);
        expect(screen.queryByRole('button', { type: 'submit' })).not.toBeInTheDocument();
    });
});
