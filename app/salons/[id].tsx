import React, { useState } from "react";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Row } from "@/components/Row";
import { Prestation } from "@/components/salon/Prestation";
import { filteredSalons } from "@/constants/SetTestSalons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getSalonById } from "@/functions/salon";
import { ThemedText } from "@/components/ThemedText"; // Importation de ThemedText
import {RootView} from "@/components/RootView"
import BackButton from "@/components/buttons/BackButton";

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
    <RootView>
      <View style={styles.header}>
          <BackButton />
          <ThemedText variant='headline' style={[styles.title, { color: colors.text1 }]}></ThemedText>
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


      <ScrollView >
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
    </RootView>
  );
}

const styles = StyleSheet.create({
  // App Bar container
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 0,
      justifyContent: "space-between", // Espacement des éléments (icônes)

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
    borderRadius:15,
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
