import React, { useState } from "react";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Row } from "@/components/Row";
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

import { ThemedText } from "@/components/ThemedText"; // Importation de ThemedText

const menu = {
  "Prendre RDV": [
    {
      name: "Basic Hair Cut",
      description: "A classic haircut tailored to your style. Whether you want a trim or a new look, this service is perfect for a fresh, clean appearance.",
      price: "10.00 €",
      duration: "30 mins"
    },
    {
      name: "Hair Wash",
      description: "A refreshing hair wash to remove buildup and restore your hair's natural shine. Enjoy a relaxing scalp massage during the process.",
      price: "5.00 €",
      duration: "45 mins"
    },
    {
      name: "Barbe",
      description: "A beard grooming session that includes trimming, shaping, and styling. Leave with a polished and well-maintained beard.",
      price: "12.00 €",
      duration: "2h"
    },
    {
      name: "Nails",
      description: "Get your nails done with a professional manicure or pedicure. From basic care to more elaborate designs, this service ensures your nails look flawless.",
      price: "12.00 €",
      duration: "1h 15min"
    },
  ],
  "Avis": [
    // Optionally, you can add some items here if needed in the future.
  ],
  "A-propos": [
    // Optionally, you can add some items here if needed in the future.
  ],
};

const { width } = Dimensions.get("window");

export default function SalonDetailsScreen() {

  const colors = useThemeColors();
  const [activeTab, setActiveTab] = useState("Prendre RDV");
  const [isFavorite, setIsFavorite] = useState(false); // état pour gérer l'icône favoris
  const [isClickedBack, setIsClickedBack] = useState(false); // état pour l'icône retour

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
              <ThemedText variant="headline2" color="text1" style={{marginRight: 4, marginTop: 4}}>Hair Avenue</ThemedText>
              <Row style={styles.detailGrid}>
                <Image source={require("@/assets/images/salon/map-pin-gray.png")} style={{ width: 18, height: 18 }} />
                <ThemedText variant="textstyle1" color="text2" style={{ marginRight: 4, marginTop: 4 }}>
                  No 03, Kadalana Road, Kadulana, Moratuwa
                </ThemedText>
              </Row>

             <Row style={styles.detailGrid}>
               <Image source={require("@/assets/images/salon/clock.png")} style={{ width: 18, height: 18 }} />
               <ThemedText variant="textstyle1" color="text2" >
                 9AM - 10PM, Mon-Sun
               </ThemedText>
             </Row>

            <Row style={styles.detailGrid}>
              <Image source={require("@/assets/images/salon/star.png")} style={{ width: 18, height: 18 }} />
              <ThemedText variant="textstyle1" color="text2" style={{ marginRight: 4, marginTop: 4 }}>
                4.7
              </ThemedText>
              <ThemedText variant="textstyle1" color="text2" style={{ marginRight: 4, marginTop: 4 }}>
                (312 Reviews)
              </ThemedText>
            </Row>
        </View>

        {/* Tabs */}
        <View style={[styles.tabsContainer,{borderBottomColor: colors.graythin}]}>
          {Object.keys(menu).map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tabItem, activeTab === tab && {borderBottomColor: "blue", borderBottomWidth: 2}]}
            >
              <ThemedText variant="textstyle2" color={activeTab === tab ? "blue" : "gray"} style={styles.tabText}>
                {tab}
              </ThemedText>
            </Pressable>
          ))}
        </View>

        {/* menu List */}
        <View style={styles.menuList}>
          {menu[activeTab].map((service, index) => (
            <View key={index} style={styles.serviceItem}>
              <ThemedText variant="body1" color="text">{service.name}</ThemedText>
              <View style={styles.serviceDetails}>
                <ThemedText variant="body2" color="accent" style={styles.servicePrice}>{service.price}</ThemedText>
                <ThemedText variant="body2" color="gray" style={styles.serviceDuration}>{service.duration}</ThemedText>
              </View>
            </View>
          ))}
        </View>
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
