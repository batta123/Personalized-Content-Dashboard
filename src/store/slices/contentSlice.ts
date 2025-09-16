import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface ContentItem {
  id: string;
  type: 'news' | 'movie' | 'social';
  title: string;
  description: string;
  image?: string;
  source: string;
  url?: string;
  category: string;
  publishedAt: string;
  isFavorite: boolean;
}

export interface ContentState {
  items: ContentItem[];
  favorites: ContentItem[];
  loading: boolean;
  error: string | null;
  lastFetch: number;
}

const initialState: ContentState = {
  items: [],
  favorites: [],
  loading: false,
  error: null,
  lastFetch: 0,
};

// Mock API data generator
const generateMockContent = (categories: string[]): ContentItem[] => {
  const mockNews = [
    { title: "AI Revolution in Tech Industry", description: "Major breakthrough in artificial intelligence transforms multiple sectors", category: "technology" },
    { title: "Global Climate Summit Results", description: "World leaders discuss ambitious climate action plans for next decade", category: "environment" },
    { title: "Stock Market Reaches New Highs", description: "Tech stocks lead unprecedented market surge amid economic recovery", category: "finance" },
    { title: "Olympic Games Preview", description: "Athletes prepare for upcoming international competition showcase", category: "sports" },
    { title: "Healthcare Innovation Breakthrough", description: "Revolutionary new treatment shows promising results in clinical trials", category: "health" },
    { title: "Quantum Computing Milestone", description: "Scientists achieve new quantum supremacy benchmark", category: "science" },
    { title: "Election Campaign Updates", description: "Latest developments in upcoming political elections", category: "politics" },
    { title: "Space Exploration Mission", description: "New Mars rover mission reveals fascinating discoveries", category: "science" },
    { title: "Cryptocurrency Market Analysis", description: "Digital currency trends shape future of global finance", category: "finance" },
    { title: "Sustainable Energy Revolution", description: "Renewable energy sources reach record adoption rates", category: "environment" },
    { title: "Mental Health Awareness", description: "New research highlights importance of workplace wellness", category: "health" },
    { title: "Championship Finals Preview", description: "Top teams prepare for decisive championship matches", category: "sports" },
    { title: "Tech Giants Merger News", description: "Industry leaders announce strategic partnership deals", category: "business" },
    { title: "Cultural Festival Coverage", description: "Annual arts festival showcases global talent and creativity", category: "lifestyle" },
    { title: "Economic Recovery Update", description: "Latest indicators show positive economic growth trends", category: "finance" },
  ];

  const mockMovies = [
    { title: "Epic Space Adventure", description: "A thrilling journey through the cosmos with stunning visuals", category: "sci-fi" },
    { title: "Romantic Comedy Hit", description: "Heartwarming love story that will make you laugh and cry", category: "romance" },
    { title: "Action-Packed Thriller", description: "Non-stop excitement from start to finish with incredible stunts", category: "action" },
    { title: "Documentary Masterpiece", description: "Eye-opening exploration of nature's most incredible phenomena", category: "documentary" },
    { title: "Mystery Drama Series", description: "Compelling storyline with unexpected twists and turns", category: "mystery" },
    { title: "Historical Epic Film", description: "Sweeping period drama set in ancient civilization", category: "historical" },
    { title: "Animated Family Movie", description: "Delightful adventure perfect for viewers of all ages", category: "family" },
    { title: "Psychological Thriller", description: "Mind-bending narrative that challenges reality perception", category: "thriller" },
    { title: "Musical Biography", description: "Inspiring story of legendary musician's rise to fame", category: "biography" },
    { title: "Superhero Blockbuster", description: "Epic battle between good and evil with spectacular effects", category: "superhero" },
  ];

  const mockSocial = [
    { title: "Viral Dance Challenge", description: "New creative trend taking social media platforms by storm", category: "trending" },
    { title: "Celebrity Chef Recipe", description: "Simple yet delicious pasta dish recipe shared by famous chef", category: "food" },
    { title: "Travel Photography Tips", description: "Professional techniques for capturing stunning landscape photographs", category: "travel" },
    { title: "Startup Success Story", description: "Young entrepreneur builds million-dollar company from garage", category: "business" },
    { title: "DIY Home Improvement", description: "Creative solutions for transforming living spaces on budget", category: "lifestyle" },
    { title: "Fitness Challenge Update", description: "Community members share amazing transformation results", category: "health" },
    { title: "Art Installation Showcase", description: "Contemporary artist unveils thought-provoking public artwork", category: "lifestyle" },
    { title: "Tech Product Review", description: "Comprehensive analysis of latest smartphone release features", category: "technology" },
    { title: "Cooking Competition Highlights", description: "Best moments from international culinary championship", category: "food" },
    { title: "Adventure Travel Vlog", description: "Breathtaking journey through remote mountain wilderness", category: "travel" },
    { title: "Environmental Activism", description: "Youth movement creates positive impact on climate awareness", category: "environment" },
    { title: "Business Innovation Summit", description: "Industry leaders share insights on future market trends", category: "business" },
  ];

  const allContent: ContentItem[] = [
    ...mockNews.map((item, index) => ({
      id: `news-${index}`,
      type: 'news' as const,
      ...item,
      source: "News API",
      publishedAt: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
      isFavorite: false,
      image: `https://picsum.photos/400/250?random=${index}`,
    })),
    ...mockMovies.map((item, index) => ({
      id: `movie-${index}`,
      type: 'movie' as const,
      ...item,
      source: "TMDB",
      publishedAt: new Date(Date.now() - Math.random() * 86400000 * 30).toISOString(),
      isFavorite: false,
      image: `https://picsum.photos/400/600?random=${index + 10}`,
    })),
    ...mockSocial.map((item, index) => ({
      id: `social-${index}`,
      type: 'social' as const,
      ...item,
      source: "Social API",
      publishedAt: new Date(Date.now() - Math.random() * 86400000 * 3).toISOString(),
      isFavorite: false,
      image: `https://picsum.photos/400/400?random=${index + 20}`,
    })),
  ];

  return allContent.filter(item => 
    categories.some(cat => item.category.toLowerCase().includes(cat.toLowerCase()))
  );
};

// Async thunk for fetching content
export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async (categories: string[]) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would make actual API calls
    return generateMockContent(categories);
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.isFavorite = !item.isFavorite;
        
        if (item.isFavorite) {
          state.favorites.push(item);
        } else {
          state.favorites = state.favorites.filter(fav => fav.id !== action.payload);
        }
        
        // Persist favorites to localStorage
        localStorage.setItem('content-favorites', JSON.stringify(state.favorites));
      }
    },
    reorderContent: (state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [removed] = state.items.splice(sourceIndex, 1);
      state.items.splice(destinationIndex, 0, removed);
    },
    loadFavorites: (state) => {
      try {
        const favorites = localStorage.getItem('content-favorites');
        if (favorites) {
          state.favorites = JSON.parse(favorites);
          // Update favorite status in items
          state.items.forEach(item => {
            item.isFavorite = state.favorites.some(fav => fav.id === item.id);
          });
        }
      } catch {
        // Ignore localStorage errors
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastFetch = Date.now();
        
        // Update favorite status for newly fetched items
        state.items.forEach(item => {
          item.isFavorite = state.favorites.some(fav => fav.id === item.id);
        });
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch content';
      });
  },
});

export const { toggleFavorite, reorderContent, loadFavorites } = contentSlice.actions;
export default contentSlice.reducer;