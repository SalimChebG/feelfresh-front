import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

type DateCardProps = {
  date: string; // Exemple: "Mon, Dec 25"
  isSelected: boolean;
  onSelect: () => void;
};

export default function DateCard({ date, isSelected, onSelect }: DateCardProps) {
  const colors = useThemeColors();

  return (
    <Pressable
      style={[
        styles.card,
        {
          backgroundColor: isSelected ? colors.blue : colors.white,
          borderColor: isSelected ? colors.blue : "transparent",
        },
      ]}
      onPress={onSelect}
    >
      <Text style={[styles.date, { color: isSelected ? colors.white : colors.text1 }]}>
        {date}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    //minWidth: 80,
    elevation:6,
  },
  date: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
