import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DateCard from "@/components/Date/DateCard";
import MoreDatesButton from "@/components/Date/MoreDatesButton";
import TimeSlots from "@/components/Date/TimeSlots";
import { useThemeColors } from "@/hooks/useThemeColors";
import BackButton from "@/components/buttons/BackButton";
import { Row } from "@/components/Row";

const today = new Date();

const getNextThreeDays = () => {
  return Array.from({ length: 3 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    return {
      //"fr-FR" for French
      day: date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(), // Exemple: "TUE"
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }), // Exemple: "Sep 10"
      duration: "40 mins", // Durée statique ou calculée
    };
  });
};

const timeSlots = ["10:00 AM", "11:30 AM", "1:00 PM", "3:00 PM", "5:00 PM"];

export default function ChooseAppointmentScreen() {
  const colors = useThemeColors();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [dates, setDates] = useState(getNextThreeDays());

  const handleLoadMoreDates = () => {
    console.log("MoreDatesButton pressed");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.header}>
        <BackButton />
        <Text style={[styles.title, { color: colors.text1 }]}>Choose Your Appointment</Text>
      </View>
      
      <Row>
        <View style={styles.dateList}>
          {dates.map((item) => (
            <DateCard
              key={`${item.day}-${item.date}`}
              day={item.day}
              date={item.date}
              time={item.duration}
              isSelected={selectedDate === item.date}
              onSelect={() => setSelectedDate(item.date)}
            />
          ))}
        </View>

        <View style={styles.moreDatesContainer}>
          <MoreDatesButton onPress={handleLoadMoreDates} />
        </View>
      </Row>

      {selectedDate && (
        <>
          <Text style={[styles.subtitle, { color: colors.text1 }]}>Available Slots:</Text>
          <TimeSlots slots={timeSlots} selectedSlot={selectedSlot} onSelect={setSelectedSlot} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
    textAlignVertical: "center",
  },
  dateList: {
   // marginBottom: 16,
    flexDirection: "row",
    justifyContent: "center", // This ensures the cards are centered
    flexWrap: "wrap", // Allows wrapping when there's not enough space
    alignItems: "center", // Centers the items vertically within the row
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
  moreDatesContainer: {
    //marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
    //marginHorizontal: 4,
    flexDirection: "row", // This ensures the "More Dates" button aligns horizontally with the dates
    flexWrap: "wrap",
  },
});
