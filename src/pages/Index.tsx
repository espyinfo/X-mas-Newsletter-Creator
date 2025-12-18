import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Mail, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
            Christmas Newsletter Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create beautiful, festive newsletters in seconds. Perfect for holiday greetings to your customers, friends, and family.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-red-100 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Gift className="h-10 w-10 text-red-500 mb-2" />
              <CardTitle>Festive Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Beautiful holiday-themed designs with snowflakes, ornaments, and festive colors.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Mail className="h-10 w-10 text-green-500 mb-2" />
              <CardTitle>Multilingual</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Create newsletters in multiple languages including English, Spanish, French, German, and Italian.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Sparkles className="h-10 w-10 text-blue-500 mb-2" />
              <CardTitle>Easy Customization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Customize colors, fonts, and styles to match your brand or personal preferences.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center py-8">
          <Link to="/newsletter">
            <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-red-500 to-green-600 hover:from-red-600 hover:to-green-700">
              Create Your Christmas Newsletter
            </Button>
          </Link>
          <p className="mt-4 text-gray-500">
            No signup required - start creating instantly!
          </p>
        </div>

        {/* Preview */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Preview</h2>
          <div className="bg-gradient-to-br from-red-500 to-green-500 rounded-xl p-8 text-white text-center max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Season's Greetings!</h3>
            <p className="mb-6 text-lg">
              Wishing you a holiday season filled with warmth, joy, and festive cheer.
            </p>
            <p className="font-medium">The Team</p>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;