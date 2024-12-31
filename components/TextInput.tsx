import React, { useState } from "react";
import { View, TextInput as RNTextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Assurez-vous que `expo/vector-icons` est installé
import { useThemeColors } from "@/hooks/useThemeColors";

interface TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  isPassword?: boolean;
  style?: object;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "decimal-pad" | "visible-password"; // Ajouter le keyboardType ici
}

export default function TextInput({
  placeholder,
  value,
  onChangeText,
  isPassword = false,
  style = {},
  keyboardType = "default", // Valeur par défaut
}: TextInputProps) {
  const colors = useThemeColors();
  const [isSecure, setIsSecure] = useState(isPassword); // État pour basculer l'affichage du mot de passe

  return (
    <View style={[styles.container, { backgroundColor: colors.white }, style]}>
      <RNTextInput
        style={[styles.input, { color: colors.text1 }]}
        placeholder={placeholder}
        placeholderTextColor={colors.textHolder}
        secureTextEntry={isSecure}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType} // Ajout de la gestion du keyboardType
        //textContentType={isPassword ? "none" : "none"}
      />
      {isPassword && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setIsSecure(!isSecure)}
        >
          <Ionicons
            name={isSecure ? "eye-off" : "eye"}
            size={20}
            color={colors.text1}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 16,
    marginVertical: 8,
    elevation: 1,
    flex:1,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  iconContainer: {
    marginLeft: 8,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
});
