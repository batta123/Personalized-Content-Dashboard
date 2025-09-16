# ContentHub - Personalized Content Dashboard

A modern, responsive dashboard application for managing and interacting with personalized content from multiple sources including news, movies, and social media.

## 🚀 Features

### Core Features
- **Personalized Content Feed**: Aggregated content from news, movies, and social media APIs
- **User Preferences**: Customizable content categories (Technology, Sports, Finance, Entertainment, Health)
- **Interactive Content Cards**: Rich content display with images, descriptions, and actions
- **Search Functionality**: Debounced search across all content types
- **Drag & Drop**: Reorder content cards with smooth animations
- **Favorites System**: Save and manage favorite content items

### Advanced UI/UX
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode**: Toggle between light and dark themes with system preference detection
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Modern Design System**: Custom design tokens with HSL color system
- **Loading States**: Elegant loading spinners and skeleton states
- **Empty States**: Helpful messaging when no content is available

### State Management
- **Redux Toolkit**: Centralized state management with async thunks
- **Local Storage**: Persistent user preferences and favorites
- **Real-time Updates**: Dynamic content filtering and searching

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **State Management**: Redux Toolkit
- **UI Components**: Custom components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Drag & Drop**: @hello-pangea/dnd (React Beautiful DnD successor)
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd content-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:8080
   ```

### Build for Production
```bash
npm run build
# or
pnpm build
```

## 🎨 Design System

The application uses a comprehensive design system with:

- **Color Palette**: Professional blue-based theme with accent colors for different content types
- **Typography**: Modern font stack with proper hierarchy
- **Spacing**: Consistent spacing scale using Tailwind utilities
- **Shadows**: Layered shadow system for depth
- **Animations**: Smooth transitions and micro-interactions

### Color Categories
- 🔵 **News**: Blue accent for news content
- 🟣 **Movies**: Purple accent for movie content  
- 🟢 **Social**: Green accent for social media content

## 📱 User Experience

### Navigation
- **Sidebar Navigation**: Collapsible sidebar with main sections
- **Feed**: Main personalized content stream
- **Trending**: Recent content from the last 24 hours
- **Favorites**: User-saved content items

### Content Interaction
- **Search**: Real-time search across titles, descriptions, categories, and sources
- **Filtering**: Dynamic filtering by section and user preferences
- **Favorites**: One-click save/unsave functionality
- **Drag & Drop**: Reorder content cards by dragging

### Settings & Preferences
- **Category Selection**: Choose preferred content categories
- **Dark Mode**: System preference detection with manual override
- **Persistent Storage**: Preferences saved to localStorage

## 🔄 State Management Architecture

### Redux Store Structure
```
store/
├── index.ts              # Store configuration
└── slices/
    ├── dashboardSlice.ts # UI state, sidebar, search, theme
    ├── userSlice.ts      # User preferences and settings
    └── contentSlice.ts   # Content data and favorites
```

### Key State Features
- **Async Actions**: Redux Toolkit async thunks for API calls
- **Persistence**: Automatic localStorage sync for preferences
- **Type Safety**: Full TypeScript integration with typed hooks

## 🎯 Mock API Integration

Currently uses sophisticated mock data generation that simulates:
- **News API**: Technology, sports, finance, health, and entertainment news
- **Movie API**: Various movie categories with rich metadata
- **Social API**: Social media posts with different content types

### Extensibility
The architecture is designed to easily integrate real APIs:
- Replace mock data generators in `contentSlice.ts`
- Add API configuration in environment variables
- Implement proper error handling and loading states

## 🧪 Testing Strategy

The application is built with testing in mind:

### Recommended Testing Approach
- **Unit Tests**: Component logic and Redux reducers
- **Integration Tests**: User interactions and state changes
- **E2E Tests**: Critical user flows with Cypress or Playwright

### Test Files Structure
```
src/
├── __tests__/
│   ├── components/
│   ├── store/
│   └── utils/
└── cypress/
    └── e2e/
```

## 🚀 Future Enhancements

### Planned Features
- [ ] **Real API Integration**: Connect to actual news, movie, and social APIs
- [ ] **User Authentication**: Login/signup with profile management
- [ ] **Real-time Updates**: WebSocket integration for live content
- [ ] **Internationalization**: Multi-language support with react-i18next
- [ ] **Advanced Filtering**: Date ranges, source filtering, content type filters
- [ ] **Sharing**: Share favorite content via social media or email
- [ ] **Offline Support**: Service worker for offline functionality
- [ ] **Push Notifications**: Browser notifications for new content

### Performance Optimizations
- [ ] **Virtualization**: Virtual scrolling for large content lists
- [ ] **Image Optimization**: Lazy loading and responsive images
- [ ] **Code Splitting**: Route-based code splitting
- [ ] **Caching**: Implement intelligent content caching

## 📄 License

This project is built for educational purposes as part of a frontend development assessment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For questions or support regarding this project, please refer to the documentation or create an issue in the repository.

---

**Built with ❤️ using modern React and TypeScript**