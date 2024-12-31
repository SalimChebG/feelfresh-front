import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Dimensions,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { NavigationBar } from "@/components/NavigationBar";

const queryClient = new QueryClient();

export default function RootLayout() {
  const { width } = Dimensions.get('window');
  const isMobile = Platform.OS !== 'web' && width <= 768; // Vérifie si c'est un appareil mobile
  const colors = useThemeColors();

  return (
      <View style={styles.container}>
        {/* Stack Navigation */}
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
        {/* Barre de navigation affichée uniquement sur mobile */}

        {/*{isMobile && (*/}
          <View style={[styles.mobileNavBarContainer, { backgroundColor: colors.background.primary }]}>
            <NavigationBar />
          </View>
        {/*)}*/}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mobileNavBarContainer: {
    position: 'absolute',
    bottom: Platform.OS === "ios" ? 10 : 0,
    left: 0,
    right: 0,
  },
});
