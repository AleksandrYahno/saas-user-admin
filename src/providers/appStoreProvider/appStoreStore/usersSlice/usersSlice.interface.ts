import type {
  IUser,
  IUserId,
} from '@domain/users/user.interface';

export interface IUsersSlice {
  users: IUser[];
  isLoadingUsers: boolean;
  isSavingUser: boolean;
  error?: string;

  setUsers: (users: IUser[]) => void;
  setLoadingUsers: (value: boolean) => void;
  setSavingUser: (value: boolean) => void;
  setError: (message?: string) => void;
  addUser: (user: IUser) => void;
  removeUser: (id: IUserId) => void;
}

