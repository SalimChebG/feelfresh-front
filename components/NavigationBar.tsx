import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Importer le hook useRouter
import { useThemeColors } from "@/hooks/useThemeColors";

const NAV_ITEMS = [
  { name: 'Home', icon: require('@/assets/images/navBar/home.png'), path: '/app/index' },
  { name: 'Bookings', icon: require('@/assets/images/navBar/bookings.png'), path: '/booking/[id]' },
  { name: 'Favorites', icon: require('@/assets/images/navBar/favorites.png'), path: '/favorite/[id]' },
  { name: 'Profile', icon: require('@/assets/images/navBar/profile.png'), path: '/profile/[id]' },
];

export function NavigationBar({ style }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const colors = useThemeColors();
  const router = useRouter(); // Initialiser le routeur

  const handlePress = (item, index) => {
    setActiveIndex(index); // Mettre à jour l'état actif

    if (item.path) {
      // Redirection via expo-router
      //router.push(item.path.replace('[id]', '123')); // Remplacer [id] par un identifiant dynamique
      router.push(item.path); // Remplacer [id] par un identifiant dynamique
    }
  };

  return (
    <View style={[styles.container, style]}>
      {NAV_ITEMS.map((item, index) => (
        <TouchableOpacity
          key={item.name}
          style={styles.button}
          onPress={() => handlePress(item, index)}
          accessible={true}
          accessibilityLabel={`Navigate to ${item.name}`}
        >
          <View style={styles.interactiveContainer}>
            <Image
              source={item.icon}
              style={[
                styles.icon,
                { tintColor: activeIndex === index ? colors.blue : colors.gray },
              ]}
            />
            <View
              style={[
                styles.indicator,
                activeIndex === index && { backgroundColor: colors.blue },
              ]}
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 58,
  },
  button: {
    alignItems: 'center',
    flex: 1,
  },
  interactiveContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: "center",
  },
  icon: {
    width: 29,
    height: 24,
  },
  indicator: {
    height: 2,
    width: 20,
    marginTop: 4,
    borderRadius: 10,
  },
});
