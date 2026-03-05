import { FC, ReactElement, useMemo } from 'react';

import { buildProvidersTree } from '@helpers/providerBuilder.helper';
import { AppMainProvider } from '@providers/appMainProvider/AppMainProvider';
import { AppStoreProvider } from '@providers/appStoreProvider/AppStoreProvider';

const App: FC = (): ReactElement => {
  const GlobalProviders = useMemo(() => {
    return buildProvidersTree([
      [AppStoreProvider],
      [AppMainProvider],
    ]);
  }, []);

  return (
    <GlobalProviders>
      {null}
    </GlobalProviders>
  );
};

export default App;
