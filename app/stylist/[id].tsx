import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Platform, StatusBar } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import StylistViewCard from "@/components/stylist/StylistViewCard";
import ContinueButton from "@/components/buttons/ContinueButton";
import BackButton from "@/components/buttons/BackButton";
import { Link } from "expo-router";
import { stylists } from "@/constants/SetTestStylist";
import {RootView} from "@/components/RootView"



export default function ChooseStylistScreen() {
  const colors = useThemeColors();
  const [selectedStylist, setSelectedStylist] = useState<string | null>(null);

  const handleSelection = (id: string) => {
    setSelectedStylist(id);
  };

  return (
    <RootView
      style={[
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

      <Link href={{ pathname: "/appointementSelection/[id]" }} asChild >
          <ContinueButton
            isEnabled={!!selectedStylist}
            onPress={() => {console.log("button pressed!")}}
            label="Select & continue"
          />
      </Link>
    </RootView>
  );
}

const styles = StyleSheet.create({
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
