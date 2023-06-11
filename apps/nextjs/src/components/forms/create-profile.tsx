"use client";

import Image from "next/image";

export const CreateProfileForm = ({
  albumImages,
}: {
  albumImages: string[];
}) => {
  return (
    <div>
      <h1>Create Profile</h1>
      <div className="flex gap-6">
        {albumImages.map((image: string, i) => (
          <Image
            key={i}
            src={image}
            width={200}
            height={200}
            alt="Album image"
          />
        ))}
      </div>
    </div>
  );
};
