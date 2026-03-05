import { CSSProperties, FC } from 'react';
import { createPortal } from 'react-dom';

import { IBackdropLoadingProps } from '@components/backdropLoading/backdropLoading.interface';

const BACKDROP_STYLE: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.55)',
  zIndex: 2147483647,
};

const SPINNER_STYLE: CSSProperties = {
  width: 48,
  height: 48,
  border: '4px solid rgba(255, 255, 255, 0.3)',
  borderTopColor: '#3b82f6',
  borderRadius: '50%',
  animation: 'backdrop-spin 0.8s linear infinite',
};

const BackdropLoading: FC<IBackdropLoadingProps> = ({
  isAbsolute = false,
  zIndex,
}) => {
  const backdropStyle: CSSProperties = isAbsolute
    ? {
      ...BACKDROP_STYLE,
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: zIndex ?? 9,
    }
    : { ...BACKDROP_STYLE, zIndex: zIndex ?? 2147483647 };

  const content = (
    <>
      <style>
        {`@keyframes backdrop-spin { to { transform: rotate(360deg); } }`}
      </style>
      <div style={backdropStyle}>
        <div style={SPINNER_STYLE} />
      </div>
    </>
  );

  if (isAbsolute) {
    return content;
  }

  return createPortal(content, document.body);
};

export default BackdropLoading;
