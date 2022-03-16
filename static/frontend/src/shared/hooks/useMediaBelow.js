import { useEffect, useState } from 'react';

const useMediaBelow = (value) => {
  const [isBelowValue, setBelowValue] = useState(window.innerWidth < value);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < value) {
        setBelowValue(true);
      } else {
        setBelowValue(false);
      }
    };

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [value]);

  return isBelowValue;
};

export default useMediaBelow;
