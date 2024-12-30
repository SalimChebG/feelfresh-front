import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

type DateCardProps = {
  day: string; // Exemple: "TUE"
  date: string; // Exemple: "Sep 10"
  isSelected: boolean;
  onSelect: () => void;
  time: string; // Exemple: "40 mins"
};

export default function DateCard({ day, date, isSelected, onSelect, time }: DateCardProps) {
  const colors = useThemeColors();

  return (
    <Pressable
      style={[
        styles.card,
        {
          backgroundColor: isSelected ? colors.blue : colors.white,
          borderColor: isSelected ? colors.blue : "transparent",
          shadowOpacity: isSelected ? 0.3 : 0,
          shadowOffset: isSelected ? { width: 0, height: 2 } : undefined,
          shadowColor: isSelected ? colors.blue : undefined,
        },
      ]}
      onPress={onSelect}
    >
      <Text style={[styles.day, { color: isSelected ? colors.white : colors.text2 }]}>
        {day}
      </Text>
      <Text style={[styles.date, { color: isSelected ? colors.white : colors.text1 }]}>
        {date}
      </Text>
      <Text style={[styles.time, { color: isSelected ? colors.white : colors.text3 }]}>
        {time}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    //borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    //minWidth: 80,
    elevation: 3, // Android shadow

  },
  day: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase", // Pour correspondre à "TUE"
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
  },
  time: {
    fontSize: 12,
    marginTop: 4,
  },
});
