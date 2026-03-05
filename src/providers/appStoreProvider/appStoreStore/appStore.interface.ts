import type { IUsersSlice } from './usersSlice/usersSlice.interface';

export interface IAppStore {
  usersSlice: IUsersSlice;
}

export type ImmerAppStoreSetter = (fn: (store: IAppStore) => void) => void;

