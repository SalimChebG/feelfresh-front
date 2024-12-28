import React, { useState } from "react";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Row } from "@/components/Row";
import { Prestation } from "@/components/salon/Prestation";
import { filteredSalons } from "@/constants/SetTestSalons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getSalonById } from "@/functions/salon";
import { ThemedText } from "@/components/ThemedText"; // Importation de ThemedText

import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
  StatusBar,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Alert, // Pour simuler un retour en arrière
} from "react-native";

const { width } = Dimensions.get("window");

export default function SalonDetailsScreen() {
  const colors = useThemeColors();
  const [isFavorite, setIsFavorite] = useState(false); // état pour gérer l'icône favoris
  const [isClickedBack, setIsClickedBack] = useState(false); // état pour l'icône retour
    const router = useRouter();
    const {id}= useLocalSearchParams();
    const salon = getSalonById(filteredSalons, id);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite); // Toggle favori
  };

  const handleBack = () => {
    setIsClickedBack(true); // Effet de clic sur la flèche
    setTimeout(() => {
      setIsClickedBack(false); // Réinitialisation après un délai pour simuler le clic
      // Remplacer le Alert par la navigation réelle selon votre bibliothèque de navigation
      Alert.alert("Retour", "Retour à la page précédente");
    }, 200);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {/* App Bar */}
      <View style={styles.appBar}>
        {/* Back Button */}
        <TouchableOpacity onPress={handleBack} style={styles.iconContainer}>
          <Image
            source={require("@/assets/images/salon/arrow-left.png")}
            style={[styles.icon, isClickedBack && { opacity: 0.5 }]} // Change l'opacité quand la flèche est cliquée
          />
        </TouchableOpacity>

        {/* Favorite Button */}
        <TouchableOpacity onPress={handleFavorite} style={styles.iconContainer}>
          <Image
            source={
              isFavorite
                ? require("@/assets/images/salon/favoris-icon-filled.png") // Cœur rempli
                : require("@/assets/images/salon/favoris-icon.png") // Cœur vide
            }
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingTop: 0 }}>
        {/* Header Image */}
        <Image
          source={require("@/assets/images/8.png")}
          style={styles.headerImage}
        />

        {/* Salon Information */}
        <View style={styles.infoSection}>
              <ThemedText variant="headline2" color="text1" style={{marginRight: 4, marginTop: 4}}>{salon.name}</ThemedText>
              <Row style={styles.detailGrid}>
                <Image source={require("@/assets/images/salon/map-pin-gray.png")} style={{ width: 18, height: 18 }} />
                <ThemedText variant="textstyle1" color="text2" style={{ marginRight: 4, marginTop: 4 }}>
                  {salon.address}
                </ThemedText>
              </Row>

             <Row style={styles.detailGrid}>
               <Image source={require("@/assets/images/salon/clock.png")} style={{ width: 18, height: 18 }} />
               <ThemedText variant="textstyle1" color="text2" >
                 {salon.openingHours}
               </ThemedText>
             </Row>

            <Row style={styles.detailGrid}>
              <Image source={require("@/assets/images/salon/star.png")} style={{ width: 18, height: 18 }} />
              <ThemedText variant="textstyle1" color="text2" style={{ marginRight: 4, marginTop: 4 }}>
               {salon.rate}
              </ThemedText>
              <ThemedText variant="textstyle1" color="text2" style={{ marginRight: 4, marginTop: 4 }}>
                ({salon.reviewsNumber} Reviews)
              </ThemedText>
            </Row>
        </View>

        <Prestation>
        </Prestation>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  // App Bar container
  appBar: {
    height: 44,
    position: "absolute", // Fixe l'AppBar en haut
    top: 54,
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: "row", // Disposition horizontale des icônes
    justifyContent: "space-between", // Espacement des éléments (icônes)
    alignItems: "center", // Centrer verticalement les icônes
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10, // Bordure arrondie
    justifyContent: "center",
    alignItems: "center",
    position: "relative", // Nécessaire pour positionner l'image à l'intérieur
    borderWidth: 1, // Largeur du contour
    borderColor: "#F5F5F5", // Couleur du contour (simule un "stroke")
    overflow: "hidden", // Pour que l'effet de bordure fonctionne bien
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  headerImage: {
    width: "100%",
    height: width * 0.56,
    resizeMode: "cover",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: 40, // Ajoute un espacement entre l'AppBar et l'image
  },
  infoSection: {
    padding: 16,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },

  tabsContainer: {
    //flex:1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
    borderBottomWidth: 1,
  },


  menuList: {
    padding: 16,
  },
  serviceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    alignItems: "center",
  },

  serviceDetails: {
    alignItems: "flex-end",
  },

  detailGrid: {
      marginTop: 4,
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: "null",
      gap: 4,
      },

    tabItem: {
      flex: 1, // Assure une largeur égale pour tous les onglets
      alignItems: "center",
      paddingVertical: 8,
    },
});
