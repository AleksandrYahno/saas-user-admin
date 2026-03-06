import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { StatCard } from '@shared/UIkit/statCard/StatCard';

describe('StatCard', () => {
  it('renders title and value', () => {
    render(
      <StatCard
        title="Total Users"
        value="120"
      />,
    );

    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('120')).toBeInTheDocument();
  });

  it('applies variant class name', () => {
    const { container } = render(
      <StatCard
        title="Active Users"
        value="95"
        variant="green"
      />,
    );

    const root = container.querySelector('.stat-card');

    expect(root).not.toBeNull();
    expect(root).toHaveClass('stat-card--green');
  });
});

