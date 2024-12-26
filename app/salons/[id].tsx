import React from "react";
import { StyleSheet, Text, View, Image, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText"; // Si tu utilises un système de thème

export default function Salon() {
  const params = useLocalSearchParams();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image Section */}
      <Image
        source={require("@/assets/images/8.png")}
        style={styles.headerImage}
      />

      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.salonName}>Hair Avenue</Text>
        <Row style={styles.row}>
          <Text style={styles.address}>No 03, Kadalana Road, Kadalana, Moratuwa</Text>
        </Row>
        <Row style={styles.row}>
          <Text style={styles.hours}>9AM-10PM, Mon - Sun</Text>
        </Row>
        <Row style={styles.row}>
          <Text style={styles.rating}>⭐ 4.7</Text>
          <Text style={styles.reviews}>(312)</Text>
        </Row>
      </View>

      {/* Description Section */}
      <Text style={styles.description}>
        Hair Avenue provides expert haircuts, styling, along with services like facials, cleanups,
        skincare and makeup to keep you looking your best.
      </Text>

      {/* Tabs Section */}
      <Row style={styles.tabs}>
        <Pressable style={[styles.tab, styles.activeTab]}>
          <Text style={styles.activeTabText}>Hair Cut</Text>
        </Pressable>
        <Pressable style={styles.tab}>
          <Text style={styles.tabText}>Hair Styling</Text>
        </Pressable>
        <Pressable style={styles.tab}>
          <Text style={styles.tabText}>Hair Treatments</Text>
        </Pressable>
        <Pressable style={styles.tab}>
          <Text style={styles.tabText}>Combo</Text>
        </Pressable>
      </Row>

      {/* Services Section */}
      <View style={styles.service}>
        <Row style={styles.serviceRow}>
          <Text style={styles.serviceTitle}>Hair Cut</Text>
          <Text style={styles.servicePrice}>$10.00</Text>
        </Row>
        <Row style={styles.serviceRow}>
          <Text style={styles.serviceDuration}>30 Mins</Text>
          <Pressable style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </Row>
      </View>

      <View style={styles.service}>
        <Row style={styles.serviceRow}>
          <Text style={styles.serviceTitle}>Hair Wash</Text>
          <Text style={styles.servicePrice}>$5.00</Text>
        </Row>
        <Row style={styles.serviceRow}>
          <Text style={styles.serviceDuration}>30 Mins</Text>
          <Pressable style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </Row>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  headerImage: {
    width: "100%",
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  salonName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: "#666",
  },
  hours: {
    fontSize: 14,
    color: "#666",
  },
  rating: {
    fontSize: 14,
    color: "#FFD700",
    marginRight: 4,
  },
  reviews: {
    fontSize: 14,
    color: "#666",
  },
  description: {
    padding: 16,
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#007AFF",
  },
  tabText: {
    fontSize: 14,
    color: "#007AFF",
  },
  activeTabText: {
    fontSize: 14,
    color: "#fff",
  },
  service: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  serviceRow: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  serviceDuration: {
    fontSize: 14,
    color: "#666",
  },
  addButton: {
    backgroundColor: "#007AFF",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
});
