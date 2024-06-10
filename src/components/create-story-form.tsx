"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { createStory } from "@/actions/createStory";
import { useRouter } from "next/navigation";
import { Loader, WandSparkles } from "lucide-react";

const bedtimeStories = [
  "The Magic Pillow - A pillow that takes you on magical adventures in your dreams.",
  "Teddy's Great Adventure - Follow Teddy and his friends on exciting bedtime escapades.",
  "The Enchanted Forest - Discover the secrets hidden within the mystical forest.",
  "Dreamland Explorers - Embark on an unforgettable journey through the land of dreams.",
  "Moonlight Dreams - Experience the beauty and wonder of the moonlit night.",
  "The Secret Door - Find the hidden door that leads to a world of imagination.",
  "Starlight Wishes - Make wishes upon the twinkling stars before drifting off to sleep.",
  "The Little Dream Catcher - Learn the story of a small dream catcher with big dreams.",
  "Lost Lullabies - Help find the lost lullabies and restore peace to Dreamland.",
  "Wonder Tales - Dive into a collection of enchanting bedtime tales filled with wonder.",
  "The Sleepy Sloth - Join a sleepy sloth on its nighttime adventures.",
  "Moonlit Meadow - Explore the magical meadow under the light of the moon.",
  "Nighttime Ninja - Follow the stealthy ninja as they navigate the night.",
  "Dreamy Dragon - Encounter a friendly dragon who visits in dreams.",
  "Sleepwalking Unicorn - Join a unicorn on its sleepwalking adventures.",
  "Bedtime Brigade - Join the brave bedtime brigade on their nightly missions.",
  "Cozy Cottage Chronicles - Discover the cozy secrets of the charming cottage.",
  "Nighttime Navigators - Navigate through the night with the help of friendly creatures.",
  "Dreamland Dancers - Dance with the dreamland dancers under the starry sky.",
  "Sleepy Sea Adventure - Set sail on a sleepy sea adventure with whimsical sea creatures.",
  "Midnight Magic - Experience the magic that happens when the clock strikes midnight.",
  "Dream Weaver - Meet the mysterious dream weaver who spins dreams into reality.",
  "Sleepy Bear - Follow a sleepy bear as it prepares for hibernation.",
  "Magical Mermaid - Dive deep into the ocean and meet a magical mermaid.",
  "Starlight Symphony - Listen to the soothing melodies of the starlight symphony.",
  "Dreamy Dinosaur - Travel back in time and meet a friendly dinosaur in your dreams.",
  "Nighttime Tales - Listen to enchanting tales that come to life under the night sky.",
  "Whispering Winds - Hear the secrets whispered by the gentle nighttime winds.",
  "Moonlit Magic - Experience the enchantment of the moonlit night.",
  "Sleepy Owl's Adventure - Join a sleepy owl on its nighttime quest for adventure.",
  "Starry Night Serenade - Enjoy a serenade under the twinkling stars.",
  "Dreamland Delights - Explore the delightful wonders of Dreamland.",
  "Twilight Treasures - Discover treasures hidden in the twilight hours.",
  "Nighttime Nook - Find comfort and warmth in the nighttime nook.",
  "Sleepy Time Tales - Listen to tales that lull you into a peaceful slumber.",
  "Moonbeam Magic - Experience the magic of moonbeams shining through the night.",
  "Dreamy Wonderland - Wander through a whimsical wonderland in your dreams.",
  "Nighttime Navigators - Navigate through the night with the help of friendly creatures.",
  "Dreamland Dreams - Dream of fantastical adventures in the land of dreams.",
  "Starlit Stories - Listen to stories told by the stars in the night sky.",
  "Sleepy Sailing - Set sail on a sleepy voyage across the night sea.",
  "Midnight Musings - Reflect on the mysteries of the midnight hour.",
  "Dreamland Diaries - Explore the diary of dreams and imagination.",
  "Lullaby Lagoon - Drift off to sleep by the tranquil waters of Lullaby Lagoon.",
  "Moonlit Memories - Create cherished memories under the moonlit sky.",
  "Twinkle Tales - Listen to tales that twinkle like stars in the night sky.",
  "Snoozeville Stories - Journey to Snoozeville and discover its magical stories.",
  "Dreamy Days - Spend your days dreaming of magical adventures.",
];

console.log(bedtimeStories);

export function CreateStoryForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [moral, setMoral] = useState("");
  const [language, setLanguage] = useState("english");
  const [ageGroup, setAgeGroup] = useState("");
  const [illustrationType, setIllustrationType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      title,
      moral,
      language,
      ageGroup,
      illustrationType,
    };
    const data = await createStory(formData);
    router.push(`/story/${data.id}`);
    setLoading(false);
  };

  function randomStoriesTitle() {
    const number = Math.floor(Math.random() * 50);
    setTitle(bedtimeStories[number]);
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="flex w-full justify-between">
            <span>This story is about</span>
            <span
              onClick={randomStoriesTitle}
              className="cursor-pointer p-1 bg-primary rounded-full text-primary-foreground"
            >
              <WandSparkles size={16} />
            </span>
          </Label>
          <Textarea
            id="title"
            placeholder="Enter a title"
            value={title}
            cols={10}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="moral">The moral of the story is - optional</Label>
          <Textarea
            id="moral"
            placeholder="Describe the moral of the illustration"
            value={moral}
            cols={5}
            onChange={(e) => setMoral(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select
            value={language}
            onValueChange={(value: string) => setLanguage(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="hindi">Hindi</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="deutch">German</SelectItem>
              <SelectItem value="chinese">Chinese</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Age Group</Label>
          <RadioGroup
            value={ageGroup}
            onValueChange={(value) => setAgeGroup(value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0-3" id="age-0-3" />
              <Label htmlFor="age-0-3">0-3</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="4-9" id="age-4-9" />
              <Label htmlFor="age-4-9">4-9</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="9-12" id="age-9-12" />
              <Label htmlFor="age-9-12">9-12</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label>Illustration Type</Label>
          <RadioGroup
            value={illustrationType}
            onValueChange={(value) => setIllustrationType(value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cartoon" id="type-cartoon" />
              <Label htmlFor="type-cartoon">Cartoon</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="realistic" id="type-realistic" />
              <Label htmlFor="type-realistic">Realistic</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="watercolor" id="type-watercolor" />
              <Label htmlFor="type-watercolor">Watercolor</Label>
            </div>
          </RadioGroup>
        </div>
        <Button
          className="w-full flex items-center"
          type="submit"
          disabled={loading}
        >
          <Loader
            size={16}
            className={` animate-spin ${loading ? "block" : "hidden"} mr-2`}
          />
          Submit
        </Button>
      </form>
    </div>
  );
}
