import { Search, Menu, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { toggleSidebar, setSearchQuery } from '@/store/slices/dashboardSlice';
import { useState, useEffect, useCallback } from 'react';

export const DashboardHeader = () => {
  const dispatch = useAppDispatch();
  const { searchQuery, sidebarCollapsed } = useAppSelector(state => state.dashboard);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Debounced search
  const debouncedSearch = useCallback(
    (query: string) => {
      const timeoutId = setTimeout(() => {
        dispatch(setSearchQuery(query));
      }, 300);
      
      return () => clearTimeout(timeoutId);
    },
    [dispatch]
  );

  useEffect(() => {
    const cleanup = debouncedSearch(localSearchQuery);
    return cleanup;
  }, [localSearchQuery, debouncedSearch]);

  return (
    <header className="bg-card/50 backdrop-blur-sm border-b border-border/50 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(toggleSidebar())}
            className="lg:hidden"
          >
            <Menu className="w-4 h-4" />
          </Button>
          
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search content, categories, or sources..."
              className="pl-10 bg-background/50 border-border/50"
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
            >
              3
            </Badge>
          </Button>
          
          <Button variant="ghost" size="sm">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline ml-2">Profile</span>
          </Button>
        </div>
      </div>
    </header>
  );
};