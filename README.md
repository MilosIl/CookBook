# CookBook

CookBook is a mobile recipe management application built with React Native and Expo.

## Features

### 📱 Core Functionality
- **Recipe Discovery**: Browse public recipes with type filtering (breakfast, lunch, dinner)
- **Recipe Management**: Create, edit, and delete your own recipes
- **Local & Cloud Recipes**: Save recipes locally or share them publicly to the cloud
- **Search & Filter**: Search recipes by name and filter by type or vegan-only
- **Recipe Details**: View full recipe information including ingredients, preparation steps, and images

### 👤 User Features
- **Authentication**: Secure login and signup with Supabase Auth
- **User Profiles**: Manage profile information (name, email, phone number)
- **My Recipes**: Track all recipes you've created
- **Favorite Recipes**: Save favorite recipes (user-scoped, persisted locally)
- **Top Liked Recipes**: Discover trending recipes on the home screen

### 🎨 UI/UX
- **Dark Mode**: Full theme support with system preference detection
- **Onboarding Flow**: Guided introduction for first-time users
- **Animations**: Smooth like button animations and transitions
- **Responsive Design**: Optimized for various screen sizes
- **Image Fallbacks**: Graceful handling of missing or broken images

### 🔄 Social Features
- **Like System**: Like and unlike recipes with real-time counter updates
- **Share Recipes**: Make local recipes public for the community
- **Recipe Visibility**: Toggle between public and private recipes
- **User-Scoped Data**: Favorites and likes are tracked per user


## Technology Stack

- **Frontend Framework**: React Native
- **Development Platform**: Expo SDK ~52.0.11 with Expo Router (file-based navigation)
- **Type System**: TypeScript 5.3.3
- **State Management**: 
  - Zustand 5.0.8 (client state with AsyncStorage persistence)
  - React Query 5.62.7 (server state & caching)
- **Styling**: NativeWind 4.1.23 (Tailwind CSS for React Native)
- **Backend & Database**: Supabase 2.46.2 (PostgreSQL with Row Level Security)
- **Form Handling**: 
  - React Hook Form 7.54.2
  - Zod 3.24.1 (schema validation)
- **UI Components**: Gluestack UI (custom component library)
- **Local Storage**: @react-native-async-storage/async-storage 2.1.0
- **Animations**: React Native Reanimated

## Project Structure

```
app/
├── _layout.tsx              # Root layout with providers
├── (auth)/                  # Authentication flow
│   ├── login.tsx           # Login screen
│   └── signup.tsx          # Registration screen
├── (tabs)/                  # Main tab navigation
│   ├── _layout.tsx         # Tab bar configuration
│   ├── index.tsx           # Home screen (Daily Recipe, Top Liked, All Recipes)
│   ├── settings.tsx        # User settings & profile management
│   └── (recipes)/          # Recipe management nested stack
│       ├── _layout.tsx     # Recipe stack navigation
│       ├── index.tsx       # Favorite recipes list
│       └── recipes.tsx     # User's created recipes
├── (onBoarding)/            # First-time user experience
│   └── index.tsx           # Onboarding screen
└── recipes/                 # Recipe detail & creation
    ├── _layout.tsx         # Recipe detail layout
    ├── [id].tsx            # Recipe detail view (dynamic route)
    └── new.tsx             # Create new recipe form

components/
├── RecipeCard/              # Recipe card with like/favorite actions
├── RecipeList/              # Reusable recipe list component
├── RecipeForm/              # Recipe creation/edit form
├── RecipeDetail/            # Recipe detail view
├── EditModal/               # Edit recipe modal
├── LoginForm/               # Login form
├── SignupForm/              # Registration form
├── TopLikedRecipes/         # Top 3 liked recipes widget
├── DailyRecipe/             # Featured daily recipe
├── RecipeFilters/           # Type filter buttons
├── VeganFilter/             # Vegan-only toggle
└── ui/                      # Gluestack UI components

hooks/
├── useRecipes.ts            # Recipe data fetching & mutations
├── useAnimation.ts          # Animation utilities
└── useTheme.ts              # Theme management

store/
├── auth.ts                  # Authentication state (Zustand)
├── recipe.ts                # Client-side recipe state (filters, favorites, likes)
└── theme.ts                 # Theme preferences

lib/
└── supabase.ts              # Supabase client configuration

utils/
└── checkNetwork.ts          # Network connectivity checks
```

## State Management Architecture

### Client State (Zustand)
- **auth.ts**: Session, user profile, auth actions
- **recipe.ts**: 
  - Filters (type, search, vegan-only)
  - User-scoped favorites (persisted per userId)
  - Liked recipe IDs
  - Persisted to AsyncStorage

### Server State (React Query)
- Recipe queries with intelligent caching
- Optimistic updates for likes/favorites
- Automatic background refetching
- Query invalidation on mutations
- Separate query keys for:
  - All recipes (with type filtering)
  - User recipes (by userId)
  - Local recipes (AsyncStorage)
  - Favorite recipes (by IDs)
  - Top liked recipes
  - Individual recipe details




### Recipe Sources
The app combines recipes from two sources:
1. **Supabase (Cloud)**: Public recipes shared by all users
2. **AsyncStorage (Local)**: Private recipes stored only on the device

### Theme System
- Uses system preference detection
- Persisted to AsyncStorage
- Toggleable in settings
- Consistent across all components via Zustand store
