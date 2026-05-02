import React, { ImgHTMLAttributes } from 'react';

const imageCache = new Map<string, any>();

const suspendImage = (src: string) => {
  if (!imageCache.has(src)) {
    const promise = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        imageCache.set(src, true);
        resolve(true);
      };
      img.onerror = () => {
        imageCache.set(src, false); // Handle error case gracefully
        reject();
      };
      img.src = src;
    });
    imageCache.set(src, promise);
    throw promise;
  }

  const cached = imageCache.get(src);
  if (cached instanceof Promise) {
    throw cached;
  }
};

interface SuspenseImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

export const SuspenseImage: React.FC<SuspenseImageProps> = ({ src, alt, ...props }) => {
  suspendImage(src);
  return <img src={src} alt={alt} {...props} />;
};
