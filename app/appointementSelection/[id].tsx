import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import DateCard from "@/components/Date/DateCard";
import MoreDatesButton from "@/components/Date/MoreDatesButton";
import TimeSlots from "@/components/Date/TimeSlots";
import { useThemeColors } from "@/hooks/useThemeColors";
import BackButton from "@/components/buttons/BackButton";

const today = new Date();
const getNextThreeDays = () => {
  return Array.from({ length: 3 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date.toDateString(); // Format: "Mon, Dec 25"
  });
};

const timeSlots = ["10:00 AM", "11:30 AM", "1:00 PM", "3:00 PM", "5:00 PM"];

export default function ChooseAppointmentScreen() {
  const colors = useThemeColors();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [dates, setDates] = useState(getNextThreeDays());

  const handleLoadMoreDates = () => {
    const newDate = new Date(dates[dates.length - 1]);
    newDate.setDate(newDate.getDate() + 1);
    setDates([...dates, newDate.toDateString()]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.header}>
            <BackButton />
            <Text style={[styles.title, { color: colors.text1 }]}>Choose Your Appointment</Text>
      </View>
      <FlatList
        data={dates}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <DateCard
            date={item}
            isSelected={selectedDate === item}
            onSelect={() => setSelectedDate(item)}
          />
        )}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.dateList}
      />

      <MoreDatesButton onPress={handleLoadMoreDates} />

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
    marginLeft: "8",
    textAlignVertical: "center",
  },
  dateList: {
    marginBottom: 16,

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

});
