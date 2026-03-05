import { IUsersSlice } from '@providers/appStoreProvider/appStoreStore/usersSlice/usersSlice.interface';
import { ImmerAppStoreSetter } from '@providers/appStoreProvider/appStoreStore/appStore.interface';
import {
  addItemLast,
  removeItemById,
} from '@helpers/array/arrayUtils';

export const usersSlice = (set: ImmerAppStoreSetter): IUsersSlice => ({
  users: [],
  isLoadingUsers: false,
  isSavingUser: false,
  error: undefined,

  setUsers: (users) => {
    set((state) => {
      state.usersSlice.users = users;
    });
  },

  setLoadingUsers: (value) => {
    set((state) => {
      state.usersSlice.isLoadingUsers = value;
    });
  },

  setSavingUser: (value) => {
    set((state) => {
      state.usersSlice.isSavingUser = value;
    });
  },

  setError: (message) => {
    set((state) => {
      state.usersSlice.error = message;
    });
  },

  addUser: (user) => {
    set((state) => {
      state.usersSlice.users = addItemLast(state.usersSlice.users, user);
    });
  },

  removeUser: (id) => {
    set((state) => {
      state.usersSlice.users = removeItemById(state.usersSlice.users, id, 'id');
    });
  },
});

