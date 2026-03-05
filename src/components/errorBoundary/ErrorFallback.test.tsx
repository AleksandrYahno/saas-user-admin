import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import ErrorFallback from '@components/errorBoundary/ErrorFallback';

describe('ErrorFallback', () => {
  const reloadMock = vi.fn();

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    });
  });

  it('renders message and reload button', () => {
    render(<ErrorFallback />);

    expect(screen.getByRole('button', { name: /reload/i })).toBeInTheDocument();
  });

  it('calls window.location.reload when reload button is clicked', () => {
    render(<ErrorFallback />);

    fireEvent.click(screen.getByRole('button', { name: /reload/i }));

    expect(reloadMock).toHaveBeenCalledTimes(1);
  });
});
