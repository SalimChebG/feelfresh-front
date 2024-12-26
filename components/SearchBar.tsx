import { Platform, TextInput, View, StyleSheet, Image } from "react-native";
import { Row } from "@/components/Row";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useTranslation } from "react-i18next"; // Import du hook de traduction
import i18n from 'i18next';

type Props = {
  value: string;
  onChange: (s: string) => void;
};

export function SearchBar({ value, onChange }: Props) {
  const colors = useThemeColors();
  const { t , i18n} = useTranslation(); // Hook pour les traductions

  console.log("Current language:", i18n.language);
  console.log("Translations:", i18n.t('search_placeholder'));

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
          placeholder = {t("search_placeholder")} // Utilisation de la traduction
          placeholderTextColor={colors.textHolder} // Correctement placé
        />
    </Row>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    //flexDirection: "row", //added
    //alignItems: "center",
    //justifyContent: "space-between",
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
