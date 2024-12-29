import React from "react";
import { Pressable, Text, StyleSheet, Image } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

type MoreDatesButtonProps = {
  onPress: () => void;
};

export default function MoreDatesButton({ onPress }: MoreDatesButtonProps) {
  const colors = useThemeColors();

  return (
    <Pressable
      style={[
        styles.card,
        {
          backgroundColor: colors.white,
          borderColor: "transparent",
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 2 },
          shadowColor: colors.blue,
        },
      ]}
      onPress={onPress}
    >
      <Image
        source={require("@/assets/images/calendrier-icon.png")} // Ajouter une icône de calendrier dans assets/icons
        style={styles.icon}
      />
      <Text style={[styles.text, { color: colors.text1 }]}>More Dates</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {

    width: 83,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3, // Android shadow
    flexDirection: "column", // Alignement vertical (icône au-dessus du texte)
    flexShrink: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8, // Espacement entre l'icône et le texte
  },
  icon: {
    width: 24,
    height: 24,
  },
});
