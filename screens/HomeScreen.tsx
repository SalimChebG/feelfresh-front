// src/screens/HomeScreen.tsx
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Button } from '@/components/Button'; // Assurez-vous que le chemin est correct
import { useNavigation } from '@react-navigation/native'; // Pour la navigation entre les écrans
import { ThemedText } from '@/components/ThemedText'; // Si tu as ce composant personnalisé

export default function HomeScreen() {
  const navigation = useNavigation();

  // Exemple de fonction pour la navigation
  const goToBookingPage = () => {
    navigation.navigate('BookingPage'); // Remplace par le nom de ton écran de réservation
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title">Bienvenue sur l'Application de Réservation</ThemedText>
      <Button title="Réserver maintenant" onPress={goToBookingPage} />
      {/* Tu peux ajouter plus de contenu ici, comme des étapes ou des informations */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
