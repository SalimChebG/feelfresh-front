import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ThemedText } from "@/components/ThemedText";

type StylistCardProps = {
  stylist: {
    id: string;
    name: string;
    role: string;
    image?: any; // Image peut être optionnelle
    topRated: boolean;
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
};

export default function StylistViewCard({ stylist, isSelected, onSelect }: StylistCardProps) {
  const colors = useThemeColors();

  // Fonction pour extraire la première lettre du nom
  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  return (
    <Pressable
      style={[
        styles.card,
        {
          backgroundColor: isSelected ? colors.white : colors.white,
          borderColor: isSelected ? colors.blue : "transparent",
        },
      ]}
      onPress={() => onSelect(stylist.id)}
    >
      {stylist.image ? (
        <Image source={stylist.image} style={styles.image} />
      ) : (
        <View style={[styles.imagePlaceholder, { backgroundColor: colors.blue }]}>
          <ThemedText variant="headline2" style={[ { color: colors.white }]}>
            {getInitial(stylist.name)}
          </ThemedText>
        </View>
      )}
      <View style={styles.infoContainer}>
        <ThemedText variant="headline4" style={[ { color: colors.text1 }]}>{stylist.name}</ThemedText>
        <ThemedText variant="textstyle1" style={[ { color: colors.gray }]}>{stylist.role}</ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 2,
    shadowColor: "#000",
    elevation: 1,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 28,

  },
  imagePlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  initial: {
    fontSize: 20,
    fontWeight: "bold",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },

});