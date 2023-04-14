import { useEffect, useState } from 'react';

export const useImage = (small: string, medium: string, large: string) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    const update = () => {
      if (window.innerWidth > 959) {
        setImage(large);
      } else if (window.innerWidth > 599) {
        setImage(medium);
      } else {
        setImage(small);
      }
    };

    window.addEventListener('resize', update);
    update();

    return () => window.removeEventListener('resize', update);
  }, []);

  return image;
};
