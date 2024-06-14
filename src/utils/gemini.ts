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
  gender,
}: {
  prompt: string;
  age: string;
  language: string;
  moral: string;
  gender: string;
}) {
  console.log(prompt, age);

  const chatSession = model.startChat({
    generationConfig,

    history: [
      {
        role: "user",
        parts: [
          {
            text: "You are a great storyteller who loves to tell bed time stories to the children, so write a  bed time story for small girl of age group 6-9 years, about Little Red Riding Hood which should be easy understandable, engaging and contains some sort of suspense and give output as a json object",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `{"title": "Little Red Riding Hood","story": "Once upon a time, in a small village nestled in the heart of a dense forest, lived a sweet little girl named Little Red Riding Hood. She earned her name from the red hooded cloak her dear grandmother had lovingly made for her. Little Red loved to visit her grandmother, who lived on the other side of the woods. One sunny morning, her mother packed a basket filled with freshly baked goodies and a jar of honey to take to her grandmother. "Be careful, my dear," her mother warned. "Stay on the path and don't talk to strangers." Little Red promised to follow her mother's instructions and set off on her journey with a skip in her step. She hummed a merry tune as she walked along the winding path through the enchanted forest. Unbeknownst to Little Red, a cunning wolf had been watching her from the shadows. The wolf wanted the delicious treats she carried and hatched a plan to trick her. "Good morning, Little Red Riding Hood," the wolf said, pretending to be friendly. "Where are you off to with such a lovely basket?" "Oh, good morning, Mr. Wolf," Little Red replied politely. "I'm going to visit my grandmother. She's not feeling well, and I'm taking her some goodies to make her feel better." The wolf's eyes gleamed with mischief. "Such a kind gesture, my dear. But don't you think it would be a good idea to pick some flowers for your grandmother from the meadow over there? I'm sure she would appreciate it." Little Red thought it was a thoughtful idea and ventured into the meadow to pick some flowers. The wolf seized the opportunity and quickly ran to her grandmother's cottage, hoping to get there before her. Arriving at the cottage, the wolf found the grandmother resting in bed. He quickly locked her in the closet and put on her nightcap and glasses, pretending to be her. Meanwhile, Little Red finished picking flowers and arrived at her grandmother's cottage. Knocking on the door, she called out, "Grandma, it's me, Little Red Riding Hood. I've brought you some treats." The wolf replied in a disguised voice, "Come in, my dear." As Little Red entered the cottage, she noticed that her grandmother looked different. "Grandma, what big eyes you have," she said, growing suspicious. "The better to see you with, my dear," the wolf replied, trying to sound like the grandmother. Little Red noticed other changes too. "Grandma, what big ears you have," she said. "The better to hear you with, my dear," the wolf replied, trying to hide his excitement. Finally, Little Red noticed the sharp teeth. "Grandma, what big teeth you have," she said, now certain that something was wrong. "The better to eat you with!" the wolf exclaimed, throwing off the disguise and revealing his true self. Terrified, Little Red ran to the door, but just as the wolf lunged towards her, a brave woodsman burst into the cottage. He had heard the commotion and hurried to save Little Red and her grandmother. With a mighty swing of his axe, the woodsman frightened the wolf away. Little Red and her grandmother were safe. From that day on, Little Red Riding Hood learned an important lesson about staying cautious and never talking to strangers. She thanked the wise woodsman for saving her and promised to be more careful in the future."`,
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "You are a great storyteller who loves to tell bed time stories to the children, so write a  bed time story for small girl of age group 6-9 years, about Beauty and the Beast which should be easy understandable, engaging and contains some sort of suspense and give output as a json object",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `{"title": "Beauty and the Beast","story": "Once upon a time, in a small village nestled deep within a dense forest, there lived a kind and book-loving young woman named Belle. She was known throughout the village for her love of learning, her warm heart, and her beauty, both inside and out. Belle's hair was as dark as midnight, her eyes as deep as the ocean, and her spirit as free as a bird's. Belle's story began in her quaint home with her loving father, Maurice. They lived a quiet life together, surrounded by books and the serene beauty of the countryside. Belle's father was an inventor, always creating new gadgets and gizmos, and she loved listening to his stories and helping him with his experiments. The small village they called home was full of well-meaning, but simple-minded townsfolk who couldn't quite understand Belle's love for books and her dreams of far-off adventures. They thought she was peculiar and, therefore, couldn't quite fit in. One fateful day, Maurice set off on a journey to a neighboring village to showcase one of his inventions. **** Along the way, he became lost in the dark and eerie forest. The wind howled, and the trees seemed to whisper secrets of ancient enchantments. Maurice eventually stumbled upon an ominous castle hidden deep in the woods. He entered the castle, hoping to find shelter for the night, but inside, he encountered the owner of the castle, a fearsome Beast. The Beast was a once-handsome prince who had been cursed by an enchantress for his selfish and cruel behavior. The enchantress had turned him into a hideous creature, and the only way to break the curse was for someone to love him despite his outward appearance. Maurice was imprisoned by the Beast for trespassing, and his horse, Philippe, galloped back to the village to alert Belle about her father's predicament. When Belle learned of her father's fate, she bravely set out on a journey to the mysterious castle to rescue him. As she arrived at the foreboding castle, she found her father in a dungeon. Belle offered to take her father's place as the Beast's prisoner, a selfless act that touched the Beast's heart. The Beast agreed, releasing Maurice, and Belle became the castle's new guest. In the days that followed, Belle found herself living with the Beast, a creature who was frightening in appearance but whose heart was filled with sadness and loneliness. Despite her initial fears, Belle's kindness and gentle spirit began to warm the Beast's heart. She discovered a magnificent library within the castle, and her love for books only deepened. As time passed, Belle and the Beast spent their days talking, reading, and sharing stories. Belle learned of the curse that had befallen the prince, and she vowed to help him break the spell. The Beast, too, found himself drawn to Belle's intelligence, beauty, and caring nature. But a shadow of danger loomed over their budding friendship. Gaston, a boorish and arrogant man from the village who had long desired to marry Belle, hatched a wicked plan to force her into marriage. He rallied the villagers and set off to the castle, where a fearsome confrontation took place. The Beast, who had truly fallen in love with Belle, fought to protect her and the castle. With Gaston's evil intentions exposed, the villagers turned against him. Ultimately, it was Belle's love for the Beast and the Beast's love for her that broke the curse. His appearance transformed into that of a handsome prince once more, and Belle's kind heart was rewarded. Belle and the prince, now free from the curse, were married in a grand ceremony, surrounded by the enchanted objects in the castle that had once been part of the curse. The village, too, learned to appreciate Belle's uniqueness, and she and the prince lived happily ever after. And so, my dear child, that is the end of the story of Beauty and the Beast. It reminds us that true beauty lies within, and love and kindness can transform even the most challenging of situations. Now, close your eyes and let your dreams carry you to a world of enchantment and love. Goodnight, and may your dreams be as beautiful as Belle's heart."`,
          },
        ],
      },
    ],
  });

  if (moral) {
    const finalPrompt = `You are a great storyteller who loves to tell bed time stories to the children, write a  paragraphs bed time story in ${language} language  for ${gender} of age group ${age} years, about ${prompt} which should be easy understandable, engaging and contains some sort of suspense and its moral should be ${moral}.`;

    const result = await chatSession.sendMessage(finalPrompt);
    console.log(result);

    return result.response.text();
  }
  const finalPrompt = `write a 8 long paragraphs bed time story in ${language} language for small girl of age group ${age} years, about ${prompt} which should be easy understandable, engaging and contains some sort of suspense and make sure to give output as a valid json object`;

  const result = await chatSession.sendMessage(finalPrompt);
  console.log(result.response.text());

  return result.response.text();
}
