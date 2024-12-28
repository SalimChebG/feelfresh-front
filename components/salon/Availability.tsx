import React from "react";
import { Platform, Pressable, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import {useThemeColors} from "@/hooks/useThemeColors"

// Déclaration du type des props pour le composant
type AvailabilityProps = {
  availabilities: { date: string; time: string; isAvailable: boolean }[];
};

export function  Availability ({ availabilities })  {
  // Filtrage des créneaux en fonction du moment de la journée
  const colors = useThemeColors()
  const matinSlots = availabilities.filter((slot) => slot.time === "matin");
  const apresMidiSlots = availabilities.filter((slot) => slot.time === "après-midi");

  // Rendu des créneaux par moment
  const renderSlots = (slots: { date: string; time: string; isAvailable: boolean }[]) => {
    return slots.map((slot, index) => (
      <Pressable
        key={`${slot.date}-${slot.time}`} // Assure une clé unique
        style={({ pressed })=>[
          styles.button,
          slot.isAvailable ? {backgroundColor: colors.blue} : {backgroundColor: colors.graythin} ,
        ]}
        disabled={slot.isAvailable}
      >
        <ThemedText
        variant='textstyle1'
          style={[
            slot.isAvailable ? {color: colors.white} : {color: colors.gray} ]}>
          {slot.date}
        </ThemedText>
      </Pressable>
    ));
  };

  return (
    <Row style={styles.container}>
      {/* Section Matin */}
      <Row style={[styles.row, {gap:10}]}>
          <ThemedText variant='subtitle2' color='gray' >Matin</ThemedText>
          <ThemedText variant='subtitle2' color='gray'>Après-midi</ThemedText>

      </Row>
      {/* Section Après-Midi */}
      <Row style={styles.row}>
          <View style={styles.slot}>{renderSlots(apresMidiSlots)}</View>
          <View style={styles.slot}>{renderSlots(matinSlots)}</View>
      </Row>
    </Row>
  );
};

const styles = StyleSheet.create({
container: {
  paddingHorizontal: 20, // Correct pour le padding horizontal
  width: '100%',
},

  row: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 10,
  },


  slot: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  button: {
    //padding: 7,
    padding: Platform.OS === "ios" ? 7 : 3,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },

});
