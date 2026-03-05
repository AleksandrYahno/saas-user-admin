import { useContext } from 'react';

import { IAppStoreContext } from './appStoreContext.interface';
import { AppStoreContext } from './AppStoreProvider';

const useAppStoreContext = (): IAppStoreContext => {
  const context = useContext(AppStoreContext);

  if (!context) {
    throw new Error('useAppStoreContext must be used within AppStoreProvider');
  }

  return context;
};

export default useAppStoreContext;

