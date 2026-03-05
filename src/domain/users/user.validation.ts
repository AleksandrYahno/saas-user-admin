import type {
  IUserDraft,
  IUserValidationErrors,
} from '@domain/users/user.interface';

const MIN_FULL_NAME_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 8;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateUserDraft = (
  draft: IUserDraft,
): IUserValidationErrors | null => {
  const errors: IUserValidationErrors = {};

  if (!draft.fullName.trim()) {
    errors.fullName = 'Full Name is required.';
  } else if (draft.fullName.trim().length < MIN_FULL_NAME_LENGTH) {
    errors.fullName = 'Full Name must be at least 3 characters.';
  }

  if (!draft.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!emailRegex.test(draft.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!draft.role) {
    errors.role = 'Role is required.';
  }

  if (!draft.password) {
    errors.password = 'Password is required.';
  } else if (draft.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = 'Password must be at least 8 characters.';
  }

  if (!draft.confirmPassword) {
    errors.confirmPassword = 'Confirm Password is required.';
  } else if (draft.confirmPassword !== draft.password) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

