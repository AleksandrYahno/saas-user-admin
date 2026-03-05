/* eslint-disable @typescript-eslint/unbound-method -- vi.mocked() with mock methods in tests */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { create } from 'zustand';

import type { IUserDraft } from '@domain/users/user.interface';
import { appStoreInitializer } from '@providers/appStoreProvider/appStoreStore/appStore';
import type { UseAppStore } from '@providers/appStoreProvider/AppStoreProvider';
import {
  createUserCommand,
  deleteUserCommand,
  loadUsersCommand,
} from '@providers/appStoreProvider/appStoreStore/usersSlice/usersCommands';
import { localStorageUserDataSource } from '@data/users/localStorageUserDataSource';

vi.mock('@data/users/localStorageUserDataSource', () => ({
  localStorageUserDataSource: {
    loadUsers: vi.fn(),
    createUser: vi.fn(),
    deleteUser: vi.fn(),
  },
}));

const createStore = (): UseAppStore =>
  create(appStoreInitializer) as unknown as UseAppStore;

describe('usersCommands', () => {
  beforeEach(() => {
    vi.mocked(localStorageUserDataSource.loadUsers).mockResolvedValue([]);
    vi.mocked(localStorageUserDataSource.createUser).mockResolvedValue({
      id: 'new-id',
      fullName: 'Test',
      email: 'test@example.com',
      role: 'member',
      createdAt: '2024-01-01T00:00:00.000Z',
    });
    vi.mocked(localStorageUserDataSource.deleteUser).mockResolvedValue();
  });

  describe('loadUsersCommand', () => {
    it('calls onError when loadUsers fails', async () => {
      vi.mocked(localStorageUserDataSource.loadUsers).mockRejectedValue(
        new Error('Network error'),
      );
      const store = createStore();
      const onError = vi.fn();

      await loadUsersCommand(store, { onError });

      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError).toHaveBeenCalledWith('Failed to load users.');
    });

    it('sets users when loadUsers succeeds', async () => {
      const users = [
        {
          id: '1',
          fullName: 'Jane',
          email: 'jane@example.com',
          role: 'admin' as const,
          createdAt: '2024-01-01T00:00:00.000Z',
        },
      ];
      vi.mocked(localStorageUserDataSource.loadUsers).mockResolvedValue(users);
      const store = createStore();

      await loadUsersCommand(store);

      expect(store.getState().usersSlice.users).toEqual(users);
    });
  });

  describe('createUserCommand', () => {
    const validDraft: IUserDraft = {
      fullName: 'Jane Doe',
      email: 'jane@example.com',
      role: 'admin',
      password: 'password123',
      confirmPassword: 'password123',
    };

    it('calls onError when createUser (service) throws', async () => {
      vi.mocked(localStorageUserDataSource.createUser).mockRejectedValue(
        new Error('DB error'),
      );
      const store = createStore();
      const onError = vi.fn();

      const result = await createUserCommand(store, validDraft, { onError });

      expect(result).toBeNull();
      expect(onError).toHaveBeenCalledWith('Failed to create user.');
    });

    it('returns validation errors when draft is invalid', async () => {
      const store = createStore();
      const invalidDraft: IUserDraft = {
        ...validDraft,
        fullName: 'Jo',
      };
      const createUserSpy = vi.mocked(localStorageUserDataSource.createUser);
      createUserSpy.mockClear();

      const result = await createUserCommand(store, invalidDraft);

      expect(result).not.toBeNull();
      expect(result?.fullName).toBe('Full Name must be at least 3 characters.');
      expect(createUserSpy).not.toHaveBeenCalled();
    });

    it('adds user and returns null when draft is valid and service succeeds', async () => {
      const store = createStore();
      const createdUser = {
        id: 'new-id',
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        role: 'admin' as const,
        createdAt: '2024-01-01T00:00:00.000Z',
      };
      vi.mocked(localStorageUserDataSource.createUser).mockResolvedValue(
        createdUser,
      );

      const result = await createUserCommand(store, validDraft);

      expect(result).toBeNull();
      expect(store.getState().usersSlice.users).toContainEqual(createdUser);
    });
  });

  describe('deleteUserCommand', () => {
    it('calls onError when deleteUser fails', async () => {
      vi.mocked(localStorageUserDataSource.deleteUser).mockRejectedValue(
        new Error('Not found'),
      );
      const store = createStore();
      const onError = vi.fn();

      await deleteUserCommand(store, 'user-123', { onError });

      expect(onError).toHaveBeenCalledWith('Failed to delete user.');
    });

    it('removes user from store when deleteUser succeeds', async () => {
      const store = createStore();
      const user = {
        id: 'to-delete',
        fullName: 'Delete Me',
        email: 'del@example.com',
        role: 'member' as const,
        createdAt: '2024-01-01T00:00:00.000Z',
      };
      store.getState().usersSlice.addUser(user);
      vi.mocked(localStorageUserDataSource.deleteUser).mockResolvedValue();

      await deleteUserCommand(store, 'to-delete');

      expect(store.getState().usersSlice.users).not.toContainEqual(user);
    });
  });
});
