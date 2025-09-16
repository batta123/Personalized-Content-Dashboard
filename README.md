# 📊 Personalized Content Dashboard

A dynamic and interactive dashboard where users can view, search, and organize personalized content such as news, recommendations, and social media posts. Built using **React**, **Next.js**, **TypeScript**, **Redux Toolkit**, and modern web development tools. The application emphasizes user customization, state management, smooth UI interactions, and robust testing practices.

## 🔗 Live Demo

<a href="https://personalized-content-dashb.netlify.app/" target="_blank">Click here to view the live project</a>


---

## 📚 Theory

### Overview
The Personalized Content Dashboard is designed to demonstrate best practices in modern frontend development by offering a user-centric interface that fetches data from multiple sources and allows personalization and interactivity. The key concepts implemented include:

1. **State Management with Redux Toolkit**  
   Redux Toolkit simplifies state management by providing structured patterns and utilities like `createSlice`, `createAsyncThunk`, and `RTK Query`. It helps in managing user preferences, content data, and session states efficiently.

2. **Asynchronous Data Fetching**  
   Using Redux Thunks and RTK Query, data is fetched from external APIs like News API, TMDB API, and mocked Social Media APIs. These asynchronous operations are handled gracefully with error handling, loading states, and retries.

3. **Persistence with Local Storage**  
   User preferences like favorite categories and dark mode are saved in local storage using Redux Persist or custom hooks to maintain state across sessions.

4. **UI/UX Features**  
   The dashboard includes drag-and-drop content organization, infinite scrolling, pagination, animations using Framer Motion, and a dark mode toggle powered by Tailwind CSS’s theming system.

5. **Search Optimization**  
   A debounced search bar ensures performance optimization while typing. It prevents unnecessary API calls and enhances user experience.

6. **Testing Strategies**  
   The application uses **React Testing Library** for unit tests, **integration tests**, and **Cypress/Playwright** for end-to-end testing, ensuring that user flows and edge cases are covered.

7. **Optional Features**  
   Additional functionality like user authentication with NextAuth.js, real-time updates via WebSockets, and multi-language support with react-i18next are included as bonus implementations.

### Tools & Technologies
- **React**: Component-based architecture for building dynamic interfaces.
- **Next.js**: Server-side rendering, optimized routing, and static site generation.
- **TypeScript**: Strong typing improves maintainability and developer experience.
- **Redux Toolkit**: Simplifies state management and asynchronous logic.
- **RTK Query**: Optimized data fetching and caching.
- **Tailwind CSS**: Utility-first CSS for fast UI development.
- **Framer Motion**: Smooth animations and interactions.
- **Cypress/Playwright**: E2E testing frameworks to simulate real user behavior.
- **Local Storage**: Persistence for user preferences and dark mode.

---

## 🚀 Features

✔ Personalized content feed with news, recommendations, and social media posts  
✔ User preferences saved locally or via Redux Persist  
✔ Infinite scrolling and pagination for seamless browsing  
✔ Dark mode toggle with Tailwind CSS  
✔ Drag-and-drop content organization  
✔ Search with debouncing  
✔ State management using Redux Toolkit  
✔ Async data fetching with error handling  
✔ Unit, integration, and E2E testing  
✔ Optional features: authentication, real-time updates, language switching

---

## 📂 Project Structure

       personalized-content-dashboard/
            ├── public/ # Static assets like images and icons
            ├── src/
            │ ├── components/ # Reusable UI components (Feed, Card, Sidebar, etc.)
            │ ├── features/ # Redux slices, async logic, and API handling
            │ ├── pages/ # Next.js pages and API routes
            │ ├── styles/ # Tailwind CSS configuration and global styles
            │ └── utils/ # Helper functions, API clients
            ├── tests/ # Unit, integration, and end-to-end tests
            ├── .env.local # Environment variables (API keys)
            ├── README.md # Project documentation
            └── package.json # Project metadata and dependencies


---

## ⚙ Installation & Setup

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- An API key for NewsAPI and TMDB (or mock API setup)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/batta123/Personalized-Content-Dashboard.git
   cd Personalized-Content-Dashboard
   
**2. Install dependencies:**
```bash
npm install

**3. Create a `.env.local` file in the project root and add your API keys:**

  NEWS_API_KEY=your_news_api_key
  TMDB_API_KEY=your_tmdb_api_key

*(You can obtain API keys from [NewsAPI](https://newsapi.org/) and [TMDB](https://www.themoviedb.org/). Social posts can be fetched from a mock API.)*

4. Run the development server:

```bash
npm run dev

Run unit and integration tests:

npm run test

Run end-to-end tests using Cypress or Playwright:

npm run cy:open    # For Cypress
npm run test:e2e   # For Playwright

📚 Theory

This project applies modern frontend principles:

State Management: Redux Toolkit (createSlice, createAsyncThunk, RTK Query) is used to manage user preferences, content data, and session states.

Async Data Handling: APIs like NewsAPI and TMDB API are integrated with proper error handling and caching.

Persistence: Local storage or Redux Persist stores user preferences such as selected categories and dark mode settings.

UI Features: Drag-and-drop content reordering, infinite scrolling, pagination, animations via Framer Motion, and dark mode toggling with Tailwind CSS enhance interactivity.

Search Optimization: A debounced search prevents unnecessary API calls while typing.

Testing: Unit, integration, and E2E tests ensure the correctness of components and user flows.

Optional Enhancements: Authentication via NextAuth.js, real-time content updates with WebSockets, and multi-language support using react-i18next.


This version contains everything from step 3 onward in a seamless, single-page format while staying organized, readable, and professional. Let me know if you want it even more compact or tailored for a specific audience.



