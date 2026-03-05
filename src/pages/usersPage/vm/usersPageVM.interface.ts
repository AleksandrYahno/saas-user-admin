import { IUser, IUserDraft, IUserId, IUserValidationErrors } from '@domain/users/user.interface';

export interface IUsersPageVMOptions {
  onError?: (message: string) => void;
  onDeleteSuccess?: () => void;
}

export interface IUsersPageVM {
  users: IUser[];
  isLoadingUsers: boolean;
  isSavingUser: boolean;

  onReload: () => void;
  onCreateUser: (draft: IUserDraft) => Promise<IUserValidationErrors | null>;
  onDeleteUser: (id: IUserId) => Promise<void>;
}

