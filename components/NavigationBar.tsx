// components/NavigationBar.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const NAV_ITEMS = [
  { name: 'Home', icon: require('@/assets/images/navBar/home.png') },
  { name: 'Bookings', icon: require('@/assets/images/navBar/bookings.png') },
  { name: 'Favorites', icon: require('@/assets/images/navBar/favorites.png') },
  { name: 'Profile', icon: require('@/assets/images/navBar/profile.png') },
];

export function NavigationBar() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      {NAV_ITEMS.map((item, index) => (
        <TouchableOpacity
          key={item.name}
          style={styles.button}
          onPress={() => setActiveIndex(index)}
          accessible={true}
          accessibilityLabel={`Navigate to ${item.name}`}
        >
          <Image
            source={item.icon}
            style={[
              styles.icon,
              { tintColor: activeIndex === index ? '#0a7ea4' : '#787076' },
            ]}
          />
          <View style={[styles.indicator, activeIndex === index && styles.activeIndicator]} />
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
    backgroundColor: '#fff', // Change as needed
  },
  button: {
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  indicator: {
    height: 2,
    width: 20,
    backgroundColor: 'transparent',
    marginTop: 4,
  },
  activeIndicator: {
    backgroundColor: '#0a7ea4',
  },
});
