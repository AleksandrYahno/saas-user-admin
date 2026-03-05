import type {
  IUser,
  IUserId,
} from '@domain/users/user.interface';

export interface IUserDataSource {
  loadUsers(): Promise<IUser[]>;
  createUser(user: IUser): Promise<IUser>;
  deleteUser(id: IUserId): Promise<void>;
}

