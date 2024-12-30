import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ThemedText } from "@/components/ThemedText";

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
      <ThemedText variant="textstyle2" color={ isSelected ? 'white' : 'text2' }>
        {day}
      </ThemedText>
      <ThemedText variant="headline4" color={ isSelected ? 'white' : 'text1' }>
        {date}
      </ThemedText>
      <ThemedText variant="subtitle1" color={ isSelected ? 'white' : 'text3' }>
        {time}
      </ThemedText>
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

});
