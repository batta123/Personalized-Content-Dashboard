import { Home, TrendingUp, Heart, Settings, Search, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setActiveSection, toggleDarkMode } from '@/store/slices/dashboardSlice';
import { toggleSettings } from '@/store/slices/userSlice';
import { cn } from '@/lib/utils';

export const DashboardSidebar = () => {
  const dispatch = useAppDispatch();
  const { sidebarCollapsed, activeSection, isDarkMode } = useAppSelector(state => state.dashboard);

  const navigationItems = [
    { id: 'feed', label: 'Feed', icon: Home },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'favorites', label: 'Favorites', icon: Heart },
  ] as const;

  return (
    <aside className={cn(
      "dashboard-sidebar h-screen flex flex-col transition-all duration-300",
      sidebarCollapsed ? "w-16" : "w-64"
    )}>
      {/* Logo/Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">PD</span>
          </div>
          {!sidebarCollapsed && (
            <h1 className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
              Personal-Dashboard
            </h1>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={activeSection === id ? "default" : "ghost"}
            className={cn(
              "w-full justify-start gap-3 h-12",
              sidebarCollapsed && "justify-center px-0",
              activeSection === id && "bg-primary/10 text-primary hover:bg-primary/20"
            )}
            onClick={() => dispatch(setActiveSection(id))}
          >
            <Icon className="w-5 h-5" />
            {!sidebarCollapsed && <span>{label}</span>}
          </Button>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border/50 space-y-2">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 h-12",
            sidebarCollapsed && "justify-center px-0"
          )}
          onClick={() => dispatch(toggleDarkMode())}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          {!sidebarCollapsed && <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
        </Button>
        
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 h-12",
            sidebarCollapsed && "justify-center px-0"
          )}
          onClick={() => dispatch(toggleSettings())}
        >
          <Settings className="w-5 h-5" />
          {!sidebarCollapsed && <span>Settings</span>}
        </Button>
      </div>
    </aside>
  );
};