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

The application uses Supabase for backend services, authentication, and real-time data synchronization, with AsyncStorage for local persistence.

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

## Database Schema (Supabase)

### Tables
- **recipes**: Recipe data with user ownership
  - id, name, description, image, vegan, likes, ingredients, type, preparation
  - user_id (foreign key), is_public (visibility), created_at
- **users**: Extended user profiles
  - id (matches auth.users), email, first_name, last_name, phoneNumber

### Row Level Security (RLS)
- Users can read all public recipes
- Users can CRUD their own recipes
- Users can read/update their own profile




## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo Go app on your mobile device (for testing)
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CookBook
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase**
   
   Run the following SQL in your Supabase SQL Editor:
   ```sql
   -- Create users table
   CREATE TABLE users (
     id UUID REFERENCES auth.users PRIMARY KEY,
     email TEXT NOT NULL,
     first_name TEXT,
     last_name TEXT,
     phoneNumber TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create recipes table
   CREATE TABLE recipes (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL,
     description TEXT,
     image TEXT,
     vegan BOOLEAN DEFAULT false,
     likes INTEGER DEFAULT 0,
     ingredients TEXT[],
     type TEXT CHECK (type IN ('breakfast', 'lunch', 'dinner')),
     preparation TEXT,
     user_id UUID REFERENCES auth.users,
     is_public BOOLEAN DEFAULT true,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable Row Level Security
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

   -- RLS Policies for users
   CREATE POLICY "Users can view own profile"
     ON users FOR SELECT
     USING (auth.uid() = id);

   CREATE POLICY "Users can update own profile"
     ON users FOR UPDATE
     USING (auth.uid() = id);

   -- RLS Policies for recipes
   CREATE POLICY "Anyone can view public recipes"
     ON recipes FOR SELECT
     USING (is_public = true OR auth.uid() = user_id);

   CREATE POLICY "Users can insert own recipes"
     ON recipes FOR INSERT
     WITH CHECK (auth.uid() = user_id);

   CREATE POLICY "Users can update own recipes"
     ON recipes FOR UPDATE
     USING (auth.uid() = user_id);

   CREATE POLICY "Users can delete own recipes"
     ON recipes FOR DELETE
     USING (auth.uid() = user_id);
   ```

5. **Start the development server**
   ```bash
   npx expo start
   ```

6. **Run on your device**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Or press `a` for Android emulator, `i` for iOS simulator

## Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android device/emulator
npm run ios        # Run on iOS simulator
npm run web        # Run in web browser
npm run lint       # Run ESLint
npm test           # Run tests
```

## Key Implementation Details

### User-Scoped Favorites
Favorites are stored in AsyncStorage with the following structure:
```typescript
{
  favoriteRecipeIds: {
    "user-id-1": ["recipe-1", "recipe-2"],
    "user-id-2": ["recipe-3", "recipe-4"]
  }
}
```

### Recipe Sources
The app combines recipes from two sources:
1. **Supabase (Cloud)**: Public recipes shared by all users
2. **AsyncStorage (Local)**: Private recipes stored only on the device

### Mutation Hooks
Centralized mutation hooks in `useRecipes.ts` handle:
- Creating/updating/deleting local recipes
- Creating/updating/deleting cloud recipes
- Liking/unliking recipes
- Sharing local recipes to cloud
- Automatic query invalidation

### Theme System
- Uses system preference detection
- Persisted to AsyncStorage
- Toggleable in settings
- Consistent across all components via Zustand store

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `EXPO_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Troubleshooting

### Common Issues

**"Unable to resolve module" errors**
```bash
npm install
npx expo start -c  # Clear cache
```

**Supabase connection issues**
- Verify your `.env` file has the correct URL and anon key
- Check that RLS policies are properly configured
- Ensure network connectivity

**AsyncStorage data corruption**
- Clear app data or reinstall the app
- The app includes migration logic to handle corrupted data

**Images not loading**
- The app includes fallback images for broken URLs
- Check that image URLs are publicly accessible

## Future Enhancements

- [ ] Image upload to Supabase Storage
- [ ] Recipe categories and tags
- [ ] Recipe ratings and reviews
- [ ] Shopping list generation from ingredients
- [ ] Recipe sharing via deep links
- [ ] Offline mode with sync
- [ ] Recipe import from URLs
- [ ] Meal planning calendar
