import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  Dimensions,
} from 'react-native';
import { Colors } from '../../constants/Colors.ts';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [reservationMessage, setReservationMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleReservation = () => {
    setReservationMessage('Votre réservation a été initiée avec succès !');
  };

  const handleSearch = () => {
    console.log('Recherche pour :', searchQuery);
    // Ajoute ici une logique pour chercher dans ta liste de salons
  };

  return (
    <View style={styles.container}>
      {/* Fond d'écran */}
      <Image
        source={require('@/assets/images/background2.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Contenu de l'écran */}
      <View style={styles.overlay}>
        <Text style={styles.title}>Réservez votre expérience beauté</Text>

        {/* Barre de recherche */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un salon de coiffure"
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Rechercher</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.description}>
          Découvrez notre service de réservation simplifié et faites vos choix facilement.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleReservation}>
          <Text style={styles.buttonText}>Réserver maintenant</Text>
        </TouchableOpacity>

        {reservationMessage ? (
          <Text style={styles.reservationMessage}>{reservationMessage}</Text>
        ) : null}
      </View>

      {/* Navigation conditionnelle */}
      {Platform.select({
        web: (
          <View style={styles.webNavbar}>
            <TouchableOpacity style={styles.navButton} onPress={() => console.log('Home Web')}>
              <Text style={styles.navButtonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={() => console.log('Explore Web')}>
              <Text style={styles.navButtonText}>Explore</Text>
            </TouchableOpacity>
          </View>
        ),
        default: (
          <View style={styles.mobileNavbar}>
            <TouchableOpacity style={styles.navButton} onPress={() => console.log('Home Mobile')}>
              <Text style={styles.navButtonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={() => console.log('Explore Mobile')}>
              <Text style={styles.navButtonText}>Explore</Text>
            </TouchableOpacity>
          </View>
        ),
      })
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImageOld: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    aspectRatio: Platform.OS === 'web' ? 16 / 9 : 9 / 16,
  },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      resizeMode: 'cover', // Assure que l'image s'étire pour couvrir tout l'espace
    },

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  reservationMessage: {
    marginTop: 20,
    fontSize: 16,
    color: '##ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
    color: '#000',
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  webNavbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#6200EE',
    paddingVertical: 10,
  },
  mobileNavbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#6200EE',
    paddingVertical: 15,
  },
  navButton: {
    padding: 5,
  },
  navButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
