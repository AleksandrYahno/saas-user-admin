import type {
  IUserDraft,
  IUserId,
  IUserValidationErrors,
} from '@domain/users/user.interface';
import { createUserService } from '@domain/users/user.service';
import { localStorageUserDataSource } from '@data/users/localStorageUserDataSource';
import type { UseAppStore } from '@providers/appStoreProvider/AppStoreProvider';

const userService = createUserService(localStorageUserDataSource);

export const loadUsersCommand = async (store: UseAppStore): Promise<void> => {
  const {
    usersSlice,
  } = store.getState();
  const {
    setLoadingUsers,
    setError,
    setUsers,
  } = usersSlice;

  setLoadingUsers(true);
  setError(undefined);

  try {
    const users = await userService.loadUsers();
    setUsers(users);
  } catch (_error) {
    setError('Failed to load users.');
  } finally {
    setLoadingUsers(false);
  }
};

export const createUserCommand = async (
  store: UseAppStore,
  draft: IUserDraft,
): Promise<IUserValidationErrors | null> => {
  const {
    usersSlice,
  } = store.getState();
  const {
    setSavingUser,
    setError,
    addUser,
  } = usersSlice;

  setSavingUser(true);
  setError(undefined);

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
    setError('Failed to create user.');

    return null;
  } finally {
    setSavingUser(false);
  }
};

export const deleteUserCommand = async (
  store: UseAppStore,
  id: IUserId,
): Promise<void> => {
  const {
    usersSlice,
  } = store.getState();
  const {
    removeUser,
    setError,
  } = usersSlice;

  setError(undefined);

  try {
    await userService.deleteUser(id);
    removeUser(id);
  } catch (_error) {
    setError('Failed to delete user.');
  }
};

