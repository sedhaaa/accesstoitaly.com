'use client';

import Image, { ImageProps } from 'next/image';

// Ez a loader most már a kliens oldalon van, így legális!
const cloudinaryLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto:eco'}`];
  // Ha Cloudinary URL, beszúrjuk a paramétereket
  if (src.includes('res.cloudinary.com')) {
      const parts = src.split('/upload/');
      return `${parts[0]}/upload/${params.join(',')}/${parts[1]}`;
  }
  return src;
};

export default function CloudinaryImage(props: ImageProps) {
  // Átadjuk az összes prop-ot (alt, fill, className stb.) és rátesszük a loadert
  return <Image {...props} loader={cloudinaryLoader} />;
}