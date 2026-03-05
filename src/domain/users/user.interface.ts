export type IUserId = string;

export type IUserRole = 'admin' | 'member' | 'viewer';

export interface IUser {
  id: IUserId;
  fullName: string;
  email: string;
  role: IUserRole;
  /**
   * ISO 8601 date string, e.g. "2024-04-20T10:00:00.000Z".
   * UI can format it as needed (e.g. YYYY-MM-DD).
   */
  createdAt: string;
}

export interface IUserDraft {
  fullName: string;
  email: string;
  role: IUserRole | '';
  password: string;
  confirmPassword: string;
}

export interface IUserValidationErrors {
  fullName?: string;
  email?: string;
  role?: string;
  password?: string;
  confirmPassword?: string;
  /**
   * Optional general error for non-field-specific problems.
   */
  form?: string;
}

