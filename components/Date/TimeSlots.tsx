import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

type TimeSlotProps = {
  slots: string[]; // Exemple: ["10:00 AM", "11:30 AM"]
  selectedSlot: string | null;
  onSelect: (slot: string) => void;
};

export default function TimeSlots({ slots, selectedSlot, onSelect }: TimeSlotProps) {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      {slots.map((slot) => (
        <Pressable
          key={slot}
          style={[
            styles.slot,
            {
              backgroundColor: selectedSlot === slot ? colors.blue : colors.white,
              borderColor: selectedSlot === slot ? colors.blue : colors.gray,
            },
          ]}
          onPress={() => onSelect(slot)}
        >
          <Text style={[styles.text, { color: selectedSlot === slot ? colors.white : colors.text1 }]}>
            {slot}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  slot: {
    padding: 12,
    borderWidth: 2,
    borderRadius: 8,
    margin: 4,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 80,
  },
  text: {
    fontSize: 14,
  },
});
