import { X, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { toggleSettings, addCategory, removeCategory } from '@/store/slices/userSlice';
import type { UserPreferences } from '@/store/slices/userSlice';
import { fetchContent } from '@/store/slices/contentSlice';

const availableCategories = [
  { id: 'technology', label: 'Technology', color: 'bg-blue-500' },
  { id: 'sports', label: 'Sports', color: 'bg-green-500' },
  { id: 'finance', label: 'Finance', color: 'bg-yellow-500' },
  { id: 'entertainment', label: 'Entertainment', color: 'bg-purple-500' },
  { id: 'health', label: 'Health', color: 'bg-red-500' },
  { id: 'science', label: 'Science', color: 'bg-teal-500' },
  { id: 'politics', label: 'Politics', color: 'bg-orange-500' },
  { id: 'travel', label: 'Travel', color: 'bg-pink-500' },
  { id: 'food', label: 'Food & Cooking', color: 'bg-amber-500' },
  { id: 'business', label: 'Business', color: 'bg-slate-500' },
  { id: 'lifestyle', label: 'Lifestyle', color: 'bg-rose-500' },
  { id: 'environment', label: 'Environment', color: 'bg-emerald-500' },
] as const;

export const UserSettings = () => {
  const dispatch = useAppDispatch();
  const { isSettingsOpen, preferences } = useAppSelector(state => state.user);

  const handleCategoryToggle = (categoryId: string) => {
    const typedCategoryId = categoryId as UserPreferences['categories'][0];
    
    if (preferences.categories.includes(typedCategoryId)) {
      dispatch(removeCategory(typedCategoryId));
    } else {
      dispatch(addCategory(typedCategoryId));
    }
    
    // Refresh content with new preferences
    setTimeout(() => {
      dispatch(fetchContent(preferences.categories));
    }, 100);
  };

  return (
    <Dialog open={isSettingsOpen} onOpenChange={() => dispatch(toggleSettings())}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5" />
            Content Preferences
          </DialogTitle>
        </DialogHeader>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Favorite Categories</CardTitle>
            <p className="text-sm text-muted-foreground">
              Select categories to personalize your content feed
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              {availableCategories.map((category) => {
                const isSelected = preferences.categories.includes(category.id);
                
                return (
                  <Button
                    key={category.id}
                    variant={isSelected ? "default" : "outline"}
                    className="justify-between h-auto p-3"
                    onClick={() => handleCategoryToggle(category.id)}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${category.color}`} />
                      <span>{category.label}</span>
                    </div>
                    {isSelected && (
                      <Badge variant="secondary" className="ml-2">
                        Active
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Selected: {preferences.categories.length} {preferences.categories.length === 1 ? 'category' : 'categories'}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={() => dispatch(toggleSettings())}>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};