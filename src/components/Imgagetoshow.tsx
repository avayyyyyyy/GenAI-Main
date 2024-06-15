"use client";
import React, { useState } from "react";
import Image from "next/image";

const ImageToShow = ({
  mainImage,
  swappedImage,
  title,
}: {
  mainImage: string;
  swappedImage: string;
  title: string;
}) => {
  const [showSwappedImage, setShowSwappedImage] = useState(false);

  const handleCheckboxChange = () => {
    setShowSwappedImage(!showSwappedImage);
  };

  console.log(mainImage);

  return (
    <div className="flex flex-col items-center gap-3 justify-center my-4">
      {!showSwappedImage ? (
        <Image
          width={300}
          height={300}
          className="rounded-lg"
          src={mainImage}
          alt={title}
        />
      ) : (
        <video width={300} height={300} className="rounded-lg">
          <source src={swappedImage} type="video/mp4" />
        </video>
      )}
      <label className="flex items-center mt-2">
        <input
          type="checkbox"
          checked={showSwappedImage}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        Show Face-Swapped Image
      </label>
    </div>
  );
};

export default ImageToShow;
