import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useThemeColors } from '@/hooks/useThemeColors';
import {RootView} from "@/components/RootView"
import {ThemedText} from "@/components/ThemedText"


const appointments = {
  upcoming: [
    {
      id: '1',
      date: 'Mardi 31 déc. 10:00',
      service: 'Color by AS',
      address: '36 Rue de l\'Empereur, 45000 Orléans',
      duration: '1min',
      stylist: 'Anne Sophie',
    },
    {
      id: '2',
      date: 'Mercredi 1er janv. 15:00',
      service: 'Haircut by John',
      address: '123 Avenue de Paris, 75000 Paris',
      duration: '30min',
      stylist: 'John Doe',
    },
  ],
  completed: [
    {
      id: '3',
      date: 'Vendredi 20 déc. 14:00',
      service: 'Massage Relaxation',
      address: '12 Rue de Lyon, 69000 Lyon',
      duration: '45min',
      stylist: 'Marie Curie',
    },
  ],
};

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const colors = useThemeColors();

  const renderAppointmentCard = (appointment) => (
    <View style={[styles.card, { backgroundColor: colors.background.card }]}>
      <Text style={styles.date}>{appointment.date}</Text>
      <Text style={styles.service}>{appointment.service}</Text>
      <Text style={styles.address}>{appointment.address}</Text>
      <Text style={styles.duration}>⏳ {appointment.duration}</Text>
      <Text style={styles.stylist}>👤 avec {appointment.stylist}</Text>
      <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]}>
        <Text style={styles.buttonText}>Déplacer le RDV</Text>
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <ThemedText variant='textstyle1' color='blue' style={styles.actionText}>Annuler le RDV</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <RootView>
      {/* Onglets en haut */}
      <View style={[styles.tabsContainer, {backgroundColor: colors.background.blue}]}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'upcoming' && { borderBottomColor: colors.primary },
          ]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'upcoming' && { color: colors.primary },
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'completed' && { borderBottomColor: colors.primary },
          ]}
          onPress={() => setActiveTab('completed')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'completed' && { color: colors.primary },
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Liste des rendez-vous */}
      <FlatList
        data={appointments[activeTab]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderAppointmentCard(item)}
        contentContainerStyle={styles.listContent}
      />
    </RootView>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    //backgroundColor: '#fff',
  },
  tab: {
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  listContent: {
    padding: 10,
  },
  card: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  service: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  address: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
  },
  duration: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
  },
  stylist: {
    fontSize: 12,
    color: '#555',
    marginBottom: 10,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  actionText: {
    fontSize: 12,
    //color: '#a07BFF',
    textAlign: 'center',
  },
});
