import { createContext, FC, PropsWithChildren, useMemo, useRef } from 'react';
import { create, StoreApi, UseBoundStore } from 'zustand';

import { IAppStoreContext } from '@providers/appStoreProvider/appStoreContext.interface';
import { appStoreInitializer } from '@providers/appStoreProvider/appStoreStore/appStore';
import { IAppStore } from '@providers/appStoreProvider/appStoreStore/appStore.interface';

const AppStoreContext = createContext<IAppStoreContext | undefined>(undefined);

export type UseAppStore = UseBoundStore<StoreApi<IAppStore>>;

const AppStoreProvider: FC<PropsWithChildren> = (props) => {
  const {
    children,
  } = props;

  const storeRef = useRef<UseAppStore>(create(appStoreInitializer) as UseAppStore);

  const values = useMemo(() => ({
    appStore: storeRef.current,
  }), []);

  return (
    <AppStoreContext.Provider value={values}>
      {children}
    </AppStoreContext.Provider>
  );
};

export {
  AppStoreProvider,
  AppStoreContext,
};

