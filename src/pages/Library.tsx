import { useState } from "react";
import { ArrowLeft, Search, Heart, Plus, BookOpen, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SavedRecipe {
  id: number;
  title: string;
  image: string;
  cookTime: string;
  difficulty: string;
  category: string;
}

const savedRecipes: SavedRecipe[] = [
  {
    id: 1,
    title: "Classic Pasta Carbonara",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&h=600&fit=crop",
    cookTime: "25 min",
    difficulty: "Easy",
    category: "Italian"
  },
  {
    id: 3,
    title: "Fresh Garden Salad Bowl",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
    cookTime: "15 min",
    difficulty: "Easy",
    category: "Healthy"
  },
];

const Library = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("saved");

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-card border-b border-border backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold flex-1">My Recipe Library</h1>
            <Button variant="ghost" size="icon">
              <Filter className="h-5 w-5" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="saved" className="gap-2">
              <Heart className="h-4 w-4" />
              Saved
            </TabsTrigger>
            <TabsTrigger value="imported" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Imported
            </TabsTrigger>
          </TabsList>

          <TabsContent value="saved" className="space-y-4">
            {savedRecipes.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No saved recipes yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start saving your favorite recipes to see them here
                </p>
                <Button onClick={() => navigate('/recipes')}>
                  Browse Recipes
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {savedRecipes.map((recipe) => (
                  <Card
                    key={recipe.id}
                    className="overflow-hidden cursor-pointer hover:shadow-soft transition-all duration-300 border-border"
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{recipe.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{recipe.cookTime}</span>
                        <span>•</span>
                        <span>{recipe.difficulty}</span>
                        <span>•</span>
                        <span>{recipe.category}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="imported" className="space-y-4">
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Import your recipes</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add recipes from websites, cookbooks, or family collections
              </p>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Import Recipe
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Library;
