import { describe, expect, it } from 'vitest';

import { formatCreatedAt } from './dateUtils';

describe('dateUtils', () => {
  describe('formatCreatedAt', () => {
    it('formats ISO date string as YYYY-MM-DD', () => {
      expect(formatCreatedAt('2025-03-04T12:00:00.000Z')).toBe('2025-03-04');
    });

    it('pads month and day with zero', () => {
      expect(formatCreatedAt('2025-01-09T00:00:00.000Z')).toBe('2025-01-09');
    });

    it('handles date-only ISO string', () => {
      expect(formatCreatedAt('2024-12-31')).toBe('2024-12-31');
    });
  });
});
