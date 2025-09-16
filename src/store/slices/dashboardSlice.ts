import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DashboardState {
  sidebarCollapsed: boolean;
  activeSection: 'feed' | 'trending' | 'favorites';
  searchQuery: string;
  isDarkMode: boolean;
}

const initialState: DashboardState = {
  sidebarCollapsed: false,
  activeSection: 'feed',
  searchQuery: '',
  isDarkMode: false,
};

// Load preferences from localStorage
const loadPreferences = (): Partial<DashboardState> => {
  try {
    const preferences = localStorage.getItem('dashboard-preferences');
    return preferences ? JSON.parse(preferences) : {};
  } catch {
    return {};
  }
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: { ...initialState, ...loadPreferences() },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
      localStorage.setItem('dashboard-preferences', JSON.stringify(state));
    },
    setActiveSection: (state, action: PayloadAction<DashboardState['activeSection']>) => {
      state.activeSection = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('dashboard-preferences', JSON.stringify(state));
      // Apply dark mode to document
      if (state.isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
  },
});

export const { toggleSidebar, setActiveSection, setSearchQuery, toggleDarkMode } = dashboardSlice.actions;
export default dashboardSlice.reducer;