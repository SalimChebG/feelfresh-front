import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ThemedText } from "@/components/ThemedText";

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
          <ThemedText  color ={ selectedSlot === slot ? 'white' : 'text1' }>
            {slot}
          </ThemedText>
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
    borderRadius: 8,
    margin: 2,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 80,
    elevation:3,
  },
  text: {
    fontSize: 14,
  },
});
