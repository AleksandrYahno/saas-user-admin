import { IUser, IUserDraft, IUserId, IUserValidationErrors } from '@domain/users/user.interface';

export interface IUsersPageVM {
  users: IUser[];
  isLoadingUsers: boolean;
  isSavingUser: boolean;
  error?: string;

  onReload: () => void;
  onCreateUser: (draft: IUserDraft) => Promise<IUserValidationErrors | null>;
  onDeleteUser: (id: IUserId) => Promise<void>;
}

