import type {
  IUserDraft,
  IUserId,
  IUserValidationErrors,
} from '@domain/users/user.interface';
import { createUserService } from '@domain/users/user.service';
import { localStorageUserDataSource } from '@data/users/localStorageUserDataSource';
import type { UseAppStore } from '@providers/appStoreProvider/AppStoreProvider';

const userService = createUserService(localStorageUserDataSource);

export interface IUsersCommandOptions {
  onError?: (message: string) => void;
  onSuccess?: () => void;
}

export const loadUsersCommand = async (
  store: UseAppStore,
  options?: IUsersCommandOptions,
): Promise<void> => {
  const {
    usersSlice,
  } = store.getState();
  const {
    setLoadingUsers,
    setUsers,
  } = usersSlice;

  setLoadingUsers(true);

  try {
    const users = await userService.loadUsers();
    setUsers(users);
  } catch (_error) {
    options?.onError?.('Failed to load users.');
  } finally {
    setLoadingUsers(false);
  }
};

export const createUserCommand = async (
  store: UseAppStore,
  draft: IUserDraft,
  options?: IUsersCommandOptions,
): Promise<IUserValidationErrors | null> => {
  const {
    usersSlice,
  } = store.getState();
  const {
    setSavingUser,
    addUser,
  } = usersSlice;

  setSavingUser(true);

  try {
    const result = await userService.createUser(draft);

    if (result.errors !== undefined) {
      return result.errors;
    }

    if (result.user !== undefined) {
      addUser(result.user);
    }

    return null;
  } catch (_error) {
    options?.onError?.('Failed to create user.');

    return null;
  } finally {
    setSavingUser(false);
  }
};

export const deleteUserCommand = async (
  store: UseAppStore,
  id: IUserId,
  options?: IUsersCommandOptions,
): Promise<void> => {
  const {
    usersSlice,
  } = store.getState();
  const {
    removeUser,
  } = usersSlice;

  try {
    await userService.deleteUser(id);
    removeUser(id);
    options?.onSuccess?.();
  } catch (_error) {
    options?.onError?.('Failed to delete user.');
  }
};

