import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserPreferences {
  categories: ('technology' | 'sports' | 'finance' | 'entertainment' | 'health' | 'science' | 'politics' | 'travel' | 'food' | 'business' | 'lifestyle' | 'environment')[];
  language: string;
}

export interface UserState {
  preferences: UserPreferences;
  isSettingsOpen: boolean;
}

const initialState: UserState = {
  preferences: {
    categories: ['technology', 'entertainment'],
    language: 'en',
  },
  isSettingsOpen: false,
};

// Load user preferences from localStorage
const loadUserPreferences = (): Partial<UserState> => {
  try {
    const preferences = localStorage.getItem('user-preferences');
    return preferences ? JSON.parse(preferences) : {};
  } catch {
    return {};
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState: { ...initialState, ...loadUserPreferences() },
  reducers: {
    updatePreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
      localStorage.setItem('user-preferences', JSON.stringify(state));
    },
    toggleSettings: (state) => {
      state.isSettingsOpen = !state.isSettingsOpen;
    },
    addCategory: (state, action: PayloadAction<UserPreferences['categories'][0]>) => {
      if (!state.preferences.categories.includes(action.payload)) {
        state.preferences.categories.push(action.payload);
        localStorage.setItem('user-preferences', JSON.stringify(state));
      }
    },
    removeCategory: (state, action: PayloadAction<UserPreferences['categories'][0]>) => {
      state.preferences.categories = state.preferences.categories.filter(
        cat => cat !== action.payload
      );
      localStorage.setItem('user-preferences', JSON.stringify(state));
    },
  },
});

export const { updatePreferences, toggleSettings, addCategory, removeCategory } = userSlice.actions;
export default userSlice.reducer;