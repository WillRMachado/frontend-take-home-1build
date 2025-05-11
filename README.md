# Handoff Frontend Take-Home Challenge

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app) as a starting point for the frontend engineering take-home challenge.

## Project Structure

```
├── app/                  # Main application (file-based routing)
├── assets/               # Static assets
├── src/                  # Source code
│   ├── common/           # Shared components and utilities
│   │   ├── components/   # Reusable UI components
│   │   ├── lib/          # Utility functions and helpers
│   │   └── theme/        # Design system theme
│   │       ├── tokens/   # Design tokens (colors, spacing)
│   └── features/         # Feature-specific code
│       └── estimate/     # Estimate feature
│           ├── components/  # Feature-specific components
│           │   ├── EstimateList/
│           │   └── EstimateTitle/
│           ├── EstimateScreen.tsx
│           └── useEstimateScreen.ts
└── data.ts             # Mock data for the application
```

## Development Setup

This project uses Expo with a development build configuration. While it's configured for development builds, you can still use the standard Expo workflow:

1. Install dependencies
    ```bash
    npm install
    ```

2. Start the development server
    ```bash
    npx expo start
    ```
    - Press 'S' to switch to development client mode
    - Press 'i' to run on iOS simulator
    - Press 'a' to run on Android emulator
    - Press 'w' to run on web browser

Alternatively, you can create platform-specific builds:

For iOS:
```bash
npx expo prebuild -p ios
npx expo run:ios
```

For Android:
```bash
npx expo prebuild -p android
npx expo run:android
```

For Web:
```bash
npx expo start --web
```

## Project Architecture

The project follows an MVVM-based architecture pattern, adapted for React Native development, with the following key features:

- **MVVM Pattern**:
  - Models: Data structures and business logic
  - Views: UI components in the components directory
  - ViewModels: State management and business logic in feature-specific directories, used as hooks (i.e useFeature.ts)
  - Context: Global state management where needed
  - Features: Feature-based organization with screen-specific logic

- **File-based Routing**: Using Expo Router for navigation
- **TypeScript**: Full TypeScript support for type safety
- **New Architecture**: Enabled React Native's new architecture for better performance
- **Theme System**: Customizable design tokens and theming
- **Component Library**: Reusable UI components in the common directory
- **Development Build**: Custom native builds for better development experience

## Key Libraries and Features Changes

- **Bottom Sheet**: Custom implementation for modal interactions with backdrop and gesture handling, to work seamlessly on older androids
- **State Management**: React hooks and context for state management
- **Type Safety**: Full TypeScript implementation
- **Themed Styling System**:
  - Custom `createThemedStyles` hook for theme-aware styling
  - Type-safe theme tokens and design system
  - Support for light/dark mode
  - Custom font system with Poppins and Inter
- **Component Library**:
  - Floating Label Input
  - Custom Switcher component
  - Tag component for status display
  - Icon Button
  - Bottom Sheet with gesture handling
- **Theme System**:
  - Dynamic theme switching
  - Color mode support (light/dark)
  - Design tokens for spacing, typography, and colors
  - Custom font implementation
- **Platform Specific**:
  - Cross-platform support (iOS, Android, Web)
  - Platform-specific adaptations
  - Responsive layouts
  - Platform-specific components (e.g., .web.tsx, .tsx)

## Recent Improvements

- Added development build configuration
- Implemented new architecture support
- Added typed routes for better type safety
- Implemented MVVM architecture pattern
- Added custom bottom sheet implementation
- Created comprehensive theming system with:
  - Dynamic theme switching
  - Custom font system
  - Design tokens
  - Platform-specific adaptations
- Enhanced component library with:
  - Floating Label Input
  - Custom Switcher
  - Tag component
  - Icon Button
  - Bottom Sheet
- Improved type safety with:
  - Full TypeScript implementation
  - Type-safe theme tokens
  - Component prop types
- Added responsive design with:
  - Platform-specific layouts
  - Adaptive components
  - Flexible styling system

## Resources

-   [Figma Design](https://www.figma.com/design/Blk49Bk32ACk3yuDC2Vsq5/Take-Home-Assement---Front-End-Jan-2025?node-id=4044-145&t=4yKjBuOChIiCckTl-11) (Password: `H@ndoff#`)
-   [Expo Documentation](https://docs.expo.dev/)
-   [React Native Documentation](https://reactnative.dev/)
