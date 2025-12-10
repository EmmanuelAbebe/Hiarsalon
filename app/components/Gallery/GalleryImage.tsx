// components/GalleryImage.tsx
import Image from "next/image";

interface GalleryImageProps {
  src: string;
  alt?: string;
  w?: number;
  h?: number;
}

const GalleryImage = ({ src, alt, w = 200, h = 200 }: GalleryImageProps) => {
  return (
    <div className={`flex bg-neutral-50 h-[${h}] w-[${w}]`}>
      <Image src={src} alt={alt ?? "image"} height={h} width={w} />
    </div>
  );
};

export default GalleryImage;
