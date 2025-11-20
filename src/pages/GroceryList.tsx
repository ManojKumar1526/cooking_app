import { useState } from "react";
import { ArrowLeft, Plus, Share2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface GroceryItem {
  name: string;
  amount?: string;
  checked: boolean;
}

const GroceryList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialItems = location.state?.items || [];
  const [items, setItems] = useState<GroceryItem[]>(
    initialItems.map((item: any) => ({
      name: item.name,
      amount: item.amount,
      checked: false
    }))
  );
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, { name: newItem.trim(), checked: false }]);
      setNewItem("");
      toast.success("Item added to list");
    }
  };

  const toggleItem = (index: number) => {
    setItems(items.map((item, i) => 
      i === index ? { ...item, checked: !item.checked } : item
    ));
  };

  const deleteItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
    toast.success("Item removed");
  };

  const shareList = () => {
    const listText = items
      .map(item => `${item.checked ? '✓' : '○'} ${item.name}${item.amount ? ` - ${item.amount}` : ''}`)
      .join('\n');
    
    if (navigator.share) {
      navigator.share({
        title: 'My Grocery List',
        text: listText,
      });
    } else {
      navigator.clipboard.writeText(listText);
      toast.success("List copied to clipboard");
    }
  };

  const checkedCount = items.filter(item => item.checked).length;
  const totalCount = items.length;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-card border-b border-border backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">Grocery List</h1>
            <Button variant="ghost" size="icon" onClick={shareList}>
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add new item..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addItem()}
              className="flex-1"
            />
            <Button onClick={addItem} size="icon">
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {totalCount > 0 && (
          <div className="mb-6 p-4 bg-gradient-card rounded-xl border border-border">
            <p className="text-sm text-muted-foreground">
              {checkedCount} of {totalCount} items checked
            </p>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-hero transition-all duration-300"
                style={{ width: `${totalCount > 0 ? (checkedCount / totalCount) * 100 : 0}%` }}
              />
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Your grocery list is empty</p>
            <p className="text-sm text-muted-foreground">
              Add items manually or from recipe ingredients
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item, index) => (
              <Card key={index} className="border-border hover:shadow-card transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => toggleItem(index)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <p className={`${item.checked ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {item.name}
                      </p>
                      {item.amount && (
                        <p className="text-sm text-muted-foreground">{item.amount}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteItem(index)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default GroceryList;
