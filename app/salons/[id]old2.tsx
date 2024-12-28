import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Platform, StatusBar } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import StylistViewCard from "@/components/stylist/StylistViewCard";
import ContinueButton from "@/components/buttons/ContinueButton";
import BackButton from "@/components/buttons/BackButton";

type Stylist = {
  id: string;
  name: string;
  role: string;
  image: any;
  topRated: boolean;
};

const stylists: Stylist[] = [
    {
        id: "any",
        name: "Any Stylist",
        role: "Next available stylist",
        image: require("@/assets/images/professionnels/AnyStyliste.png"),
        topRated: false,
      },
      {
        id: "1",
        name: "John Doe",
        role: "Hair Specialist",
        image: require("@/assets/images/professionnels/professionel01.png"),
        topRated: true,
      },

      {
        id: "2",
        name: "Anna Lee",
        role: "Hair Dresser",
       // image: require("@/assets/images/professionnels/professionel02.png"),
        topRated: true,
      },
      {
        id: "3",
        name: "Ella Ford",
        role: "Hair Specialist",
        image: require("@/assets/images/professionnels/professionel03.png"),
        topRated: false,
      },
      {
        id: "4",
        name: "Marsh Donnell",
        role: "Hair Specialist",
        image: require("@/assets/images/professionnels/professionel04.png"),
        topRated: false,
      },

      {
        id: "5",
        name: "John Doe",
        role: "Hair Specialist",
        //image: require("@/assets/images/professionnels/professionel06.png"),
        topRated: true,
      },
      {
        id: "6",
        name: "John Doe",
        role: "Hair Specialist",
        image: require("@/assets/images/professionnels/professionel07.png"),
        topRated: true,
      },
      {
        id: "7",
        name: "John Doe",
        role: "Hair Specialist",
        image: require("@/assets/images/professionnels/professionel08.png"),
        topRated: true,
      },
      {
        id: "8",
        name: "John Doe",
        role: "Hair Specialist",
        image: require("@/assets/images/professionnels/professionel09.png"),
        topRated: true,
      },
      {
        id: "9",
        name: "John Doe",
        role: "Hair Specialist",
        //image: require("@/assets/images/professionnels/professionel010.png"),
        topRated: true,
      },
      {
        id: "10",
        name: "John Doe",
        role: "Hair Specialist",
        //image: require("@/assets/images/professionnels/professionel06.png"),
        topRated: true,
      },
      {
        id: "11",
        name: "John Doe",
        role: "Hair Specialist",
        image: require("@/assets/images/professionnels/professionel07.png"),
        topRated: true,
      },
      {
        id: "12",
        name: "John Doe",
        role: "Hair Specialist",
        image: require("@/assets/images/professionnels/professionel08.png"),
        topRated: true,
      },
      {
        id: "13",
        name: "John Doe",
        role: "Hair Specialist",
        image: require("@/assets/images/professionnels/professionel09.png"),
        topRated: true,
      },
      {
        id: "14",
        name: "John Doe",
        role: "Hair Specialist",
        //image: require("@/assets/images/professionnels/professionel010.png"),
        topRated: true,
      },
];

export default function ChooseStylistScreen() {
  const colors = useThemeColors();
  const [selectedStylist, setSelectedStylist] = useState<string | null>(null);

  const handleSelection = (id: string) => {
    setSelectedStylist(id);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background.primary,
          paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight || 54 : 16,
        },
      ]}
    >
        <View style={styles.header}>
            <BackButton />
            <Text style={[styles.title, { color: colors.text1 }]}>Choose your stylist</Text>
        </View>

      <FlatList
        data={stylists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StylistViewCard
            stylist={item}
            isSelected={selectedStylist === item.id}
            onSelect={handleSelection}
          />
        )}
        ListFooterComponent={<View style={{ height: 80 }} />}
        showsVerticalScrollIndicator={false}
      />

      <ContinueButton
        isEnabled={!!selectedStylist}
        onPress={() => {console.log("button pressed!")}}
        label="Select & continue"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: "8",
    textAlignVertical: "center",
  },
});
