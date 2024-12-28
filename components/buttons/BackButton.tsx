// @/components/BackButton.tsx

import React from "react";
import { Pressable, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

type BackButtonProps = {
  onPress?: () => void; // Optionnel, permet d'ajouter une action personnalisée
};

export default function BackButton({ onPress }: BackButtonProps) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack(); // Retourne à la page précédente
    }
  };

  return (
    <Pressable onPress={handlePress} style={styles.button}>
      <Image
        source={require("@/assets/images/arrow-left.png")} // Ajouter une icône de flèche dans assets/icons
        style={styles.icon}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
});
