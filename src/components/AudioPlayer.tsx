"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export const AudioPlayer = ({
  storyBody,
  audioID,
}: {
  storyBody: string;
  audioID: string;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const synth = window.speechSynthesis;
  const text = storyBody;
  const utterThis = new SpeechSynthesisUtterance(text);

  useEffect(() => {
    return () => {
      synth.cancel(); // Clean up speech synthesis when component unmounts
    };
  }, []);

  const handlePlayPause = async () => {
    if (!isPlaying) {
      setIsPlaying(true);
      synth.speak(utterThis);
    } else {
      setIsPlaying(false);
      synth.cancel();
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      synth.cancel();
    }
  }, [isPlaying]);

  return (
    <Button onClick={handlePlayPause}>{isPlaying ? "Stop" : "Play"}</Button>
  );
};
