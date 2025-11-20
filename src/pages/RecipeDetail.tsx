import { useState } from "react";
import { ArrowLeft, Heart, Share2, Clock, Users, ChefHat, Timer, ShoppingCart, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface RecipeStep {
  step: number;
  instruction: string;
  duration?: number;
  timerActive?: boolean;
}

const mockSteps: RecipeStep[] = [
  { step: 1, instruction: "Bring a large pot of salted water to boil", duration: 10 },
  { step: 2, instruction: "Cook pasta according to package directions until al dente", duration: 12 },
  { step: 3, instruction: "While pasta cooks, whisk eggs with grated Parmesan cheese" },
  { step: 4, instruction: "Cook pancetta or bacon in a large skillet until crispy", duration: 8 },
  { step: 5, instruction: "Drain pasta, reserving 1 cup pasta water" },
  { step: 6, instruction: "Add hot pasta to skillet with pancetta, toss well" },
  { step: 7, instruction: "Remove from heat, quickly stir in egg mixture, adding pasta water to create creamy sauce" },
  { step: 8, instruction: "Season with black pepper and serve immediately with extra Parmesan" },
];

const mockIngredients = [
  { name: "Spaghetti", amount: "400g", checked: false },
  { name: "Eggs", amount: "4 large", checked: false },
  { name: "Parmesan cheese", amount: "100g, grated", checked: false },
  { name: "Pancetta or bacon", amount: "150g, diced", checked: false },
  { name: "Black pepper", amount: "to taste", checked: false },
  { name: "Salt", amount: "for pasta water", checked: false },
];

const RecipeDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const recipe = location.state?.recipe;
  const [isSaved, setIsSaved] = useState(recipe?.isSaved || false);
  const [steps, setSteps] = useState(mockSteps);
  const [ingredients, setIngredients] = useState(mockIngredients);
  const [activeTimer, setActiveTimer] = useState<number | null>(null);

  const startTimer = (stepNumber: number, duration: number) => {
    setActiveTimer(stepNumber);
    toast.success(`Timer started: ${duration} minutes`, {
      description: `Step ${stepNumber} timer is now running`,
    });
  };

  const toggleIngredient = (index: number) => {
    setIngredients(ingredients.map((ing, i) => 
      i === index ? { ...ing, checked: !ing.checked } : ing
    ));
  };

  const addToGroceryList = () => {
    const uncheckedItems = ingredients.filter(ing => !ing.checked);
    toast.success("Added to grocery list", {
      description: `${uncheckedItems.length} items added`,
    });
    navigate('/grocery-list', { state: { items: uncheckedItems } });
  };

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Recipe not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Image */}
      <div className="relative h-64 sm:h-80">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 left-4 rounded-full bg-card/90 backdrop-blur-sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-card/90 backdrop-blur-sm"
            onClick={() => setIsSaved(!isSaved)}
          >
            <Heart className={`h-5 w-5 ${isSaved ? 'fill-primary text-primary' : ''}`} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-card/90 backdrop-blur-sm"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <main className="container mx-auto px-4 -mt-6 max-w-4xl">
        {/* Title Card */}
        <Card className="mb-6 shadow-soft border-border">
          <CardContent className="p-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">{recipe.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                {recipe.cookTime}
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-secondary" />
                {recipe.servings} servings
              </span>
              <span className="flex items-center gap-2">
                <ChefHat className="h-4 w-4 text-accent" />
                {recipe.difficulty}
              </span>
              <Badge className="ml-auto">{recipe.matchScore}% Match</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="ingredients" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="steps">Instructions</TabsTrigger>
          </TabsList>

          <TabsContent value="ingredients" className="space-y-4">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Ingredients</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addToGroceryList}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to List
                  </Button>
                </div>
                <div className="space-y-3">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <Checkbox
                        checked={ingredient.checked}
                        onCheckedChange={() => toggleIngredient(index)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <p className={`${ingredient.checked ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                          {ingredient.name}
                        </p>
                        <p className="text-sm text-muted-foreground">{ingredient.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="steps" className="space-y-4">
            {steps.map((step) => (
              <Card key={step.step} className="border-border hover:shadow-card transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-bold">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground mb-3">{step.instruction}</p>
                      {step.duration && (
                        <Button
                          variant={activeTimer === step.step ? "default" : "outline"}
                          size="sm"
                          onClick={() => startTimer(step.step, step.duration!)}
                          className="gap-2"
                        >
                          {activeTimer === step.step ? (
                            <>
                              <Pause className="h-4 w-4" />
                              Timer Running
                            </>
                          ) : (
                            <>
                              <Timer className="h-4 w-4" />
                              Set {step.duration} min timer
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default RecipeDetail;
