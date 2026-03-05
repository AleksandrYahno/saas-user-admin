import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import BackdropLoading from '@components/backdropLoading/BackdropLoading';

describe('BackdropLoading', () => {
  it('can render as absolute overlay when isAbsolute is true', () => {
    const { container } = render(<BackdropLoading isAbsolute />);

    // In absolute mode it should render inside test container, not via portal.
    const overlay = container.querySelector('div');

    expect(overlay).not.toBeNull();
    expect(overlay?.firstChild).not.toBeNull();
  });
});

