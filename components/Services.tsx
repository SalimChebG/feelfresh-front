import { TouchableOpacity, View, Image, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";

const Services = [
  { name: 'Coupe', icon: require('@/assets/images/services/coupe-cheveux.png') },
  { name: 'Style', icon: require('@/assets/images/services/style-cheveux.png') },
  { name: 'Manicure', icon: require('@/assets/images/services/manicure.png') },
  { name: 'Brushing', icon: require('@/assets/images/services/brushing.png') },
  { name: 'Barbe', icon: require('@/assets/images/services/style-cheveux.png') },
];

export function ServicesComponent({ style }: { style?: any }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const colors = useThemeColors();

  const renderItem = ({ item, index }: { item: typeof Services[0]; index: number }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => setActiveIndex(index)}
      accessible={true}
      accessibilityLabel={`Navigate to ${item.name}`}
    >
      <View style={[styles.frame, { backgroundColor: activeIndex === index ? colors.blue : colors.white }]} >
        <Row style={styles.row}>
          <Image
            source={item.icon}
            style={[
              styles.icon,
              { tintColor: activeIndex === index ? colors.white : colors.gray },
            ]}
          />
          <ThemedText color={activeIndex === index ? "white" : "gray"} variant="servicefont">
            {item.name}
          </ThemedText>
        </Row>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={Services} // Données de la liste
        renderItem={renderItem} // Fonction de rendu pour chaque élément
        keyExtractor={(item) => item.name} // Clé unique pour chaque élément
        horizontal // Permet le défilement horizontal
        showsHorizontalScrollIndicator={false} // Cache la barre de défilement
        contentContainerStyle={{
          paddingLeft: 10, // Espace à gauche
          paddingRight: 10, // Espace à droite
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  button: {
    alignItems: "center",
    marginRight: 5, // Ajoute de l'espace entre les éléments (pas de marginLeft ici pour le premier)
  },
  frame: {
    width: 93,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
});
