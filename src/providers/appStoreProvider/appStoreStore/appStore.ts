import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

import type {
  IAppStore,
  ImmerAppStoreSetter,
} from '@providers/appStoreProvider/appStoreStore/appStore.interface';
import { usersSlice } from '@providers/appStoreProvider/appStoreStore/usersSlice/usersSlice';

const isDevMode = import.meta.env.DEV;

const appStore = (
  set: ImmerAppStoreSetter,
): IAppStore => ({
  usersSlice: usersSlice(set),
});

const baseStore = immer(appStore);

export const appStoreInitializer = devtools(baseStore, {
  name: 'AppStore',
  enabled: isDevMode,
});

