import React, { useState, useRef } from "react";
import { menu } from "@/constants/SetPrestationsTest";
import { useThemeColors } from "@/hooks/useThemeColors";
import {ThemedText} from "@/components/ThemedText"
import { Link } from "expo-router";
import { Row } from "@/components/Row";
import {RootView} from "@/components/RootView"

import {
  View,
  StyleSheet,
  Pressable,
  StatusBar,
  SafeAreaView,
  Text,
  Button,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
  TouchableOpacity,
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
                     {expandedItems.includes(index) ? (
                       <Image
                         source={require('@/assets/images/up-arrow.png')}
                         style={styles.arrowIcon}
                       />
                     ) : (
                       <Image
                         source={require('@/assets/images/down-arrow.png')}
                         style={styles.arrowIcon}
                       />
                     )}
                   </ThemedText>
                </Pressable>
                {expandedItems.includes(index) && (
                  <View style={[ styles.dropdownContent, { backgroundColor :colors.background.primary}]}>
                    <ThemedText variant='textstyle1' >{service.description}</ThemedText>
                    {service.listSousType ? (
                      <View>
                        {service.listSousType.map((sub, subIndex) => (
                          <View key={subIndex} style={[styles.subTypeContainer]}>
                                <ThemedText variant='subtitle2' style={styles.subTypeTitle}>{sub.sousTypeName}</ThemedText>
                                <ThemedText variant='textstyle1' color='gray' style={styles.subTypeDescription}>{sub.description}</ThemedText>
                                <Row style={styles.priceRow}>
                                    <Row>
                                        <ThemedText variant='textstyle2' >{sub.price}</ThemedText>
                                        <ThemedText variant='textstyle1' >   •   {sub.duration}</ThemedText>
                                    </Row>
                                    <Link href={{ pathname: "/stylist/[id]" }} asChild >
                                            <Pressable
                                                style={{backgroundColor: colors.blue, paddingVertical: 7, paddingHorizontal: 10, borderRadius: 9,}}>
                                                <ThemedText  variant='textstyle1'  color='white' style={styles.chooseButtonText}>Choose</ThemedText>
                                            </Pressable>
                                    </Link>
                                </Row>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

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
    padding: 6,
    gap: 10,
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    //paddingHorizontal: 16,
    borderRadius:10,
  },
  dropdownTitle: {
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 16,
  },
  dropdownIcon: {
    fontSize: 12,
    paddingHorizontal: 16,
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
    marginVertical: 8,
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
    arrowIcon: {
      width: 16, // Définir la largeur de l'icône
      height: 16, // Définir la hauteur de l'icône
      resizeMode: 'contain', // S'assurer que l'image garde ses proportions
    },

});