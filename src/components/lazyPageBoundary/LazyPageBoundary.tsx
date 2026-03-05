import { FC, Suspense } from 'react';

import BackdropLoading from '@components/backdropLoading/BackdropLoading';
import { ILazyPageBoundaryProps } from '@components/lazyPageBoundary/lazyPageBoundary.interface';

const LazyPageBoundary: FC<ILazyPageBoundaryProps> = ({ children }) => {
  return (
    <Suspense fallback={<BackdropLoading />}>
      {children}
    </Suspense>
  );
};

export default LazyPageBoundary;
