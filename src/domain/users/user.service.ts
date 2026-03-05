import type {
  IUser,
  IUserDraft,
  IUserValidationErrors,
} from '@domain/users/user.interface';
import { validateUserDraft } from '@domain/users/user.validation';
import type { IUserDataSource } from '@domain/users/userDataSource.interface';

export interface IUserServiceCreateUserResult {
  user?: IUser;
  errors?: IUserValidationErrors;
}

export interface IUserService {
  loadUsers(): Promise<IUser[]>;
  createUser(draft: IUserDraft): Promise<IUserServiceCreateUserResult>;
  deleteUser(id: string): Promise<void>;
}

export const createUserService = (
  dataSource: IUserDataSource,
): IUserService => ({
  async loadUsers(): Promise<IUser[]> {
    return dataSource.loadUsers();
  },

  async createUser(draft: IUserDraft): Promise<IUserServiceCreateUserResult> {
    const validationErrors = validateUserDraft(draft);
    if (validationErrors !== null) {
      return { errors: validationErrors };
    }

    const now = new Date();
    const user: IUser = {
      id: crypto.randomUUID(),
      fullName: draft.fullName.trim(),
      email: draft.email.trim(),
      role: draft.role || 'member',
      createdAt: now.toISOString(),
    };

    const created = await dataSource.createUser(user);

    return { user: created };
  },

  async deleteUser(id: string): Promise<void> {
    await dataSource.deleteUser(id);
  },
});

