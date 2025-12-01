# CookBook

CookBook is a mobile recipe management application built with React Native and Expo. It offers the following features:

- **Recipe Browsing**: View recipes with type filtering (breakfast, lunch, dinner)
- **Recipe Creation**: Create new recipes with ingredients and preparation steps
- **User Authentication**: Secure login/signup functionality
- **Social Interactions**: Like recipes and save favorites
- **Onboarding Flow**: First-time user introduction
- **User Recipes**: Track your created recipes
- **Theme Support**: Dark mode interface

The application connects to Supabase for backend services, authentication, and real-time data synchronization.

## Technology Stack

- **Frontend Framework**: React Native
- **Development Platform**: Expo with Router (file-based navigation)
- **Type System**: TypeScript
- **State Management**: Zustand + React Query
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Backend & Database**: Supabase (PostgreSQL)
- **Form Handling**: React Hook Form with Zod validation
- **Data Fetching**: React Query (@tanstack/react-query)
- **Local Persistence**: AsyncStorage

## Architecture

```
app/
├── (auth)/           # Authentication screens (login, signup)
├── (tabs)/           # Main tab navigation
│   ├── index.tsx     # Home screen with recipe list
│   ├── settings.tsx  # User settings
│   └── (recipes)/    # Recipe management
│       ├── index.tsx # Favorite recipes
│       └── recipes.tsx # User's recipes
├── (onBoarding)/     # First-time user onboarding
└── recipes/          # Recipe CRUD operations
    ├── [id].tsx      # Recipe detail view
    └── new.tsx       # Create new recipe
components/
hooks/
store/
providers/
utils/
```




## Key Features
- User authentication with email/password
- Recipe browsing with type filtering (breakfast/lunch/dinner)
- Recipe creation with image URLs, ingredients, and preparation steps
- Like/unlike recipes with optimistic updates
- Favorite recipes with local persistence
- Onboarding flow for first-time users
- Responsive UI with Tailwind CSS styling
