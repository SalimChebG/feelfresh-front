import React, { useState } from 'react';
import {useThemeColors} from "@/hooks/useThemeColors"
import {RootView} from "@/components/RootView"
import BackButton from "@/components/buttons/BackButton";
import { useRouter, useSearchParams } from 'expo-router';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';

const Booking = () => {
  //const { id } = useSearchParams(); // Récupérer l'ID depuis les paramètres de la route
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('Upcoming');
  const colors = useThemeColors();

  const bookings = {
    Upcoming: [
      {
        id: '1',
        date: 'Sep 10, 2024',
        time: '9:30 AM',
        salon: 'Hair Avenue',
        address: 'Lakewood, California',
        services: 'Hair Cut, Hair Wash',
      },
      {
        id: '2',
        date: 'Sep 28, 2024',
        time: '9:30 AM',
        salon: 'Hair Avenue',
        address: 'Lakewood, California',
        services: 'Hair Cut, Hair Wash',
      },
    ],
    Completed: [],
    Cancelled: [],
  };

  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingCard}>
      <View style={styles.bookingDetails}>
        <Text style={styles.bookingDate}>{`${item.date} - ${item.time}`}</Text>
        <Text style={styles.salonName}>{item.salon}</Text>
        <Text style={styles.salonAddress}>{item.address}</Text>
        <Text style={styles.bookingServices}>Services: {item.services}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.buttonText}>Cancel Booking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.receiptButton}>
          <Text style={styles.buttonText}>View Receipt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <RootView style={styles.container}>
      <View style={styles.tabContainer}>
        {['Upcoming', 'Completed', 'Cancelled'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && styles.activeTab,
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={
                selectedTab === tab
                  ? styles.activeTabText
                  : styles.tabText
              }
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={bookings[selectedTab]}
        keyExtractor={(item) => item.id}
        renderItem={renderBookingItem}
        ListEmptyComponent={() => (
          <Text style={styles.emptyMessage}>No bookings available</Text>
        )}
      />
    </RootView>
  );
};

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

  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#007BFF',
  },
  tabText: {
    fontSize: 16,
    color: '#000',
  },
  activeTabText: {
    color: '#fff',
  },
  bookingCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingDetails: {
    marginBottom: 16,
  },
  bookingDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  salonName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  salonAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  bookingServices: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  receiptButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontSize: 16,
  },
});

export default Booking;
