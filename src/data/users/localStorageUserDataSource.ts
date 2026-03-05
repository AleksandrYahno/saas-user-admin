import type {
  IUser,
  IUserId,
} from '@domain/users/user.interface';
import type { IUserDataSource } from '@domain/users/userDataSource.interface';
import {
  getStorageItem,
  setStorageItem,
} from '@helpers/localStorageConnector/localStorage';
import { LSKeys } from '@helpers/localStorageConnector/localStorageKeys.enum';

interface IUsersStorageSchemaV1 {
  users: IUser[];
}

const STORAGE_KEY = LSKeys.USERS;
const DEFAULT_DELAY_MS = 300;

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const readUsers = (): IUser[] => {
  const stored = getStorageItem<IUsersStorageSchemaV1>(STORAGE_KEY);

  if (stored?.users == null) {
    return [];
  }

  return stored.users;
};

const writeUsers = (users: IUser[]): void => {
  setStorageItem<IUsersStorageSchemaV1>(STORAGE_KEY, { users });
};

export const localStorageUserDataSource: IUserDataSource = {
  async loadUsers(): Promise<IUser[]> {
    await delay(DEFAULT_DELAY_MS);

    return readUsers();
  },

  async createUser(user: IUser): Promise<IUser> {
    await delay(DEFAULT_DELAY_MS);

    const users = readUsers();
    const nextUsers = [...users, user];
    writeUsers(nextUsers);

    return user;
  },

  async deleteUser(id: IUserId): Promise<void> {
    await delay(DEFAULT_DELAY_MS);

    const users = readUsers();
    const nextUsers = users.filter((user) => user.id !== id);
    writeUsers(nextUsers);
  },
};

