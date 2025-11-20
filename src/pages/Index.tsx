import { Camera, BookOpen, ShoppingCart, Search, ChefHat, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzMiAyIDIgNGMwIDItMiA0LTIgNHMtMi0yLTItNHptMC0zMGMwLTIgMi00IDItNHMyIDIgMiA0YzAgMi0yIDQtMiA0cy0yLTItMi00ek0wIDM0YzAtMiAyLTQgMi00czIgMiAyIDRjMCAyLTIgNC0yIDRzLTItMi0yLTR6bTAtMzBjMC0yIDItNCAyLTRzMiAyIDIgNGMwIDItMiA0LTIgNHMtMi0yLTItNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
        <div className="container mx-auto px-4 py-16 sm:py-24 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 bg-primary-foreground/10 rounded-full mb-6">
              <ChefHat className="h-8 w-8" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Personal
              <br />
              Cooking Companion
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-primary-foreground/90">
              From ingredients to delicious dishes. Scan, discover, cook, and enjoy – all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate('/scanner')}
                className="gap-2 text-lg"
              >
                <Camera className="h-5 w-5" />
                Scan Ingredients
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/recipes')}
                className="gap-2 text-lg bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20"
              >
                <Search className="h-5 w-5" />
                Browse Recipes
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything You Need to Cook</h2>
          <p className="text-lg text-muted-foreground">
            Powerful features to make cooking easier and more enjoyable
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            className="border-border hover:shadow-soft transition-all duration-300 cursor-pointer group"
            onClick={() => navigate('/scanner')}
          >
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                <Camera className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Scanner</h3>
              <p className="text-muted-foreground">
                Scan your fridge or add ingredients manually for instant recipe suggestions
              </p>
            </CardContent>
          </Card>

          <Card
            className="border-border hover:shadow-soft transition-all duration-300 cursor-pointer group"
            onClick={() => navigate('/recipes')}
          >
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 text-secondary mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Suggestions</h3>
              <p className="text-muted-foreground">
                Get personalized recipe recommendations based on what you have
              </p>
            </CardContent>
          </Card>

          <Card
            className="border-border hover:shadow-soft transition-all duration-300 cursor-pointer group"
            onClick={() => navigate('/library')}
          >
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Recipe Library</h3>
              <p className="text-muted-foreground">
                Save and organize your favorite recipes like a digital cookbook
              </p>
            </CardContent>
          </Card>

          <Card
            className="border-border hover:shadow-soft transition-all duration-300 cursor-pointer group"
            onClick={() => navigate('/grocery-list')}
          >
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                <ShoppingCart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Lists</h3>
              <p className="text-muted-foreground">
                Auto-generate shopping lists from recipes and share with ease
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <Card className="border-border bg-gradient-card overflow-hidden">
          <CardContent className="p-8 sm:p-12 text-center">
            <ChefHat className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Start Cooking?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Turn your ingredients into delicious meals with AI-powered suggestions
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/scanner')}
              className="gap-2"
            >
              <Camera className="h-5 w-5" />
              Get Started Now
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
