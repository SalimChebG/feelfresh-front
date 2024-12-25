import { Text, type ViewProps, View, Image, StyleSheet } from "react-native";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";

//const colors = useThemeColors();

type Props = ViewProps & {
  gap?: number;
};

export function CoupeCheveux({ style, gap, ...rest }: Props) {
  return (
    <View style={[ styles.frame, style]} {...rest}>
      <Row style={[styles.row, style, gap ? { gap } : undefined]} >
        <Image
          source={require('@/assets/images/services/coupe-cheveux.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <ThemedText color="white" variant="servicefont">
          {"Coupe"}
        </ThemedText>
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: 93, // Largeur
    height: 40, // Hauteur
    borderRadius: 8, // Coins arrondis
    paddingHorizontal: 8, // Padding horizontal
    justifyContent: "center", //  pour centrer verticalement dans le conteneur principal.
    alignItems: "center", // Centrer horizontalement dans le View
  },

  row: {
    flexDirection: "row", // Mettre les éléments en ligne
  },

  image: {
    width: 18, // Largeur de l'image
    height: 18, // Hauteur de l'image
    marginRight: 8, // Espacement entre l'image et le texte
  },
});
