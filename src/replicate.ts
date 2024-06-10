import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});

export async function generateImageFromReplicate({
  prompt,
  age,
  illustrationType,
}: {
  prompt: string;
  age: string;
  illustrationType: string;
}) {
  console.log("generateImageFromReplicate called with prompt:", prompt);

  const output = await replicate.run(
    "fofr/epicrealismxl-lightning-hades:0ca10b1fd361c1c5568720736411eaa89d9684415eb61fd36875b4d3c20f605a",
    {
      input: {
        prompt: `create a imaginary high quality 3d rendered ${illustrationType} watercolor like image of a girl with a scenerio of  ${prompt} of a ${age} year of girl`,
      },
    }
  );

  console.log("Response from Replicate API:", output);
  return output[0];
}
