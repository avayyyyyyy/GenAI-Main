const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export async function GenerateBody({
  prompt,
  age,
  moral,
  language,
}: {
  prompt: string;
  age: string;
  language: string;
  moral: string;
}) {
  console.log(prompt, age);

  const chatSession = model.startChat({
    generationConfig,

    history: [
      {
        role: "user",
        parts: [
          {
            text: "write a 10 to 14 long paragraphs bed time story for small girl of age group 3-5 years, about the adventoures journey to mars  which should be easy understandable, engaging and contains some sort of suspense and give output as a json object",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `{"title": "The Little Astronaut and the Martian Mystery","story": "Once upon a time, in a cozy little town filled with twinkling stars, lived a brave little girl named Lily. Lily wasn't like other children. She didn't dream of playing with dolls or building castles in the sand. Her heart yearned for the stars, for the unknown, for the wonders of space! Every night, she would gaze at the sky, her eyes sparkling with wonder, wishing she could fly to the moon and explore the planets. One day, a giant, silver spaceship landed in her backyard! A friendly alien with big, blue eyes and anteas on his head emerged from the spaceship. He introduced himself as Zorp and explained that he was from Mars, a planet of red sand and strange, shimmering rocks. He needed Lily's help to solve a big mystery. “There’s a secret hidden on Mars,” Zorp explained, “but it’s been lost for centuries. Only a brave and kind-hearted soul can find it.”Lily's heart skipped a beat. This was the adventure she had always dreamed of! Without hesitation, she packed her backpack with her favorite teddy bear, a space blanket, and a bag of star-shaped cookies. With a big smile, she climbed aboard Zorp’s spaceship, ready to embark on a journey to the red planet.The spaceship zoomed through the stars at lightning speed, leaving Earth behind. Lily looked out the window in awe as planets, stars, and even a comet whizzed past. Zorp showed her how to control the spaceship, and Lily felt like a real astronaut.After a long, exciting journey, they landed on Mars. The Martian landscape was breathtaking! The ground was covered in red sand, and the sky was a vibrant pink. Lily saw strange, tall rock formations that seemed to whisper secrets to the wind. Zorp led her through a maze of canyons, past sparkling rivers of ice, and over giant craters.They finally arrived at a hidden cave. Zorp explained that the secret was hidden deep within the cave, guarded by a mysterious force. Lily felt a shiver run down her spine. The cave was dark and silent, and the air felt cold and heavy."The secret is hidden behind a wall of swirling sand," Zorp whispered, "but only a pure heart can pass through it."Lily took a deep breath and stepped`,
          },
        ],
      },
    ],
  });

  if (moral) {
    const finalPrompt = `write a 8 long paragraphs bed time story in ${language} language  for small girl of age group ${age} years, about ${prompt} which should be easy understandable, engaging and contains some sort of suspense and its moral should be ${moral}.`;

    const result = await chatSession.sendMessage(finalPrompt);
    console.log(result);

    return result.response.text();
  }
  const finalPrompt = `write a 8 long paragraphs bed time story in ${language} language for small girl of age group ${age} years, about ${prompt} which should be easy understandable, engaging and contains some sort of suspense and make sure to give output as a valid json object`;

  const result = await chatSession.sendMessage(finalPrompt);
  console.log(result.response.text());

  return result.response.text();
}
