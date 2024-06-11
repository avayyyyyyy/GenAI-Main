"use client";

import { saveUserProvidedImage } from "@/actions/saveUserImage";
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function UploadImage() {
  const [providedImage, setProvidedImage] = useState("");
  const router = useRouter();

  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res[0].url);
          saveUserProvidedImage(res[0].url);
          setProvidedImage(res[0].url);
          toast.success("Image Uploaded successfully!");
          router.push("/createStory");
        }}
        onUploadError={(error: Error) => {
          toast.error("Error while uploading image");
        }}
      />

      {providedImage ? providedImage : ""}
    </main>
  );
}
