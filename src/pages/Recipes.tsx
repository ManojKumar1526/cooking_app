import { useState, useEffect } from "react";
import { ArrowLeft, Search, Filter, Heart, Clock, Users, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface Recipe {
  id: number;
  title: string;
  image: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  matchScore: number;
  missingIngredients?: string[];
  isSaved?: boolean;
}

const mockRecipes: Recipe[] = [
  {
    id: 1,
    title: "Classic Pasta Carbonara",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&h=600&fit=crop",
    cookTime: "25 min",
    servings: 4,
    difficulty: "Easy",
    matchScore: 95,
    missingIngredients: ["Parmesan"],
    isSaved: false
  },
  {
    id: 2,
    title: "Mediterranean Grilled Chicken",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&h=600&fit=crop",
    cookTime: "35 min",
    servings: 4,
    difficulty: "Medium",
    matchScore: 88,
    missingIngredients: ["Olives", "Feta"],
    isSaved: false
  },
  {
    id: 3,
    title: "Fresh Garden Salad Bowl",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
    cookTime: "15 min",
    servings: 2,
    difficulty: "Easy",
    matchScore: 100,
    isSaved: true
  },
  {
    id: 4,
    title: "Homemade Margherita Pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop",
    cookTime: "40 min",
    servings: 4,
    difficulty: "Medium",
    matchScore: 82,
    missingIngredients: ["Mozzarella", "Basil"],
    isSaved: false
  },
];

const Recipes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);
  const [searchQuery, setSearchQuery] = useState("");
  const ingredients = location.state?.ingredients || [];

  const toggleSave = (id: number) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === id ? { ...recipe, isSaved: !recipe.isSaved } : recipe
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-card border-b border-border backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold flex-1">Recipe Suggestions</h1>
            <Button variant="ghost" size="icon">
              <Filter className="h-5 w-5" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {ingredients.length > 0 && (
          <div className="mb-6 p-4 bg-muted/50 rounded-xl">
            <p className="text-sm text-muted-foreground mb-2">Based on your ingredients:</p>
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {ingredient}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          {recipes.map((recipe) => (
            <Card
              key={recipe.id}
              className="overflow-hidden cursor-pointer hover:shadow-soft transition-all duration-300 border-border"
              onClick={() => navigate(`/recipe/${recipe.id}`, { state: { recipe } })}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Badge className="bg-primary/90 backdrop-blur-sm">
                    {recipe.matchScore}% Match
                  </Badge>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-card/90 backdrop-blur-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave(recipe.id);
                    }}
                  >
                    <Heart className={`h-4 w-4 ${recipe.isSaved ? 'fill-primary text-primary' : ''}`} />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-3">{recipe.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {recipe.cookTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {recipe.servings}
                  </span>
                  <span className="flex items-center gap-1">
                    <ChefHat className="h-4 w-4" />
                    {recipe.difficulty}
                  </span>
                </div>
                {recipe.missingIngredients && recipe.missingIngredients.length > 0 && (
                  <div className="pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-1">Missing:</p>
                    <div className="flex flex-wrap gap-1">
                      {recipe.missingIngredients.map((ing, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {ing}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Recipes;
