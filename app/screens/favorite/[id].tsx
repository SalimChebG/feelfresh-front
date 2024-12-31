import React, { useState } from 'react';
import { useThemeColors } from "@/hooks/useThemeColors";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from '@/components/ThemedText';

import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import des icônes

const Favorite = () => {
  const colors = useThemeColors();
  const [favorites, setFavorites] = useState([
    {
      id: '1',
      name: 'Salon de Beauté Luxe',
      address: '123 Rue de Paris, 75000 Paris',
      image: require("@/assets/images/8.png"),
    },
    {
      id: '2',
      name: 'Relax & Style',
      address: '456 Avenue de Lyon, 69000 Lyon',
      image: require("@/assets/images/8.png"),
    },
    {
      id: '3',
      name: 'Chic & Charm',
      address: '789 Boulevard Saint-Michel, 75005 Paris',
      image: require("@/assets/images/8.png"),
    },
    {
      id: '4',
      name: 'Glamour Studio',
      address: '321 Avenue des Champs-Élysées, 75008 Paris',
      image: require("@/assets/images/8.png"),
    },
    {
      id: '5',
      name: 'Relaxation Spa',
      address: '654 Rue de Lille, 59000 Lille',
      image: require("@/assets/images/8.png"),
    },
    {
      id: '6',
      name: 'Beauty Secrets',
      address: '987 Rue de la République, 69001 Lyon',
      image: require("@/assets/images/8.png"),
    },
    {
      id: '7',
      name: 'Hair & Care',
      address: '432 Rue de Strasbourg, 67000 Strasbourg',
      image: require("@/assets/images/8.png"),
    },
    {
      id: '8',
      name: 'Oasis Beauté',
      address: '123 Rue de Nantes, 44000 Nantes',
      image: require("@/assets/images/8.png"),
    },
    {
      id: '9',
      name: 'Zenitude Spa',
      address: '567 Boulevard Haussmann, 75009 Paris',
      image: require("@/assets/images/8.png"),
    },
    {
      id: '10',
      name: 'Éclat Beauté',
      address: '890 Avenue Jean Médecin, 06000 Nice',
      image: require("@/assets/images/8.png"),
    },
  ]);

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => prevFavorites.filter((salon) => salon.id !== id));
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={[styles.bookingCard, { backgroundColor: colors.background.card }]}>
      <Row style={styles.mainRow}>
        <Image
          source={item.image}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Information Section */}
        <Row style={styles.infoContainer}>
          <ThemedText variant="subtitle2" color="text1">
            {item.name}
          </ThemedText>

          {/* Address Row */}
          <Row style={styles.Row}>
            <Image
              source={require("@/assets/images/salon/map-pin-gray.png")}
              style={{ width: 18, height: 18 }}
            />
            <ThemedText variant="textstyle1" color="text2">
              {item.address}
            </ThemedText>
          </Row>
        </Row>
      </Row>

      {/* Icône du cœur pour suppression */}
      <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
        <Ionicons name="heart" size={28} color={colors.red} style={styles.heartIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <RootView style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderFavoriteItem}
        ListEmptyComponent={() => (
          <ThemedText variant="textstyle1" color="text2" style={styles.emptyMessage}>
            You have no favorite salons.
          </ThemedText>
        )}
      />
    </RootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  bookingCard: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heartIcon: {
    marginRight: 16, // Espace entre l'icône et le contenu textuel
    marginTop: 4, // Alignement vertical
  },
  infoContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
    alignItems: 'flex-start',
  },
  mainRow: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
    alignItems: 'flex-start',
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  emptyMessage: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
});

export default Favorite;
