import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useThemeColors } from "@/hooks/useThemeColors";

const NAV_ITEMS = [
  { name: 'Home', icon: require('@/assets/images/navBar/home.png') },
  { name: 'Bookings', icon: require('@/assets/images/navBar/bookings.png') },
  { name: 'Favorites', icon: require('@/assets/images/navBar/favorites.png') },
  { name: 'Profile', icon: require('@/assets/images/navBar/profile.png') },
];

export function NavigationBar({ style }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const colors = useThemeColors();

  return (
    <View style={[styles.container, style]}>
      {NAV_ITEMS.map((item, index) => (
        <TouchableOpacity
          key={item.name}
          style={styles.button}
          onPress={() => setActiveIndex(index)}
          accessible={true}
          accessibilityLabel={`Navigate to ${item.name}`}
        >
          {/* Vue englobant les éléments interactifs qui occupe tout l'espace */}
          <View style={styles.interactiveContainer}>
            <Image
              source={item.icon}
              style={[
                styles.icon,
                { tintColor: activeIndex === index ? colors.blue : '#787076' },
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
    flex: 1, // Ce qui permet à chaque bouton de prendre toute la largeur disponible
  },
  interactiveContainer: {
    alignItems: 'center', // Centrer verticalement les éléments (icône + indicateur)
    flex: 1, // Occupation de tout l'espace disponible dans le parent
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
