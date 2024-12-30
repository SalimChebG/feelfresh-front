import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

interface PrestationViewCardProps {
  prestationName: string;
  stylistName: string;
  duration: string;
  onDelete: () => void;
}

const PrestationViewCard: React.FC<PrestationViewCardProps> = ({
  prestationName,
  stylistName,
  duration,
  onDelete,
}) => {
  const colors = useThemeColors();

  return (
    <View style={[styles.card, { backgroundColor: colors.white }]}>
      <View style={styles.infoContainer}>
        <Text style={[styles.prestationName, { color: colors.text1 }]}>
          {prestationName} <Text style={styles.duration}>({duration})</Text>
        </Text>
        <Text style={[styles.stylistName, { color: colors.text2 }]}>
          With {stylistName}
        </Text>
      </View>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={[styles.deleteButtonText, { color: colors.blue }]}>
          Delete
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
  },
  infoContainer: {
    flex: 1,
  },
  prestationName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  duration: {
    fontSize: 14,
    fontWeight: "normal",
  },
  stylistName: {
    fontSize: 14,
    marginTop: 4,
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default PrestationViewCard;
