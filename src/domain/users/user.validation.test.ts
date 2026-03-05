import { describe, expect, it } from 'vitest';

import type { IUserDraft } from '@domain/users/user.interface';
import { validateUserDraft } from '@domain/users/user.validation';

const buildValidDraft = (overrides?: Partial<IUserDraft>): IUserDraft => ({
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  role: 'admin',
  password: 'password123',
  confirmPassword: 'password123',
  ...overrides,
});

describe('validateUserDraft', () => {
  it('returns null for a valid draft', () => {
    const draft = buildValidDraft();

    const result = validateUserDraft(draft);

    expect(result).toBeNull();
  });

  it('validates full name length', () => {
    const draft = buildValidDraft({ fullName: 'Jo' });

    const result = validateUserDraft(draft);

    expect(result?.fullName).toBe('Full Name must be at least 3 characters.');
  });

  it('validates email format', () => {
    const draft = buildValidDraft({ email: 'invalid-email' });

    const result = validateUserDraft(draft);

    expect(result?.email).toBe('Please enter a valid email address.');
  });

  it('validates password length', () => {
    const draft = buildValidDraft({ password: 'short', confirmPassword: 'short' });

    const result = validateUserDraft(draft);

    expect(result?.password).toBe('Password must be at least 8 characters.');
  });

  it('validates confirmPassword matches password', () => {
    const draft = buildValidDraft({ confirmPassword: 'different' });

    const result = validateUserDraft(draft);

    expect(result?.confirmPassword).toBe('Passwords do not match.');
  });

  it('validates role is required', () => {
    const draft = buildValidDraft({ role: '' });

    const result = validateUserDraft(draft);

    expect(result?.role).toBe('Role is required.');
  });
});

