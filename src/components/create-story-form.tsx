"use client";

import { useState, FormEvent } from "react";
import { Label } from "@/components/ui/label";
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
import { createStory } from "@/actions/createStory";
import { useRouter } from "next/navigation";
import { Loader, WandSparkles } from "lucide-react";
import { toast } from "sonner";

const bedtimeStories = [
  "The Adventures of Starry the Unicorn - Follow Starry on a magical quest to save the stars from a dark curse.",
  "The Moonlit Pirate Treasure - Join young pirates as they search for hidden treasure under the light of the full moon.",
  "The Enchanted Clock - Discover the secret of a mystical clock that can stop and reverse time.",
  "The Dragon's Secret - Unveil the mysteries hidden in a dragon's cave and the bond between a young boy and a wise dragon.",
  "The Magical Library - Enter a library where books come to life and characters step out of their stories.",
  "The Midnight Circus - Explore a circus that appears only at midnight, filled with fantastical creatures and breathtaking performances.",
  "The Whispering Woods - Journey through a forest where the trees talk and every creature has a story to tell.",
  "The Sky Kingdom - Travel to a kingdom in the clouds where children can fly and play among the stars.",
  "The Lost Kingdom of Atlantis - Dive deep into the ocean to find the lost city of Atlantis and its amazing inhabitants.",
  "The Crystal Caverns - Venture into glowing crystal caves with secrets that light up the night.",
  "The Phantom Ship - Sail with a ghostly crew on an eerie ship that appears only under the moonlight.",
  "The Guardian of the Galaxy - Embark on an interstellar adventure with a young guardian protecting the universe.",
  "The Dream Weaver's Tale - Meet the Dream Weaver who creates dreams for all the children in the world.",
  "The Moonstone Mystery - Solve the mystery of the missing moonstone that holds the key to a hidden realm.",
  "The Magical Menagerie - Visit a zoo where the animals have special powers and magical abilities.",
  "The Time Traveler's Diary - Discover the diary of a time traveler and embark on adventures through different eras.",
  "The Haunted Carousel - Ride a magical carousel that brings legends and fairy tales to life.",
  "The Secret Garden of Wishes - Find a garden where every flower represents a child's wish waiting to come true.",
  "The Star Whisperer - Meet a young girl who can communicate with stars and learn their ancient stories.",
  "The Midnight Rescue - Join a group of friends on a daring rescue mission to save creatures trapped in a mysterious land.",
  "The Forest of Fairy Tales - Wander through a forest where every tree tells a different fairy tale.",
  "The Spellbound Castle - Explore a castle enchanted by powerful spells and hidden treasures.",
  "The Mermaid's Melody - Listen to the enchanting songs of mermaids that can calm storms and bring peace.",
  "The Phoenix's Flame - Discover the legend of the Phoenix and the magical flame that never dies.",
  "The Knight of Dreams - Follow a brave knight who battles nightmares to protect children's dreams.",
  "The Hidden Valley - Find a hidden valley filled with mythical creatures and untold wonders.",
  "The Astral Adventures - Travel through space on a ship that visits planets made of candy, music, and more.",
  "The Kingdom of Shadows - Defeat the shadows that threaten to overrun a magical kingdom.",
  "The Wandering Wizard - Follow a wandering wizard who grants wishes and solves riddles.",
  "The Secret of the Moonstone - Unlock the power of a moonstone to travel between realms.",
  "The Enchanted River - Journey down a river that flows through lands of ice, fire, and magic.",
  "The Star Catcher's Quest - Help a star catcher gather fallen stars to light up the sky.",
  "The Magical Mask - Wear a mask that lets you step into the lives of different storybook characters.",
  "The Phantom Knight - Unravel the mystery of a knight who appears only when the moon is full.",
  "The Wizard's Apprentice - Learn the secrets of magic with a young apprentice and their wise mentor.",
  "The Shadowland - Brave the land of shadows to find the light that will restore balance.",
  "The Golden Feather - Find the golden feather that grants the power of flight and adventure.",
  "The Dream Carousel - Ride a carousel that brings dreams to life with every turn.",
  "The Forest of Wonders - Discover the wonders hidden in a magical forest where anything is possible.",
  "The Moonlight Ball - Attend a grand ball where mythical creatures dance under the moonlight.",
  "The Lost Treasure of Lumina - Hunt for the lost treasure in the glowing city of Lumina.",
  "The Enchanted Lantern - Use a lantern that reveals hidden paths and secret worlds.",
  "The Stardust Expedition - Embark on an expedition to collect stardust and uncover cosmic secrets.",
  "The Talking Trees - Listen to the tales of wise old trees that have witnessed centuries of history.",
  "The Dream Keeper - Meet the guardian who keeps and protects the dreams of children.",
  "The Magical Quill - Write stories that come to life with a quill that holds ancient magic.",
  "The Starry Night Journey - Travel through a night sky filled with constellations that tell their own stories.",
];

export function CreateStoryForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [moral, setMoral] = useState("");
  const [language, setLanguage] = useState("english");
  const [ageGroup, setAgeGroup] = useState("");
  const [illustrationType, setIllustrationType] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = {
        title,
        moral,
        language,
        ageGroup,
        illustrationType,
        gender,
      };

      const createdStory = await createStory(formData);
      console.log("Story created with ID:", createdStory.id);

      toast.success("Story created successfully!");
      router.push(`/story/${createdStory.id}`);
    } catch (error: any) {
      console.error("Error creating story:", error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  function randomStoriesTitle() {
    const number = Math.floor(Math.random() * bedtimeStories.length);
    setTitle(bedtimeStories[number]);
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="flex w-full justify-between">
            <span>This story is about:</span>
            <span
              onClick={randomStoriesTitle}
              className="cursor-pointer p-1.5 bg-pink-900 text-pink-100 rounded-full text-primary-foreground"
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
          <Label htmlFor="moral">The moral of the story: (optional)</Label>
          <Textarea
            id="moral"
            placeholder="Describe the moral of the story"
            value={moral}
            cols={5}
            onChange={(e) => setMoral(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="language">Selct your preferred Language:</Label>
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
          <Label>Age Group:</Label>
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
          <Label>Illustration Type:</Label>
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
        <div className="space-y-2">
          <Label>Gender:</Label>
          <RadioGroup
            value={gender}
            onValueChange={(value) => setGender(value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="boy" id="gender-boy" />
              <Label htmlFor="gender-boy">Boy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="girl" id="gender-girl" />
              <Label htmlFor="gender-girl">Girl</Label>
            </div>
          </RadioGroup>
        </div>
        <Button
          className="w-full bg-pink-900 text-pink-100 hover:bg-pink-950  flex items-center"
          type="submit"
          disabled={loading}
        >
          <Loader
            size={16}
            className={`animate-spin ${loading ? "block" : "hidden"} mr-2`}
          />
          Submit
        </Button>
      </form>
    </div>
  );
}
