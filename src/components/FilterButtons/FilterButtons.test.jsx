import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterButtons from './FilterButtons';

describe('FilterButtons', () => {
    const mockCounts = {
        all: 10,
        active: 6,
        completed: 4,
    };

    it('renders all three filter buttons', () => {
        const mockSetFilter = vi.fn();

        render(
            <FilterButtons
                currentFilter="all"
                setFilter={mockSetFilter}
                counts={mockCounts}
            />
        );

        expect(screen.getByText('All Tasks')).toBeInTheDocument();
        expect(screen.getByText('Active')).toBeInTheDocument();
        expect(screen.getByText('Completed')).toBeInTheDocument();
    });

    it('displays correct task counts for each filter', () => {
        const mockSetFilter = vi.fn();

        render(
            <FilterButtons
                currentFilter="all"
                setFilter={mockSetFilter}
                counts={mockCounts}
            />
        );

        expect(screen.getByText('10')).toBeInTheDocument(); // All
        expect(screen.getByText('6')).toBeInTheDocument();  // Active
        expect(screen.getByText('4')).toBeInTheDocument();  // Completed
    });

    it('highlights the active filter button', () => {
        const mockSetFilter = vi.fn();

        const { container } = render(
            <FilterButtons
                currentFilter="active"
                setFilter={mockSetFilter}
                counts={mockCounts}
            />
        );

        const activeButton = screen.getByText('Active').closest('button');
        expect(activeButton).toHaveClass('bg-primary');
    });

    it('does not highlight inactive filter buttons', () => {
        const mockSetFilter = vi.fn();

        render(
            <FilterButtons
                currentFilter="active"
                setFilter={mockSetFilter}
                counts={mockCounts}
            />
        );

        const allButton = screen.getByText('All Tasks').closest('button');
        const completedButton = screen.getByText('Completed').closest('button');

        expect(allButton).not.toHaveClass('bg-primary');
        expect(completedButton).not.toHaveClass('bg-primary');
    });

    it('calls setFilter with "all" when All Tasks button is clicked', async () => {
        const mockSetFilter = vi.fn();
        const user = userEvent.setup();

        render(
            <FilterButtons
                currentFilter="active"
                setFilter={mockSetFilter}
                counts={mockCounts}
            />
        );

        const allButton = screen.getByText('All Tasks');
        await user.click(allButton);

        expect(mockSetFilter).toHaveBeenCalledWith('all');
        expect(mockSetFilter).toHaveBeenCalledTimes(1);
    });

    it('calls setFilter with "active" when Active button is clicked', async () => {
        const mockSetFilter = vi.fn();
        const user = userEvent.setup();

        render(
            <FilterButtons
                currentFilter="all"
                setFilter={mockSetFilter}
                counts={mockCounts}
            />
        );

        const activeButton = screen.getByText('Active');
        await user.click(activeButton);

        expect(mockSetFilter).toHaveBeenCalledWith('active');
        expect(mockSetFilter).toHaveBeenCalledTimes(1);
    });

    it('calls setFilter with "completed" when Completed button is clicked', async () => {
        const mockSetFilter = vi.fn();
        const user = userEvent.setup();

        render(
            <FilterButtons
                currentFilter="all"
                setFilter={mockSetFilter}
                counts={mockCounts}
            />
        );

        const completedButton = screen.getByText('Completed');
        await user.click(completedButton);

        expect(mockSetFilter).toHaveBeenCalledWith('completed');
        expect(mockSetFilter).toHaveBeenCalledTimes(1);
    });

    it('switches highlighting when filter changes', () => {
        const mockSetFilter = vi.fn();

        const { rerender } = render(
            <FilterButtons
                currentFilter="all"
                setFilter={mockSetFilter}
                counts={mockCounts}
            />
        );

        let allButton = screen.getByText('All Tasks').closest('button');
        expect(allButton).toHaveClass('bg-primary');

        // Change filter to active
        rerender(
            <FilterButtons
                currentFilter="active"
                setFilter={mockSetFilter}
                counts={mockCounts}
            />
        );

        allButton = screen.getByText('All Tasks').closest('button');
        const activeButton = screen.getByText('Active').closest('button');

        expect(allButton).not.toHaveClass('bg-primary');
        expect(activeButton).toHaveClass('bg-primary');
    });

    it('handles zero counts correctly', () => {
        const mockSetFilter = vi.fn();
        const zeroCounts = {
            all: 0,
            active: 0,
            completed: 0,
        };

        render(
            <FilterButtons
                currentFilter="all"
                setFilter={mockSetFilter}
                counts={zeroCounts}
            />
        );

        const countElements = screen.getAllByText('0');
        expect(countElements).toHaveLength(3);
    });

    it('updates counts when they change', () => {
        const mockSetFilter = vi.fn();

        const { rerender } = render(
            <FilterButtons
                currentFilter="all"
                setFilter={mockSetFilter}
                counts={mockCounts}
            />
        );

        expect(screen.getByText('10')).toBeInTheDocument();

        const newCounts = {
            all: 15,
            active: 8,
            completed: 7,
        };

        rerender(
            <FilterButtons
                currentFilter="all"
                setFilter={mockSetFilter}
                counts={newCounts}
            />
        );

        expect(screen.getByText('15')).toBeInTheDocument();
        expect(screen.getByText('8')).toBeInTheDocument();
        expect(screen.getByText('7')).toBeInTheDocument();
    });
});
