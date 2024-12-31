import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColors } from "@/hooks/useThemeColors";
import { Row } from "@/components/Row";



export const AppointmentCard = ({ appointment, type}) => {
  console.log('Appointment type:', type); // Debug pour vérifier la valeur de type
  const colors = useThemeColors();

  return (
              <View style={[styles.shadowContainer, { backgroundColor: colors.background.primary }]}>

    <View style={[styles.card, { backgroundColor: colors.background.card }]}>
        <Row style={{justifyContent: "null", gap: 4}}>
          <Image
            source={require("@/assets/images/8.png")}
            style={styles.image}
            resizeMode="cover"
          />

          {/* Information Section */}
          <Row style={styles.infoContainer}>
                <ThemedText variant="subtitle2" color="text1" style={{marginBottom: 4,}}>
                  {appointment.salonName}
                </ThemedText>

                {/* Address Row */}
                <Row style={styles.Row}>
                  <Image
                    source={require("@/assets/images/salon/map-pin-gray.png")}
                    style={{ width: 18, height: 18 }}
                  />
                  <ThemedText variant="textstyle1" color="text2" style={{marginTop: 2,}}>
                    {appointment.address}
                  </ThemedText>
                </Row>
            </Row>
      </Row>
      <ThemedText variant="headline4" color="text1" style={{ marginBottom: 5 }}>
        {appointment.date}
      </ThemedText>

      <Row style={styles.Row}>
            <Image
              source={require("@/assets/images/salon/chrono-icon.png")}
              style={{ width: 18, height: 18 }}
            />
          <ThemedText variant="textstyle2" color="gray">
            {appointment.duration}
          </ThemedText>
      </Row>

        <Row style={styles.Row}>
              <Image
                source={require("@/assets/images/salon/prestation-icon.png")}
                style={{ width: 18, height: 18 }}
              />
              <ThemedText variant="textstyle2" color="gray">
                with {appointment.stylist}
              </ThemedText>
        </Row>

      {type === 'upcoming' && (
        <>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.blue }]}>
            <ThemedText variant="textstyle1" color="white">
              Move Appointment
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <ThemedText variant="textstyle1" color="red" style={{ textAlign: 'center' }}>
              Cancel Appointment
            </ThemedText>
          </TouchableOpacity>
        </>
      )}

      {type === 'completed' && (
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.blue }]}>
          <ThemedText variant="textstyle1" color="white">
            Take again
          </ThemedText>
        </TouchableOpacity>
      )}
    </View>
    </View>
  );
};

export const NoAppointments = ({ type}) => {
  const message = type === 'upcoming'
    ? 'No upcoming appointments.'
    : 'No completed appointments.';

  return (
    <View style={[styles.noAppointments, { backgroundColor: colors.background.card }]}>
      <ThemedText variant="textstyle2" color="gray">
        {message}
      </ThemedText>
    </View>
  );
};


const styles = StyleSheet.create({
  shadowContainer: {
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1, //pour ios
    shadowRadius: 5,
    elevation: 2, //pour android
    borderRadius: 10, // Même rayon que la vue interne pour cohérence
  },

  card: {
    borderRadius: 10,
    padding: 15,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  noAppointments: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },

    image: {
      width: 55,
      height: 55, // Adjust height as needed
      borderRadius:5,
    },
    infoContainer: {
      padding: 12,
      flexDirection: "column",
      gap: 8,
      alignItems: "flex-start",
    },

    Row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "null",
      gap: 4,
      marginBottom: 5,
    },
});
