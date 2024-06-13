import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
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
      "bytedance/sdxl-lightning-4step:5f24084160c9089501c1b3545d9be3c27883ae2239b6f412990e82d4a6210f8f",
      {
        input: {
          prompt: `Create a high-quality, rendered ${illustrationType} image of a scene from the following story: ${currentPrompt}. The scene should feature a ${gender} child, approximately ${age} years old. The child should be prominently visible and engaged in an activity relevant to the scene. The environment should be detailed and immersive, with elements that reflect the story's setting.`,
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
