import { useState, useEffect } from 'react';

const usePortal = (preventScrolling) => {
  const [loaded, setLoaded] = useState(false);
  const [portalId] = useState('portal');

  useEffect(() => {
    const bodyElement = document.getElementsByTagName('body')[0];
    const portal = document.createElement('div');
    portal.id = portalId;
    portal.classList.add('popup-portal');

    if (preventScrolling) {
      bodyElement.style.overflow = 'hidden';
    }

    bodyElement.append(portal);
    setLoaded(true);

    return () => {
      bodyElement.removeChild(portal);

      if (preventScrolling) {
        bodyElement.style.overflow = 'auto';
      }
    };
  }, [portalId, preventScrolling]);

  return [portalId, loaded];
};

export default usePortal;
