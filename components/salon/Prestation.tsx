import React, { useState, useRef } from "react";
import { menu } from "@/constants/SetPrestationsTest";
import { useThemeColors } from "@/hooks/useThemeColors";
import {ThemedText} from "@/components/ThemedText"

import {
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  StatusBar,
  SafeAreaView,
  Text,
  Button,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";


if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export function Prestation() {

  const colors = useThemeColors()
  const [activeTab, setActiveTab] = useState("Prestations");
  const [expandedItems, setExpandedItems] = useState([]); // Track the expanded items

  const toggleItem = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedItems((prev) => {
      if (prev.includes(index)) {
        // Collapse if already expanded
        return prev.filter((i) => i !== index);
      } else {
        // Expand the new item
        return [...prev, index];
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView>
        <View style={styles.tabsContainer}>
          {Object.keys(menu).map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tabItem,
                activeTab === tab && { borderBottomWidth: 1, borderBottomColor: colors.blue },
              ]}
            >
              <ThemedText style={{ color: activeTab === tab ? "blue" : "gray" }}>
                {tab}
              </ThemedText>
            </Pressable>
          ))}
        </View>

        {activeTab === "Prestations" && (
          <View style={styles.menuList}>
            {menu[activeTab].map((service, index) => (
              <View key={index}>
                <Pressable
                  onPress={() => toggleItem(index)}
                  style={[
                    styles.dropdownHeader,
                    expandedItems.includes(index) && { backgroundColor: colors.background.tertiary },
                  ]}
                >
                  <ThemedText variant='headline2' style={styles.dropdownTitle}>{service.type}</ThemedText>
                  <ThemedText style={styles.dropdownIcon}>
                    {expandedItems.includes(index) ? "▲" : "▼"}
                  </ThemedText>
                </Pressable>
                {expandedItems.includes(index) && (
                  <View style={[ styles.dropdownContent, { backgroundColor :colors.background.secondary}]}>
                    <ThemedText variant='textstyle1' >{service.description}</ThemedText>
                    {service.listSousType ? (
                      <View>
                        {service.listSousType.map((sub, subIndex) => (
                          <View key={subIndex} style={[styles.subTypeContainer, {backgroundColor: colors.background.secondary}]}>
                                <ThemedText variant='subtitle2' style={styles.subTypeTitle}>{sub.sousTypeName}</ThemedText>
                                <ThemedText variant='textstyle1' color='gray' style={styles.subTypeDescription}>{sub.description}</ThemedText>
                                <View style={styles.priceRow}>
                                      <ThemedText variant='textstyle1' style={styles.subTypeDetails}>Price: {sub.price}</ThemedText>
                                      <Pressable style={[styles.chooseButton,{backgroundColor: colors.blue}]}>
                                            <ThemedText  variant='textstyle1'  color='white' style={styles.chooseButtonText}>Choose</ThemedText>
                                      </Pressable>
                                </View>
                                <ThemedText variant='textstyle1' style={styles.subTypeDetails}>Duration: {sub.duration}</ThemedText>
                          </View>
                        ))}
                      </View>
                    ) : (
                      <View>

                      </View>
                    )}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  menuList: {
    padding: 16,
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  dropdownIcon: {
    fontSize: 12,
  },
  dropdownContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  subTypeContainer: {
    marginVertical: 8,
    padding: 8,
    borderRadius: 5,
  },
  subTypeTitle: {

    marginBottom: 4,
  },
  subTypeDescription: {
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subTypeDetails: {
    marginBottom: 4,
  },
  chooseButton: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 9,
  },

});
