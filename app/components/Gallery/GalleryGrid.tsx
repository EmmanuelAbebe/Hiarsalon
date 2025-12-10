// components/GalleryGrid.tsx
import GalleryImage from "./GalleryImage";

interface GalleryGridProps {
  images: {
    src: string;
    alt?: string;
  }[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  return (
    <div className="flex flex-1 flex-wrap gap-1 justify-center p-4">
      {images.map((img, i) => (
        <GalleryImage key={i} src={img.src} alt={img.alt} />
      ))}
    </div>
  );
}
