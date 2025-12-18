"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Copy, Sparkles, Palette, Type, Languages } from "lucide-react";
import { showSuccess } from "@/utils/toast";

/* ---------- Types ---------- */
type Palette = {
  bg: string; // background hex
  text: string; // text hex
  opacity: number; // 0‑1 background opacity
};

type Language = "en" | "es" | "fr" | "de" | "it";

type FontOption = "Roboto" | "Helvetica" | "Lato" | "Georgia" | "Arial" | "Times New Roman";

type ChapterStyleOption = "Normal" | "Bold" | "Italic" | "Underline";

type ChristmasElement = {
  id: number;
  type: "snowflake" | "ornament" | "star";
  left: number;
  top: number;
  size: number;
  speed: number;
  opacity: number;
};

/* ---------- Language Data ---------- */
const LANGUAGES: { code: Language; name: string }[] = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
];

const FONT_OPTIONS: FontOption[] = ["Roboto", "Helvetica", "Lato", "Georgia", "Arial", "Times New Roman"];

const CHAPTER_STYLES: Record<ChapterStyleOption, string> = {
  Normal: "",
  Bold: "font-bold",
  Italic: "italic",
  Underline: "underline",
};

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
      "Con affetto natale, il Team",
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

/* Generate random Christmas elements */
function generateChristmasElements(count: number): ChristmasElement[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    type: randomItem(["snowflake", "ornament", "star"] as const),
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 20 + 10,
    speed: Math.random() * 3 + 1,
    opacity: Math.random() * 0.7 + 0.3,
  }));
}

/* ---------- Generate Newsletter ---------- */
function generateNewsletter(
  palette: Palette,
  language: Language,
  accentClass: string,
  chapterStyle: string,
  showElements: boolean,
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

  // Generate Christmas elements if enabled
  const christmasElements = showElements ? generateChristmasElements(15) : [];

  return (
    <div className="relative w-full">
      {/* Animated Christmas Elements */}
      {showElements && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {christmasElements.map((element) => (
            <div
              key={element.id}
              className={`absolute animate-float-${element.type}`}
              style={{
                left: `${element.left}%`,
                top: `${element.top}%`,
                fontSize: `${element.size}px`,
                opacity: element.opacity,
                animationDuration: `${element.speed * 5}s`,
              }}
            >
              {element.type === "snowflake" && "❄"}
              {element.type === "ornament" && "🔴"}
              {element.type === "star" && "⭐"}
            </div>
          ))}
        </div>
      )}
      
      <Card
        className={`${accentClass} p-6 border-0 shadow-lg relative z-10`}
        style={{ backgroundColor: bgRgba, color: palette.text }}
      >
        <CardHeader className="p-0 mb-4">
          <CardTitle className={`${headerStyle} ${chapterStyle}`}>{greeting}</CardTitle>
        </CardHeader>
        <CardContent className={`p-0 ${bodyStyle}`}>
          <p className={`mb-4 ${chapterStyle}`}>{body}</p>
          <p className={`font-medium ${chapterStyle}`}>{closing}</p>
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------- Main Component ---------- */
const NewsletterGenerator = () => {
  const [bgHex, setBgHex] = useState<string>("#ffffff");
  const [textHex, setTextHex] = useState<string>("#000000");
  const [bgOpacity, setBgOpacity] = useState<number>(1);
  const [language, setLanguage] = useState<Language>("en");
  const [font, setFont] = useState<FontOption>("Roboto");
  const [chapterStyle, setChapterStyle] = useState<ChapterStyleOption>("Normal");
  const [showElements, setShowElements] = useState<boolean>(true);
  const [newsletter, setNewsletter] = useState<React.ReactNode>(null);

  const handleGenerate = () => {
    const palette = { bg: bgHex, text: textHex, opacity: bgOpacity };
    const accentClass = randomItem([
      "border-l-4 border-red-500 pl-4",
      "border-2 border-dashed border-green-500",
      "shadow-lg rounded-xl",
      "bg-white/30 backdrop-blur-sm",
    ]);
    setNewsletter(
      generateNewsletter(palette, language, accentClass, CHAPTER_STYLES[chapterStyle], showElements)
    );
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
      "border-l-4 border-red-500 pl-4",
      "border-2 border-dashed border-green-500",
      "shadow-lg rounded-xl",
      "bg-white/30 backdrop-blur-sm",
    ]);
    setNewsletter(
      generateNewsletter(palette, language, accentClass, CHAPTER_STYLES[chapterStyle], showElements)
    );
  };

  const handleCopy = async () => {
    if (!newsletter) return;
    const preview = document.querySelector("#newsletter-preview");
    if (!preview) return;

    // Wrap copied HTML with selected font
    const htmlToCopy = `<div style="font-family: ${font}, sans-serif;">${preview.innerHTML}</div>`;
    await navigator.clipboard.writeText(htmlToCopy);
    showSuccess(`Newsletter copied with ${font} font!`);
  };

  // Add CSS for animations
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float-snowflake {
        0% { transform: translateY(0) translateX(0); opacity: 0.7; }
        50% { transform: translateY(-20px) translateX(10px); }
        100% { transform: translateY(-100px) translateX(-10px); opacity: 0; }
      }
      
      @keyframes float-ornament {
        0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
        50% { transform: translateY(-30px) rotate(180deg); }
        100% { transform: translateY(-120px) rotate(360deg); opacity: 0; }
      }
      
      @keyframes float-star {
        0% { transform: translateY(0) scale(1); opacity: 0.7; }
        50% { transform: translateY(-25px) scale(1.2); }
        100% { transform: translateY(-110px) scale(0.8); opacity: 0; }
      }
      
      .animate-float-snowflake {
        animation: float-snowflake linear infinite;
      }
      
      .animate-float-ornament {
        animation: float-ornament linear infinite;
      }
      
      .animate-float-star {
        animation: float-star linear infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent mb-4">
            🎄 Christmas Newsletter Generator 🎁
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create beautiful, festive newsletters in seconds. Customize colors, fonts, and content to match your style.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <Card className="lg:col-span-1 bg-white/80 backdrop-blur-sm border-red-100 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-red-500" />
                Customization Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="language" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="language" className="flex items-center gap-2">
                    <Languages className="h-4 w-4" />
                    <span className="hidden sm:inline">Language</span>
                  </TabsTrigger>
                  <TabsTrigger value="style" className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    <span className="hidden sm:inline">Style</span>
                  </TabsTrigger>
                  <TabsTrigger value="font" className="flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    <span className="hidden sm:inline">Font</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="language" className="space-y-4 mt-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Select Language</Label>
                    <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
                      <SelectTrigger>
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
                  </div>
                  
                  <div className="pt-4">
                    <Label className="text-sm font-medium mb-2 block">Chapter Style</Label>
                    <Select
                      value={chapterStyle}
                      onValueChange={(v) => setChapterStyle(v as ChapterStyleOption)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(CHAPTER_STYLES).map((style) => (
                          <SelectItem key={style} value={style}>
                            {style}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
                
                <TabsContent value="style" className="space-y-4 mt-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Background Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={bgHex}
                        onChange={(e) => setBgHex(e.target.value)}
                        className="w-16 h-10 p-1 cursor-pointer"
                        aria-label="Background color"
                      />
                      <Input
                        type="text"
                        value={bgHex}
                        onChange={(e) => setBgHex(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Text Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={textHex}
                        onChange={(e) => setTextHex(e.target.value)}
                        className="w-16 h-10 p-1 cursor-pointer"
                        aria-label="Text color"
                      />
                      <Input
                        type="text"
                        value={textHex}
                        onChange={(e) => setTextHex(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Background Opacity: {Math.round(bgOpacity * 100)}%
                    </Label>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[bgOpacity * 100]}
                      onValueChange={(value) => setBgOpacity(value[0] / 100)}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <input
                      type="checkbox"
                      id="show-elements"
                      checked={showElements}
                      onChange={(e) => setShowElements(e.target.checked)}
                      className="h-4 w-4 text-red-600 rounded"
                    />
                    <Label htmlFor="show-elements" className="text-sm font-medium">
                      Show Christmas Elements
                    </Label>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleRandomPalette}
                    className="w-full border-red-200 text-red-600 hover:bg-red-50"
                  >
                    Randomize Colors
                  </Button>
                </TabsContent>
                
                <TabsContent value="font" className="space-y-4 mt-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Select Font</Label>
                    <Select value={font} onValueChange={(v) => setFont(v as FontOption)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        {FONT_OPTIONS.map((f) => (
                          <SelectItem key={f} value={f} style={{ fontFamily: f }}>
                            {f}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="pt-4">
                    <Label className="text-sm font-medium mb-2 block">Preview</Label>
                    <div 
                      className="p-4 rounded-lg border bg-white"
                      style={{ fontFamily: font }}
                    >
                      <p className="text-sm">This is how your font will look in the newsletter.</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <Separator />
              
              <Button 
                className="w-full bg-gradient-to-r from-red-500 to-green-600 hover:from-red-600 hover:to-green-700"
                onClick={handleGenerate}
              >
                Generate Newsletter
              </Button>
            </CardContent>
          </Card>
          
          {/* Preview Panel */}
          <div className="lg:col-span-2">
            <Card className="h-full bg-white/80 backdrop-blur-sm border-green-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-green-500" />
                    Newsletter Preview
                  </span>
                  {newsletter && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleCopy}
                      className="flex items-center gap-2 border-green-200 text-green-600 hover:bg-green-50"
                    >
                      <Copy className="h-4 w-4" />
                      Copy HTML
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {newsletter ? (
                  <div className="space-y-6">
                    <div
                      id="newsletter-container"
                      className="rounded-xl p-6 bg-[url('/snowflakes.png')] bg-repeat bg-cover bg-center min-h-[400px] flex items-center justify-center relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/20 rounded-xl" />
                      <div
                        id="newsletter-preview"
                        className="relative z-10 w-full max-w-2xl"
                        style={{ fontFamily: `${font}, sans-serif` }}
                      >
                        {newsletter}
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <h3 className="font-medium text-blue-800 mb-2">How to use:</h3>
                      <p className="text-sm text-blue-700">
                        Click "Copy HTML" to copy the newsletter code. You can then paste it into your email marketing tool, 
                        website, or CMS. The styling will be preserved when you paste it.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-96 text-center p-8 bg-gradient-to-br from-red-50 to-green-50 rounded-xl border-2 border-dashed border-gray-200">
                    <Sparkles className="h-12 w-12 text-red-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Your Newsletter Awaits</h3>
                    <p className="text-gray-500 max-w-md">
                      Customize your options and click "Generate Newsletter" to create your festive holiday message.
                    </p>
                    <Badge variant="secondary" className="mt-4">
                      Pro Tip: Try the random color button for festive combinations!
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterGenerator;