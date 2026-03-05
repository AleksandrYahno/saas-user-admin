import { StoreApi, UseBoundStore } from 'zustand';

import { IAppStore } from '@providers/appStoreProvider/appStoreStore/appStore.interface';

export interface IAppStoreContext {
  appStore: UseBoundStore<StoreApi<IAppStore>>;
}

