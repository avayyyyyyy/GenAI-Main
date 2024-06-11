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
        onClientUploadComplete={async (res) => {
          try {
            console.log("Files: ", res[0].url);
            await saveUserProvidedImage(res[0].url);
            setProvidedImage(res[0].url);
            toast.success("Image Uploaded successfully!");
            router.push("/createStory");
          } catch (error) {
            console.error("Error while saving image:", error);
            toast.error("Error while saving image");
          }
        }}
        onUploadError={(error: Error) => {
          console.error("Error while uploading image:", error);
          toast.error("Error while uploading image");
        }}
      />
    </main>
  );
}
