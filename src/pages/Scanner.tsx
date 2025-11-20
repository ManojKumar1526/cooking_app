import { useState } from "react";
import { Camera, Plus, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Scanner = () => {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addIngredient = () => {
    if (inputValue.trim()) {
      setIngredients([...ingredients, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleFindRecipes = () => {
    navigate('/recipes', { state: { ingredients } });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-card border-b border-border backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Scan Ingredients</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          {/* Camera Scan Section */}
          <div className="relative aspect-video bg-gradient-card rounded-2xl border-2 border-dashed border-border overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <Camera className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Scan Your Fridge</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Use your camera to detect ingredients automatically
              </p>
              <Button variant="default" size="lg">
                <Camera className="h-5 w-5 mr-2" />
                Start Camera
              </Button>
            </div>
          </div>

          {/* Manual Input Section */}
          <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
            <h3 className="text-lg font-semibold mb-4">Add Manually</h3>
            <div className="flex gap-2">
              <Input
                placeholder="Enter ingredient name..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
                className="flex-1"
              />
              <Button onClick={addIngredient} size="icon">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Ingredients List */}
          {ingredients.length > 0 && (
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
              <h3 className="text-lg font-semibold mb-4">
                Your Ingredients ({ingredients.length})
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {ingredients.map((ingredient, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-sm py-2 px-4 cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                    onClick={() => removeIngredient(index)}
                  >
                    {ingredient} ×
                  </Badge>
                ))}
              </div>
              <Button
                onClick={handleFindRecipes}
                className="w-full"
                size="lg"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Find Recipe Suggestions
              </Button>
            </div>
          )}

          {/* Empty State */}
          {ingredients.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>Add ingredients to get recipe suggestions</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Scanner;
