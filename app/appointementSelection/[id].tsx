import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import DateCard from "@/components/Date/DateCard";
import TimeSlots from "@/components/Date/TimeSlots";
import ContinueButton from "@/components/buttons/ContinueButton"; // Importer le bouton ici
import { useThemeColors } from "@/hooks/useThemeColors";
import BackButton from "@/components/buttons/BackButton";
import { Row } from "@/components/Row";
import { RootView } from "@/components/RootView";
import { SalonPreviewCard } from "@/components/salon/SalonPreviewCard";
import PrestationViewCard from "@/components/Date/PrestationViewCard";


const handleDeletePrestation = () => {
  console.log("Prestation deleted");
};

const today = new Date();

const getNextNDays = (startIndex: number, count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + startIndex + i);

    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(), // Exemple: "TUE"
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }), // Exemple: "Sep 10"
      duration: "40 mins", // Durée statique ou calculée
    };
  });
};

const timeSlotsByDay = {
  "Dec 29": ["9:00 AM", "10:30 AM", "2:00 PM", "4:00 PM"],
  "Dec 30": ["10:00 AM", "11:30 AM", "1:00 PM", "3:30 PM"],
  "Dec 31": ["9:30 AM", "11:00 AM", "1:30 PM", "4:00 PM"],
  "Jan 1": ["11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"],
  "Jan 2": ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM"],
  "Jan 3": ["8:30 AM", "10:00 AM", "11:30 AM", "2:00 PM", "4:00 PM"],
  "Jan 4": ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"],
  "Jan 5": ["10:00 AM", "12:30 PM", "2:30 PM", "4:30 PM"],
  "Jan 6": ["9:00 AM", "11:00 AM", "1:00 PM", "3:30 PM"],
  "Jan 7": ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"],
};

export default function ChooseAppointmentScreen() {
  const colors = useThemeColors();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [dates, setDates] = useState(getNextNDays(0, 7)); // Commence avec 7 jours
  const [loadedDatesCount, setLoadedDatesCount] = useState(7); // Compteur de dates chargées
  const [isLoading, setIsLoading] = useState(false); // État de chargement

  const loadMoreDates = async () => {
    if (isLoading) return; // Empêche les appels multiples
    setIsLoading(true);

    // Simule un délai pour afficher le spinner
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newDates = getNextNDays(loadedDatesCount, 7); // Charge 7 jours supplémentaires
    setDates((prevDates) => [...prevDates, ...newDates]);
    setLoadedDatesCount((prevCount) => prevCount + 7); // Met à jour le compteur

    setIsLoading(false); // Arrête l'indicateur de chargement
  };

  return (
    <RootView style={{ backgroundColor: colors.background.primary, flex: 1 }}>
      <View style={styles.header}>
        <BackButton />
        <Text style={[styles.title, { color: colors.text1 }]}>Choose Your Appointment</Text>
      </View>

      <View style={styles.PageTextView}>
        <Text style={[styles.PageText, { color: colors.text1 }]}>Elite Salon</Text>
      </View>

      {/* Nom du salon et prestation sélectionnée */}
      <PrestationViewCard
        prestationName="Simple Hair Cut"
        stylistName="John wick"
        duration="45 min"
        onDelete={handleDeletePrestation}
      />

      <View style={styles.addButtonView}>
          <TouchableOpacity  onPress={() => console.log("Add another prestation")} >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require("@/assets/images/add-icon.png" )}// Remplacez par le chemin de votre icône
                style={{ width: 20, height: 20, marginRight: 8 }} // Ajustez les dimensions et l'espacement
              />
              <Text style={[styles.addButtonText, { color: colors.blue }]}>Add Another Prestation</Text>
            </View>
          </TouchableOpacity>
        </View>
      
      <View style={styles.PageTextView}>
        <Text style={[styles.PageText, { color: colors.text1 }]}>Select Date and Time</Text>
      </View>

      <Row >
        <FlatList
        style = {{padding : 10}}
          data={dates}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <DateCard
              key={`${item.day}-${item.date}`}
              day={item.day}
              date={item.date}
              time={item.duration}
              isSelected={selectedDate === item.date}
              onSelect={() => {
                setSelectedDate(item.date);
                setSelectedSlot(null); // Réinitialise le slot sélectionné si la date change
              }}
            />
          )}
          keyExtractor={(item) => `${item.day}-${item.date}`}
          onEndReached={loadMoreDates} // Charge plus de dates à la fin
          onEndReachedThreshold={0.5} // Quand il reste 50 % à scroller
          ListFooterComponent={
            isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={colors.blue} />
              </View>
            ) : null
          }
        />
      </Row>
      
          {selectedDate && (
            <>
            <View style={styles.PageTextView}>
              <Text style={[styles.PageText, { color: colors.text1 }, {padding:10} ]}>Available Slots:</Text>
              {timeSlotsByDay[selectedDate] && timeSlotsByDay[selectedDate].length > 0 ? (
                
                <TimeSlots
                  slots={timeSlotsByDay[selectedDate]}
                  selectedSlot={selectedSlot}
                  onSelect={setSelectedSlot}
                />
                
              ) : (
                <Text style={{ color: colors.text2, marginTop: 8 }}>
                  There is no slots for this date.
                </Text>
              )}
              </View>
            </>
          )}


      {/* Footer avec le bouton Continue */}
      <View style={styles.footer}>
        <ContinueButton
          isEnabled={!!selectedSlot} // Active si un slot est sélectionné
          onPress={() => console.log("Button pressed")}
          label="Continue"
        />
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
    textAlignVertical: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  loadingContainer: {
    flex:1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    padding: 4,
    alignItems: "center",
  },

  PrestationCardInfo: {
    marginVertical: 16,
    marginHorizontal: 8,
    alignItems: "flex-start", // Aligner les éléments à gauche
    paddingHorizontal: 16, // Ajoute un peu d'espace par rapport au bord de l'écran
    elevation:3,
    borderRadius: 10,
    padding : 10,
  },


  PageTextView:{
    padding : 10,
    alignItems: "flex-start",
    paddingHorizontal: 16,

  },

  PageText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left", // Texte aligné à gauche
  },

  prestationText: {
    fontSize: 16,
    marginVertical: 8,
    textAlign: "left", // Texte aligné à gauche
  },
  addButtonView: {
    marginTop: 8,
    padding : 10,
    alignItems: "flex-start",
    paddingHorizontal: 16,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left", // Texte aligné à gauche
  },


});
