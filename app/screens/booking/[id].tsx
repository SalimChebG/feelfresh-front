import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeColors } from '@/hooks/useThemeColors';
import { RootView } from '@/components/RootView';
import { ThemedText } from '@/components/ThemedText';
import { AppointmentCard, NoAppointments } from '@/components/user/AppointmentCard'; // Import des deux composants

const appointments = {
  upcoming: [
    {
      id: '1',
      date: 'Mardi 31 déc. 10:00',
      salonName: 'Color by AS',
      address: "36 Rue de l'Empereur, 45000 Orléans",
      duration: '1min',
      stylist: 'Anne Sophie',
    },
    {
      id: '2',
      date: 'Mercredi 1er janv. 15:00',
      salonName: 'Haircut by John',
      address: '123 Avenue de Paris, 75000 Paris',
      duration: '30min',
      stylist: 'John Doe',
    },
    {
      id: '3',
      date: 'Jeudi 2 janv. 10:00',
      salonName: 'Massage Therapy',
      address: '56 Boulevard Saint-Michel, 75005 Paris',
      duration: '1h',
      stylist: 'Marie Curie',
    },
    {
      id: '4',
      date: 'Vendredi 3 janv. 18:00',
      salonName: 'Nail Art Studio',
      address: '78 Rue de Lyon, 69000 Lyon',
      duration: '45min',
      stylist: 'Alice Smith',
    },
  ],
  completed: [
    {
      id: '5',
      date: 'Dimanche 29 déc. 14:00',
      salonName: 'Hair Styling',
      address: '89 Rue de Lille, 59000 Lille',
      duration: '30min',
      stylist: 'Emma Watson',
    },
    {
      id: '6',
      date: 'Samedi 28 déc. 11:00',
      salonName: 'Spa Relaxation',
      address: '12 Rue de Nantes, 44000 Nantes',
      duration: '1h 30min',
      stylist: 'Sophia Brown',
    },
    {
      id: '7',
      date: 'Vendredi 27 déc. 16:30',
      salonName: 'Makeup Session',
      address: '34 Avenue des Champs-Élysées, 75008 Paris',
      duration: '1h',
      stylist: 'Olivia Johnson',
    },
  ],
};


export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const colors = useThemeColors();

  const renderContent = () => {
    const data = appointments[activeTab];

    if (data.length === 0) {
      // Affiche le composant NoAppointments si la liste est vide
      return <NoAppointments type={activeTab} />;
    }

    // Affiche la liste des rendez-vous si elle n'est pas vide
    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AppointmentCard appointment={item} type={activeTab}/>
        )}
        contentContainerStyle={styles.listContent}
      />
    );
  };

  return (
    <RootView>
      {/* Onglets pour basculer entre upcoming et completed */}
      <View style={[styles.tabsContainer, { borderBottomColor: colors.graythin }]}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && { borderBottomColor: colors.blue }]}
          onPress={() => setActiveTab('upcoming')}
        >
          <ThemedText style={[activeTab === 'upcoming' && { color: colors.blue }]}>
            Upcoming
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && { borderBottomColor: colors.blue }]}
          onPress={() => setActiveTab('completed')}
        >
          <ThemedText style={[activeTab === 'completed' && { color: colors.blue }]}>
            Completed
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Contenu basé sur l'onglet actif */}
      {renderContent()}
    </RootView>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    paddingBottom: 0,
  },
  tab: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    flex: 1,
    alignItems: 'center',
  },
  listContent: {
    padding: 10,
    gap: 10,
  },
});
