/* eslint-disable import/no-unresolved */
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';
import { useFonts } from 'expo-font';
import { Theme, ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect } from 'react';
import { Platform } from 'react-native';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { NAV_THEME } from '@/lib/constants';
import { useColorScheme } from '@/lib/useColorScheme';
import { tokenCache } from '@/cache';
import { TextClassContext } from '@/components/ui/text';


const useIsomorphicLayoutEffect = Platform.OS === 'web' ? useLayoutEffect : useEffect;

export default function RootLayout() {

   const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

    if (!publishableKey) {
      throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file')
    }
  
  const LIGHT_THEME: Theme = {
    ...DefaultTheme,
    colors: NAV_THEME.light,
  };
  const DARK_THEME: Theme = {
    ...DarkTheme,
    colors: NAV_THEME.dark,
  };

  const hasMounted = React.useRef(false);
  const { isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const [loaded] = useFonts({
    "BaiJamjuree-Bold": require("../assets/fonts/BaiJamjuree-Bold.ttf"),
    "BaiJamjuree-ExtraLight": require("../assets/fonts/BaiJamjuree-ExtraLight.ttf"),
    "BaiJamjuree-Light": require("../assets/fonts/BaiJamjuree-Light.ttf"),
    "BaiJamjuree-Medium": require("../assets/fonts/BaiJamjuree-Medium.ttf"),
    "BaiJamjuree-Regular": require("../assets/fonts/BaiJamjuree-Regular.ttf"),
    "BaiJamjuree-SemiBold": require("../assets/fonts/BaiJamjuree-SemiBold.ttf"),
  });   

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === 'web') {
      document.documentElement.classList.add('bg-background');
    }
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!loaded || !isColorSchemeLoaded) {
    return null;
  }

  return (
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <ClerkLoaded>
          <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            <TextClassContext.Provider value="font-BaiJamjureeRegular">
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false, statusBarHidden: true }} />
                <Stack.Screen name="+not-found" />
                <Stack.Screen name="(root)" options={{ headerShown: false, statusBarHidden: true }} />
                <Stack.Screen name="(root)/(tabs)" options={{ headerShown: false, statusBarHidden: true }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false, statusBarHidden: true }} />
              </Stack>
            </TextClassContext.Provider>
          </ThemeProvider>
        </ClerkLoaded>
      </ClerkProvider>
  );
}
