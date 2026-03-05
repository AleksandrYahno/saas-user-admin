import { StoreApi, UseBoundStore } from 'zustand';

import { IAppStore } from '@store/appStore/appStore.interface';

export interface IAppStoreContext {
  appStore: UseBoundStore<StoreApi<IAppStore>>;
}
