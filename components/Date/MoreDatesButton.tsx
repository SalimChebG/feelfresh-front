import React from "react";
import { Pressable, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

type MoreDatesButtonProps = {
  onPress: () => void;
};

export default function MoreDatesButton({ onPress }: MoreDatesButtonProps) {
  const colors = useThemeColors();

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: colors.blue }]} onPress={onPress} activeOpacity={0.6} >
      <Text style={[styles.text, { color: colors.white }]}>More Dates</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
