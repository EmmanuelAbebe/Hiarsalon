import GalleryGrid from "@/app/components/Gallery/GalleryGrid";
import React from "react";

const page = () => {
  return (
    <div className="my-36 flex">
      <GalleryGrid
        images={[
          { src: "/images/1.jpg", alt: "" },
          { src: "/images/2.webp", alt: "" },
          { src: "/images/4.jpg", alt: "" },
          { src: "/images/5.jpg", alt: "" },
          { src: "/images/6.jpg", alt: "" },
          { src: "/images/7.jpg", alt: "" },
          { src: "/images/8.jpg", alt: "" },
          { src: "/images/9.jpg", alt: "" },
        ]}
      />
    </div>
  );
};

export default page;
