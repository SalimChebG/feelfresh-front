import { Platform, View, Image, type ViewProps, StyleSheet } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Row } from "@/components/Row";
import {ThemedText} from "@/components/ThemedText"


type Props = ViewProps;

export function HomeHeader({ style, ...rest }: Props) {
  const colors = useThemeColors();

  return (
  <Row style={styles.header} gap={120}>
    <ThemedText  variant="headline" color="text" >
        feelFresh
    </ThemedText>
    <View style={[style, styles.roundedContainer, { backgroundColor: colors.background.primary }]} {...rest}>
      {/* Conteneur carré avec "stroke" à l'intérieur */}
        <Image
          source={require("@/assets/images/homeScreen/notification-bing.png")}
          style={styles.bing}
        />
        <Image
          source={require("@/assets/images/homeScreen/Dot.png")}
          style={styles.dot}
        />
    </View>
  </Row>
  );
}


const styles = StyleSheet.create({
  roundedContainer: {
    width: 44,
    height: 44,
    borderRadius: 10, // Rayon pour les bords arrondis
    justifyContent: "center", // Centrer les éléments verticalement
    alignItems: "center", // Centrer les éléments horizontalement
    borderWidth: 1, // Largeur du contour
    borderColor: "#F5F5F5", // Couleur du contour (simule un stroke)
    flexDirection: "row", // Si d'autres éléments sont ajoutés, ils seront en ligne
    alignItems: "center",
  },
  bing: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  dot: {
    width: 8,
    height: 8,
    resizeMode: "contain",
    position: "absolute", // Permet de positionner l'image dot par rapport au conteneur
    top: 10, // Ajustez pour positionner en haut à droite du carré
    right: 10, // Ajustez pour positionner en haut à droite du carré
  },

  header: {
      paddingHorizontal: 30,
      paddingVertical: 4,
      flexDirection: 'row', // Par défaut sur mobile
      alignItems: 'center',
      marginBottom: Platform.OS === "web" ? 22 : 0, // Add margin for web version for better positioning
      marginTop: Platform.OS === "web" ? 22 : 0, // Add margin for web version for better positioning

      },
});
