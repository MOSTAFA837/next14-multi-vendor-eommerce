import { cn, getGridClassName } from "@/lib/utils";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  images: { url: string }[];
  onRemove: (value: string) => void;
  colors?: { color: string }[];
  setColors: Dispatch<SetStateAction<{ color: string }[]>>;
}

function ImagesPreviewGrid({ images, onRemove, colors, setColors }: Props) {
  let imagesLength = images.length;

  // get the grid class based on the number on images
  const gridClassName = getGridClassName(imagesLength);

  if (imagesLength === 0) {
    return (
      <div>
        <Image
          src="/assets/images/no_image_2.png"
          alt="No Image availabe"
          width={400}
          height={400}
          className="rounded-md border"
        />
      </div>
    );
  } else {
    return (
      <div className="max-w-4xl">
        <div
          className={cn(
            "grid h-[800px] overflow-hidden bg-white rounded-md",
            gridClassName
          )}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className={cn(
                "relative group w-full border border-gray-300",
                `grid_${imagesLength}_image_${i + 1}`,
                { "h-[266.66px]": images.length === 6 }
              )}
            >
              <Image
                src={img.url}
                alt=""
                width={400}
                height={400}
                className="w-full h-full object-contain object-center"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ImagesPreviewGrid;
