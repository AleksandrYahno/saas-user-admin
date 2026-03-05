import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { IAppStore, ImmerAppStoreSetter } from '@store/appStore/appStore.interface';

const isDevMode = import.meta.env.DEV;

const appStore = (set: ImmerAppStoreSetter): IAppStore => ({
  version: 0,
  setVersion: (value: number) => {
    set((state) => {
      state.version = value;
    });
  },
});

const baseStore = immer(appStore);

export const appStoreInitializer = devtools(baseStore, {
  name: 'AppStore',
  enabled: isDevMode,
});
