import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskItem from './TaskItem';

describe('TaskItem', () => {
    const mockTask = {
        id: '1',
        text: 'Test task',
        completed: false,
        tags: [],
    };

    const mockCompletedTask = {
        id: '2',
        text: 'Completed task',
        completed: true,
        tags: [],
    };

    it('renders task text correctly', () => {
        const mockOnToggle = vi.fn();
        const mockOnDelete = vi.fn();
        const mockOnUpdate = vi.fn();

        render(
            <TaskItem
                task={mockTask}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
                onUpdate={mockOnUpdate}
            />
        );

        expect(screen.getByText('Test task')).toBeInTheDocument();
    });

    it('renders checkbox for task completion', () => {
        const mockOnToggle = vi.fn();
        const mockOnDelete = vi.fn();
        const mockOnUpdate = vi.fn();

        render(
            <TaskItem
                task={mockTask}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
                onUpdate={mockOnUpdate}
            />
        );

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).not.toBeChecked();
    });

    it('shows checkbox as checked for completed tasks', () => {
        const mockOnToggle = vi.fn();
        const mockOnDelete = vi.fn();
        const mockOnUpdate = vi.fn();

        render(
            <TaskItem
                task={mockCompletedTask}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
                onUpdate={mockOnUpdate}
            />
        );

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeChecked();
    });

    it('calls onToggle when checkbox is clicked', async () => {
        const mockOnToggle = vi.fn();
        const mockOnDelete = vi.fn();
        const mockOnUpdate = vi.fn();
        const user = userEvent.setup();

        render(
            <TaskItem
                task={mockTask}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
                onUpdate={mockOnUpdate}
            />
        );

        const checkbox = screen.getByRole('checkbox');
        await user.click(checkbox);

        expect(mockOnToggle).toHaveBeenCalledWith('1');
        expect(mockOnToggle).toHaveBeenCalledTimes(1);
    });

    it('calls onDelete when delete button is clicked', async () => {
        const mockOnToggle = vi.fn();
        const mockOnDelete = vi.fn();
        const mockOnUpdate = vi.fn();
        const user = userEvent.setup();

        render(
            <TaskItem
                task={mockTask}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
                onUpdate={mockOnUpdate}
            />
        );

        // Find delete button by title attribute
        const deleteButton = screen.getByTitle('Delete');
        await user.click(deleteButton);

        // Wait for the animation delay (300ms setTimeout in handleDelete)
        await new Promise(resolve => setTimeout(resolve, 350));

        expect(mockOnDelete).toHaveBeenCalledWith('1');
    });

    it('enters edit mode when edit button is clicked', async () => {
        const mockOnToggle = vi.fn();
        const mockOnDelete = vi.fn();
        const mockOnUpdate = vi.fn();
        const user = userEvent.setup();

        render(
            <TaskItem
                task={mockTask}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
                onUpdate={mockOnUpdate}
            />
        );

        // Find edit button by title attribute
        const editButton = screen.getByTitle('Edit');
        await user.click(editButton);

        // In edit mode, there should be an input field
        const input = screen.getByDisplayValue('Test task');
        expect(input).toBeInTheDocument();
    });

    it('enters edit mode when task text is double-clicked', async () => {
        const mockOnToggle = vi.fn();
        const mockOnDelete = vi.fn();
        const mockOnUpdate = vi.fn();

        render(
            <TaskItem
                task={mockTask}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
                onUpdate={mockOnUpdate}
            />
        );

        const taskText = screen.getByText('Test task');
        fireEvent.doubleClick(taskText);

        // In edit mode, there should be an input field
        const input = screen.getByDisplayValue('Test task');
        expect(input).toBeInTheDocument();
    });

    it('saves edited text when Enter is pressed', async () => {
        const mockOnToggle = vi.fn();
        const mockOnDelete = vi.fn();
        const mockOnUpdate = vi.fn();
        const user = userEvent.setup();

        render(
            <TaskItem
                task={mockTask}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
                onUpdate={mockOnUpdate}
            />
        );

        // Enter edit mode
        const taskText = screen.getByText('Test task');
        fireEvent.doubleClick(taskText);

        // Edit the text
        const input = screen.getByDisplayValue('Test task');
        await user.clear(input);
        await user.type(input, 'Updated task{Enter}');

        expect(mockOnUpdate).toHaveBeenCalledWith('1', { text: 'Updated task' });
    });

    it('cancels edit when Escape is pressed', async () => {
        const mockOnToggle = vi.fn();
        const mockOnDelete = vi.fn();
        const mockOnUpdate = vi.fn();
        const user = userEvent.setup();

        render(
            <TaskItem
                task={mockTask}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
                onUpdate={mockOnUpdate}
            />
        );

        // Enter edit mode
        const taskText = screen.getByText('Test task');
        fireEvent.doubleClick(taskText);

        // Press Escape
        const input = screen.getByDisplayValue('Test task');
        await user.type(input, '{Escape}');

        // Should exit edit mode without calling onUpdate
        expect(mockOnUpdate).not.toHaveBeenCalled();
        expect(screen.getByText('Test task')).toBeInTheDocument();
    });

    it('applies completed styling to completed tasks', () => {
        const mockOnToggle = vi.fn();
        const mockOnDelete = vi.fn();
        const mockOnUpdate = vi.fn();

        const { container } = render(
            <TaskItem
                task={mockCompletedTask}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
                onUpdate={mockOnUpdate}
            />
        );

        // Check for opacity class or completed styling
        const taskContainer = container.firstChild;
        expect(taskContainer).toHaveClass('opacity-60');
    });

    it('renders with tags when provided', () => {
        const mockOnToggle = vi.fn();
        const mockOnDelete = vi.fn();
        const mockOnUpdate = vi.fn();

        const taskWithTags = {
            ...mockTask,
            tags: ['Work', 'Priority'],
        };

        const availableTags = [
            { name: 'Work', color: 'bg-blue-50 text-blue-600' },
            { name: 'Priority', color: 'bg-red-50 text-red-600' },
        ];

        render(
            <TaskItem
                task={taskWithTags}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
                onUpdate={mockOnUpdate}
                tags={availableTags}
            />
        );

        expect(screen.getByText('Work')).toBeInTheDocument();
        expect(screen.getByText('Priority')).toBeInTheDocument();
    });

    it('renders with due date when provided', () => {
        const mockOnToggle = vi.fn();
        const mockOnDelete = vi.fn();
        const mockOnUpdate = vi.fn();

        const taskWithDate = {
            ...mockTask,
            dueDate: '2026-01-25',
        };

        render(
            <TaskItem
                task={taskWithDate}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
                onUpdate={mockOnUpdate}
            />
        );

        // Check that date is displayed (format may vary)
        expect(screen.getByText(/2026|Jan|January/i)).toBeInTheDocument();
    });
});
