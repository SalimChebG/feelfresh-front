import { View, Image, type ViewProps, StyleSheet } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = ViewProps;

export function HomeHeader({ style, ...rest }: Props) {
  const colors = useThemeColors();

  return (
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
  );
}

const styles = StyleSheet.create({
  roundedContainer: {
    width: 44,
    height: 44,
    borderRadius: 10, // Rayon pour les bords arrondis
    justifyContent: "center", // Centrer les éléments verticalement
    alignItems: "center", // Centrer les éléments horizontalement
    position: "relative", // Nécessaire pour le positionnement absolu de l'image dot
    borderWidth: 1, // Largeur du contour
    borderColor: "#F5F5F5", // Couleur du contour (simule un stroke)
    overflow: "hidden", // Pour s'assurer que l'effet de border est bien appliqué à l'intérieur
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
});
