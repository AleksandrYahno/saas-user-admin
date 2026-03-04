import { FC, Suspense } from 'react';

import { ILazyPageBoundaryProps } from '@components/lazyPageBoundary/lazyPageBoundary.interface';

const LazyPageBoundary: FC<ILazyPageBoundaryProps> = ({ children }) => {
  return (
    <Suspense
      fallback={(
        <div>
          Loading…
        </div>
      )}
    >
      {children}
    </Suspense>
  );
};

export default LazyPageBoundary;
