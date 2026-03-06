import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import DashboardPage from '@pages/dashboardPage/DashboardPage';

describe('DashboardPage', () => {
  it('renders 3 stat cards with expected labels and values', () => {
    render(<DashboardPage />);

    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('Active Users')).toBeInTheDocument();
    expect(screen.getByText('Pending Invitations')).toBeInTheDocument();

    expect(screen.getByText('120')).toBeInTheDocument();
    expect(screen.getByText('95')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
  });
});

