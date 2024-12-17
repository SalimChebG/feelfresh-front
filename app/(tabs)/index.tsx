import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import { Colors } from '../../constants/Colors.ts';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [coiffeurs, setCoiffeurs] = useState([]); // Liste des coiffeurs filtrés
  const [allCoiffeurs, setAllCoiffeurs] = useState([]); // Liste complète des coiffeurs
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reservationMessage, setReservationMessage] = useState(''); // Ajout de l'état reservationMessage

  // Fonction pour récupérer les coiffeurs depuis l'API
  const fetchCoiffeurs = async () => {
    setIsLoading(true); // Début du chargement
    setError(null); // Réinitialiser l'erreur

    try {
      const response = await fetch('http://localhost:3000/coiffeurs');
      const data = await response.json();
      setAllCoiffeurs(data); // Stocke tous les coiffeurs dans l'état
    } catch (error) {
      setError('Erreur lors de la récupération des coiffeurs');
      console.error("Erreur lors de la récupération des coiffeurs:", error);
    } finally {
      setIsLoading(false); // Fin du chargement
    }
  };

  // Fonction de recherche et filtrage
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setCoiffeurs(allCoiffeurs); // Si la recherche est vide, montre tous les coiffeurs
    } else {
      const filteredCoiffeurs = allCoiffeurs.filter(coiffeur =>
        coiffeur.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setCoiffeurs(filteredCoiffeurs); // Mise à jour des coiffeurs filtrés
    }
  };

  // Fonction pour rendre chaque item de la liste des coiffeurs
  const renderCoiffeurItem = ({ item }) => (
    <View style={styles.coiffeurItem}>
      <TouchableOpacity
        onPress={() => console.log('Naviguer vers les détails du coiffeur avec ID:', item.id)}
        style={styles.coiffeurLink}>
        <Text style={styles.coiffeurText}>{`${item.name} - ${item.salon} - ${item.service}`}</Text>
      </TouchableOpacity>
    </View>
  );

  // Utiliser useEffect pour charger les coiffeurs dès le début
  useEffect(() => {
    fetchCoiffeurs();
  }, []); // Le tableau vide [] indique que cet effet ne sera exécuté qu'une fois au montage du composant

  const handleReservation = () => {
    setReservationMessage('Votre réservation a été initiée avec succès !');
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

        {/* Affichage des résultats de recherche uniquement après clic sur le bouton Rechercher */}
        {isLoading ? (
          <Text style={styles.loadingText}>Chargement...</Text>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <FlatList
            data={coiffeurs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCoiffeurItem}
            style={styles.resultsList}
          />
        )}

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
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
  loadingText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
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
    color: '#ffffff',
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
  coiffeurItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  coiffeurLink: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  coiffeurText: {
    fontSize: 16,
    color: '#333',
  },
  resultsList: {
    width: '100%',
  },
  webNavbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 20,
  },
  mobileNavbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navButton: {
    paddingVertical: 10,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
