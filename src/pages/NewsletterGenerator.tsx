"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { showSuccess } from "@/utils/toast";

/* ---------- Types ---------- */
type Palette = {
  bg: string; // background hex
  text: string; // text hex
  opacity: number; // 0‑1 background opacity
};

type Language = "en" | "es" | "fr" | "de" | "it";

/* ---------- Language Data ---------- */
const LANGUAGES: { code: Language; name: string }[] = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
];

const TRANSLATIONS: Record<
  Language,
  {
    greetings: string[];
    bodies: string[];
    closings: string[];
  }
> = {
  en: {
    greetings: [
      "Merry Christmas!",
      "Season’s Greetings!",
      "Happy Holidays!",
      "Joyful Christmas Wishes!",
      "Warm Holiday Wishes!",
    ],
    bodies: [
      "We hope this season fills your heart with joy and your home with love.",
      "May your holidays sparkle with moments of love, laughter, and goodwill.",
      "Wishing you a festive holiday season and a prosperous New Year.",
      "May the magic of Christmas bring you peace, happiness, and unforgettable moments.",
      "Here's to a wonderful holiday season surrounded by friends and family.",
    ],
    closings: [
      "Cheers, the Team",
      "Warm regards, Your Friends",
      "With holiday love, The Crew",
      "Merry wishes, The Team",
      "Happy Holidays, Everyone",
    ],
  },
  es: {
    greetings: [
      "¡Feliz Navidad!",
      "¡Felices fiestas!",
      "¡Felices vacaciones!",
      "¡Deseos navideños alegres!",
      "¡Los mejores deseos de la temporada!",
    ],
    bodies: [
      "Esperamos que esta época llene tu corazón de alegría y tu hogar de amor.",
      "Que tus fiestas brillen con momentos de amor, risas y buena voluntad.",
      "Te deseamos una temporada festiva y un próspero Año Nuevo.",
      "Que la magia de la Navidad te traiga paz, felicidad y momentos inolvidables.",
      "Brindamos por una maravillosa temporada rodeada de amigos y familia.",
    ],
    closings: [
      "¡Salud, el equipo!",
      "Saludos cordiales, tus amigos",
      "Con amor navideño, el equipo",
      "¡Deseos festivos, el equipo!",
      "¡Felices fiestas a todos!",
    ],
  },
  fr: {
    greetings: [
      "Joyeux Noël !",
      "Bonnes fêtes !",
      "Bonnes vacances !",
      "Vœux de Noël joyeux !",
      "Chaleureux vœux de saison !",
    ],
    bodies: [
      "Nous espérons que cette saison remplira votre cœur de joie et votre maison d'amour.",
      "Que vos fêtes brillent de moments d'amour, de rire et de bonne volonté.",
      "Nous vous souhaitons une saison festive et une nouvelle année prospère.",
      "Que la magie de Noël vous apporte paix, bonheur et moments inoubliables.",
      "À une merveilleuse saison entourée d'amis et de famille.",
    ],
    closings: [
      "Santé, l'équipe",
      "Cordialement, vos amis",
      "Avec amour de Noël, l'équipe",
      "Joyeuses fêtes, l'équipe",
      "Bonnes vacances à tous",
    ],
  },
  de: {
    greetings: [
      "Frohe Weihnachten!",
      "Season’s Greetings!",
      "Frohe Feiertage!",
      "Freudige Weihnachtswünsche!",
      "Warme Festtagswünsche!",
    ],
    bodies: [
      "Wir hoffen, dass diese Saison Ihr Herz mit Freude und Ihr Zuhause mit Liebe füllt.",
      "Mögen Ihre Feiertage mit Momenten von Liebe, Lachen und Wohlwollen funkeln.",
      "Wir wünschen Ihnen eine festliche Saison und ein erfolgreiches neues Jahr.",
      "Möge die Magie von Weihnachten Ihnen Frieden, Glück und unvergessliche Momente bringen.",
      "Auf eine wunderbare Feiertagssaison im Kreise von Freunden und Familie.",
    ],
    closings: [
      "Prost, das Team",
      "Herzliche Grüße, eure Freunde",
      "Mit weihnachtlicher Liebe, das Team",
      "Frohe Wünsche, das Team",
      "Frohe Feiertage, alle",
    ],
  },
  it: {
    greetings: [
      "Buon Natale!",
      "Auguri di Buone Feste!",
      "Felici Festività!",
      "Tanti Auguri di Natale!",
      "Caldi Auguri Natalizi!",
    ],
    bodies: [
      "Speriamo che questa stagione riempia il tuo cuore di gioia e la tua casa di amore.",
      "Che le tue feste scintillino di momenti d'amore, risate e buona volontà.",
      "Ti auguriamo una stagione festiva e un prospero Anno Nuovo.",
      "Che la magia del Natale ti porti pace, felicità e momenti indimenticabili.",
      "Un brindisi a una meravigliosa stagione natalizia circondata da amici e familiari.",
    ],
    closings: [
      "Saluti, il Team",
      "Cordiali saluti, i vostri amici",
      "Con affetto natalizio, il Team",
      "Auguri, il Team",
      "Felici Festività a tutti",
    ],
  },
};

/* ---------- Helper ---------- */
function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* Convert hex + opacity to rgba string */
function hexToRgba(hex: string, opacity: number): string {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/* ---------- Generate Newsletter ---------- */
function generateNewsletter(
  palette: Palette,
  language: Language,
  accentClass: string,
) {
  const { greetings, bodies, closings } = TRANSLATIONS[language];

  const headerStyle = randomItem([
    "text-3xl font-bold",
    "text-4xl font-extrabold",
    "text-2xl font-semibold",
  ]);
  const bodyStyle = randomItem(["text-base", "text-lg", "text-sm"]);

  const greeting = randomItem(greetings);
  const body = randomItem(bodies);
  const closing = randomItem(closings);

  const bgRgba = hexToRgba(palette.bg, palette.opacity);

  return (
    <Card
      className={`${accentClass} p-6`}
      style={{ backgroundColor: bgRgba, color: palette.text }}
    >
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

/* ---------- Main Component ---------- */
const NewsletterGenerator = () => {
  const [bgHex, setBgHex] = useState<string>("#ffffff");
  const [textHex, setTextHex] = useState<string>("#000000");
  const [bgOpacity, setBgOpacity] = useState<number>(1);
  const [language, setLanguage] = useState<Language>("en");
  const [newsletter, setNewsletter] = useState<React.ReactNode>(null);

  const handleGenerate = () => {
    const palette = { bg: bgHex, text: textHex, opacity: bgOpacity };
    const accentClass = randomItem([
      "border-l-4 border-gray-300 pl-4",
      "shadow-md",
      "rounded-lg",
    ]);
    setNewsletter(generateNewsletter(palette, language, accentClass));
  };

  const handleRandomPalette = () => {
    const randomBg = `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")}`;
    const randomText = `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")}`;
    const randomOpacity = Math.random().toFixed(2);
    setBgHex(randomBg);
    setTextHex(randomText);
    setBgOpacity(parseFloat(randomOpacity));
    const palette = {
      bg: randomBg,
      text: randomText,
      opacity: parseFloat(randomOpacity),
    };
    const accentClass = randomItem([
      "border-l-4 border-gray-300 pl-4",
      "shadow-md",
      "rounded-lg",
    ]);
    setNewsletter(generateNewsletter(palette, language, accentClass));
  };

  const handleCopy = async () => {
    if (!newsletter) return;
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
        {/* Language selector */}
        <Select
          value={language}
          onValueChange={(v) => setLanguage(v as Language)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Hex color inputs */}
        <div className="flex gap-2 items-center">
          <Input
            type="color"
            value={bgHex}
            onChange={(e) => setBgHex(e.target.value)}
            aria-label="Background color"
          />
          <Input
            type="color"
            value={textHex}
            onChange={(e) => setTextHex(e.target.value)}
            aria-label="Text color"
          />
          <Button variant="outline" onClick={handleRandomPalette}>
            Random Palette
          </Button>
        </div>

        {/* Opacity slider */}
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium w-24">
            Background opacity
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={bgOpacity * 100}
            onChange={(e) => setBgOpacity(parseInt(e.target.value) / 100)}
            className="flex-1"
          />
          <span className="w-12 text-right">
            {Math.round(bgOpacity * 100)}%
          </span>
        </div>

        <Button className="w-full" onClick={handleGenerate}>
          Generate Newsletter
        </Button>

        {newsletter && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Your Newsletter Preview
            </h2>

            {/* Snowflake background wrapper */}
            <div
              id="newsletter-container"
              className="relative rounded-lg p-4 bg-[url('/snowflakes.png')] bg-repeat bg-cover bg-center"
            >
              {/* Light overlay for readability (30% opacity) */}
              <div className="absolute inset-0 bg-white/30 rounded-lg" />
              <div
                id="newsletter-preview"
                className="relative z-10 space-y-4"
              >
                {newsletter}
              </div>
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