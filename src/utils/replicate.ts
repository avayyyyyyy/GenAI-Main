import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});

interface ReplicateOutput {
  [index: number]: string;
}

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
}): Promise<string> {
  // Split the prompt into three parts based on paragraph breaks
  const splittedPrompts = splitPromptIntoThreeParts(prompt);

  let allImages = "";
  for (let i = 0; i < 3; i++) {
    const currentPrompt = splittedPrompts[i].trim();

    // Run the Replicate API with the current prompt
    const output = (await replicate.run(
      "fofr/epicrealismxl-lightning-hades:0ca10b1fd361c1c5568720736411eaa89d9684415eb61fd36875b4d3c20f605a",
      {
        input: {
          prompt: `create imaginary high quality rendered ${illustrationType} like images based on different scenarios of this story:  ${currentPrompt} and mention a ${gender} of around ${age} years old  in some way that it should be visible`,
          negative_prompt: "hands, spots, photo, text, watermark, face hidden",
          number_of_images: 1,
        },
      }
    )) as ReplicateOutput;

    // Assuming output is an array of URLs, concatenate the URLs with " **** "
    if (output[0]) {
      allImages += `${output[0]} **** `;
    }
  }

  // Remove the last " **** " from the end of allImages
  allImages = allImages.trim();

  console.log(allImages);

  return allImages;
}

// Helper function to split the prompt into three parts based on paragraph breaks
function splitPromptIntoThreeParts(prompt: string): string[] {
  const parts = [];
  let currentPart = "";
  const paragraphs = prompt.split("\n");

  for (let paragraph of paragraphs) {
    if ((currentPart + paragraph).length > prompt.length / 3) {
      parts.push(currentPart.trim());
      currentPart = "";
    }
    currentPart += paragraph + "\n";
  }
  if (currentPart.trim().length > 0) {
    parts.push(currentPart.trim());
  }

  // Ensure there are exactly 3 parts
  while (parts.length < 3) {
    parts.push("");
  }

  return parts;
}
