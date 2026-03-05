import {
  createContext,
  FC,
  PropsWithChildren,
  useMemo,
  useRef,
  useContext,
} from 'react';
import { create, StoreApi, UseBoundStore } from 'zustand';

import { IAppStoreContext } from '@store/appStoreContext.interface';
import { appStoreInitializer } from '@store/appStore/appStore';
import { IAppStore } from '@store/appStore/appStore.interface';

const AppStoreContext = createContext<IAppStoreContext | undefined>(undefined);

export type UseAppStore = UseBoundStore<StoreApi<IAppStore>>;

const AppStoreProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const storeRef = useRef<UseAppStore>(
    create(appStoreInitializer) as UseAppStore,
  );

  const values = useMemo(
    () => ({
      appStore: storeRef.current,
    }),
    [],
  );

  return (
    <AppStoreContext.Provider value={values}>
      {children}
    </AppStoreContext.Provider>
  );
};

const useAppStoreContext = (): IAppStoreContext => {
  const context = useContext(AppStoreContext);
  if (context === undefined) {
    throw new Error('useAppStoreContext must be used within AppStoreProvider');
  }

  return context;
};

export {
  AppStoreProvider,
  AppStoreContext,
  useAppStoreContext,
};
