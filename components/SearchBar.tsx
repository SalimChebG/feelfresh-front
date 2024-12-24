import { Platform, TextInput, View, StyleSheet, Image } from "react-native";
import { Row } from "@/components/Row";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
  value: string;
  onChange: (s: string) => void;
};

export function SearchBar({ value, onChange }: Props) {
  const colors = useThemeColors();

  return (

    <Row gap={8} style={[styles.wrapper, { backgroundColor: colors.background.tertiary }]}>
          <Image
            source={require("@/assets/images/homeScreen/search-loop.png")}
            style={styles.icon}
          />
        <TextInput
          style={styles.input}
          onChangeText={onChange}
          value={value}
          placeholder="Rechercher"
          placeholderTextColor={colors.textHolder} // Correctement placé
        />
    </Row>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row", //added
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 16,
    paddingHorizontal: 12,
    marginBottom: Platform.OS === "web" ? 16 : 0, // Add margin for web version for better positioning
      width: '100%', // Largeur
      height: 48, // Hauteur
      borderRadius: 10, // Rayon des coins
      position: 'absolute', // Position absolue
  },

    input: {
      flex: 1,
      height: 48, // Ensuring TextInput height fits well on mobile and web
      fontSize: Platform.OS === "web" ? 16 : 14, // Adjust font size for web
      lineHeight: Platform.OS === "web" ? 20 : 16, // Adjust line height for web
      paddingHorizontal: 16,
    },
});
