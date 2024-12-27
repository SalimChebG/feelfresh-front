import React from "react";
import { Pressable, Text, StyleSheet, Touchable, TouchableOpacity } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

type ContinueButtonProps = {
  isEnabled: boolean;
  onPress: () => void;
  label: string; // Propriété ajoutée pour personnaliser le texte
};

export default function ContinueButton({ isEnabled, onPress, label }: ContinueButtonProps) {
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: isEnabled ? colors.blue : colors.grayDisabledButton },
      ]}
      disabled={!isEnabled}
      onPress={onPress}
      // Ajout de l'effet d'opacité lors du clic
      //android_ripple={{ color: colors.gray, borderless: true }} // effet de ripple sous Android
      activeOpacity={0.6} // Réduction de l'opacité lors du clic
    >
      <Text
        style={[
          styles.buttonText,
          { color: isEnabled ? colors.white : colors.gray },
        ]}
      >
        {label} {/* Texte du bouton rendu dynamiquement */}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 343,
    height: 48,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
    alignSelf: "center",
    justifyContent: "space-around",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
