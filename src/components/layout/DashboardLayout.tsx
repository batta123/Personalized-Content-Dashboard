import { useEffect } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';
import { ContentFeed } from '../content/ContentFeed';
import { UserSettings } from '../settings/UserSettings';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { cn } from '@/lib/utils';

export const DashboardLayout = () => {
  const dispatch = useAppDispatch();
  const { sidebarCollapsed, isDarkMode } = useAppSelector(state => state.dashboard);

  // Apply dark mode on mount
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-dashboard-bg flex w-full">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <DashboardHeader />

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <ContentFeed />
          </div>
        </main>
      </div>

      {/* Settings Modal */}
      <UserSettings />
    </div>
  );
};