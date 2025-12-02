// Light Mode Colors
export const lightColors = {
  // Primary (Brand Orange)
  primary: {
    50: '#FFF7E8',
    100: '#FFEBC2',
    200: '#FFD88A',
    300: '#FFC452',
    400: '#FFB12A',
    500: '#FF9900', // main brand orange
    600: '#E68300',
    700: '#BF6800',
    800: '#8F4D00',
    900: '#663700',
  },
  // Secondary (Fresh Green)
  secondary: {
    50: '#EAF8EB',
    100: '#C9EECF',
    200: '#9FDFAC',
    300: '#73CF88',
    400: '#51C36E',
    500: '#2EAD4F',
    600: '#248C40',
    700: '#1B6B31',
    800: '#124A22',
    900: '#0A3015',
  },
  // Backgrounds
  background: '#FFFFFF',
  backgroundAlt: '#F8F8F7',
  card: '#FFFFFF',
  border: '#E4E4E4',
  // Text
  text: {
    primary: '#1A1A1A',
    secondary: '#4A4A4A',
    muted: '#7A7A7A',
  },
  // Status
  status: {
    success: '#34C759',
    warning: '#FFCC00',
    error: '#FF3B30',
  },
};

// Dark Mode Colors
export const darkColors = {
  // Primary (Brand Orange)
  primary: {
    50: '#332300',
    100: '#4D3300',
    200: '#664200',
    300: '#8F5A00',
    400: '#B37100',
    500: '#FF9900', // same brand
    600: '#FFB033',
    700: '#FFC766',
    800: '#FFDE99',
    900: '#FFF3D6',
  },
  // Secondary (Fresh Green)
  secondary: {
    50: '#0A3015',
    100: '#124A22',
    200: '#1B6B31',
    300: '#248C40',
    400: '#2EAD4F',
    500: '#51C36E',
    600: '#73CF88',
    700: '#9FDFAC',
    800: '#C9EECF',
    900: '#EAF8EB',
  },
  // Backgrounds
  background: '#121212',
  backgroundAlt: '#1A1A1A',
  card: '#1E1E1E',
  border: '#2A2A2A',
  // Text
  text: {
    primary: '#FFFFFF',
    secondary: '#CCCCCC',
    muted: '#999999',
  },
  // Status
  status: {
    success: '#30D158',
    warning: '#FFD60A',
    error: '#FF453A',
  },
};

// Recipe Type Colors
export const recipeTypeColors = {
  breakfast: {
    light: lightColors.status.warning,
    dark: darkColors.status.warning,
  },
  lunch: {
    light: lightColors.secondary[500],
    dark: darkColors.secondary[500],
  },
  dinner: {
    light: lightColors.primary[500],
    dark: darkColors.primary[500],
  },
};
