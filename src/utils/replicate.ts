import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});

export async function generateImageFromReplicate({
  prompt,
  age,
  illustrationType,
  gender,
}: {
  prompt: string;
  age: string;
  illustrationType: string;
  gender: string;
}) {
  const output = await replicate.run(
    "fofr/epicrealismxl-lightning-hades:0ca10b1fd361c1c5568720736411eaa89d9684415eb61fd36875b4d3c20f605a",
    {
      input: {
        prompt: `create a imaginary high quality rendered ${illustrationType} like image of a ${gender} with a scenerio of  ${prompt} of around ${age} year of girl and in some way the face should be visible of that charactor`,
      },
    }
  );
  return output[0];
}
