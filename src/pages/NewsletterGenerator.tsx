"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { showSuccess } from "@/utils/toast";

type Palette = {
  name: string;
  bg: string;
  text: string;
};

const PALETTES: Palette[] = [
  { name: "Red", bg: "bg-red-100", text: "text-red-800" },
  { name: "Green", bg: "bg-green-100", text: "text-green-800" },
  { name: "Blue", bg: "bg-blue-100", text: "text-blue-800" },
  { name: "Gold", bg: "bg-yellow-100", text: "text-yellow-800" },
];

const greetings = [
  "Merry Christmas!",
  "Season’s Greetings!",
  "Happy Holidays!",
  "Joyful Christmas Wishes!",
  "Warm Holiday Wishes!",
];

const bodies = [
  "We hope this season fills your heart with joy and your home with love.",
  "May your holidays sparkle with moments of love, laughter, and goodwill.",
  "Wishing you a festive holiday season and a prosperous New Year.",
  "May the magic of Christmas bring you peace, happiness, and unforgettable moments.",
  "Here's to a wonderful holiday season surrounded by friends and family.",
];

const closings = [
  "Cheers, the Team",
  "Warm regards, Your Friends",
  "With holiday love, The Crew",
  "Merry wishes, The Team",
  "Happy Holidays, Everyone",
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Generate a random newsletter JSX based on the selected palette */
function generateNewsletter(palette: Palette) {
  const headerStyle = randomItem([
    "text-3xl font-bold",
    "text-4xl font-extrabold",
    "text-2xl font-semibold",
  ]);
  const bodyStyle = randomItem(["text-base", "text-lg", "text-sm"]);
  const accentClass = randomItem([
    "border-l-4 border-gray-300 pl-4",
    "shadow-md",
    "rounded-lg",
  ]);

  const greeting = randomItem(greetings);
  const body = randomItem(bodies);
  const closing = randomItem(closings);

  return (
    <Card className={`${palette.bg} ${palette.text} ${accentClass} p-6`}>
      <CardHeader>
        <CardTitle className={headerStyle}>{greeting}</CardTitle>
      </CardHeader>
      <CardContent className={bodyStyle}>
        <p className="mb-4">{body}</p>
        <p className="font-medium">{closing}</p>
      </CardContent>
    </Card>
  );
}

const NewsletterGenerator = () => {
  const [selectedPalette, setSelectedPalette] = useState<Palette>(PALETTES[0]);
  const [newsletter, setNewsletter] = useState<React.ReactNode>(null);

  const handleGenerate = () => {
    setNewsletter(generateNewsletter(selectedPalette));
  };

  const handleRandomPalette = () => {
    const randomPal = randomItem(PALETTES);
    setSelectedPalette(randomPal);
    setNewsletter(generateNewsletter(randomPal));
  };

  const handleCopy = async () => {
    if (!newsletter) return;
    const container = document.createElement("div");
    // Render the newsletter React node to static HTML
    // This is a simple approach: use innerHTML from the rendered element
    // Since the newsletter node is already rendered in the DOM, we can
    // copy its outerHTML directly.
    const preview = document.querySelector("#newsletter-preview");
    if (preview) {
      await navigator.clipboard.writeText(preview.innerHTML);
      showSuccess("Newsletter copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        🎄 Merry Christmas Newsletter Generator 🎁
      </h1>

      <div className="max-w-xl mx-auto space-y-6">
        <div className="flex gap-2">
          <Select
            value={selectedPalette.name}
            onValueChange={(value) => {
              const pal = PALETTES.find((p) => p.name === value);
              if (pal) setSelectedPalette(pal);
            }}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select color palette" />
            </SelectTrigger>
            <SelectContent>
              {PALETTES.map((pal) => (
                <SelectItem key={pal.name} value={pal.name}>
                  {pal.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={handleRandomPalette}>
            Random Palette
          </Button>
        </div>

        <Button className="w-full" onClick={handleGenerate}>
          Generate Newsletter
        </Button>

        {newsletter && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Your Newsletter Preview
            </h2>
            <div id="newsletter-preview" className="space-y-4">
              {newsletter}
            </div>

            <Button
              variant="secondary"
              className="mt-4 w-full"
              onClick={handleCopy}
            >
              Copy HTML to Clipboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterGenerator;