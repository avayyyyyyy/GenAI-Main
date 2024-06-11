"use server";

export const generateAudio = async (inputText: string) => {};

const generateUniqueVoiceID = () => {
  const timestamp = Date.now().toString(36);
  const randomNumber = Math.random().toString(36).substr(2, 5);
  const additionalIdentifier = "genai";

  const voiceID = `${timestamp}${randomNumber}${additionalIdentifier}`;
  return voiceID;
};
