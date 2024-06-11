import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const generateUniqueVoiceID = () => {
  const timestamp = Date.now().toString(36);
  const randomNumber = Math.random().toString(36).substr(2, 5);
  const additionalIdentifier = "genai";

  const voiceID = `${timestamp}${randomNumber}${additionalIdentifier}`;
  return voiceID;
};

const auth = (req: Request) => ({ id: generateUniqueVoiceID() });
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
