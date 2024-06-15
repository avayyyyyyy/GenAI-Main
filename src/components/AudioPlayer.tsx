"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, StopCircle } from "lucide-react";

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
    <Button className="bg-pink-800 hover:bg-pink-900" onClick={handlePlayPause}>
      {isPlaying ? (
        <span className="flex items-center gap-2">
          Stop <StopCircle size={16} />
        </span>
      ) : (
        <span className="flex items-center gap-2">
          Play <Play size={16} />
        </span>
      )}
    </Button>
  );
};
