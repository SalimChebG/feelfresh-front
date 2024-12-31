import { Platform, View, Pressable, StyleSheet, ViewStyle, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Row } from "@/components/Row";
import { Availability } from "@/components/salon/Availability";

type Props = {
  style?: ViewStyle;
  id: number;
  name: string;
  address: string;
  reviewsNumber: number;
  rate: number;
  openingHours: string;
};

export function SalonPreviewCard({ style, id, name, address, reviewsNumber, rate, openingHours }: Props) {
  const colors = useThemeColors();
  return (
    <Link
      href={{ pathname: "/salons/[id]",  params: { id: id,} }}
      asChild
    >
      <Pressable
        style={style}
      >
        <View style={[styles.shadowContainer, { backgroundColor: colors.background.primary }]}>
            <View style={[styles.salon,{ backgroundColor: colors.background.primary}]}>
              {/* Image Section */}
              <Image
                source={require("@/assets/images/8.png")}
                style={styles.image}
                resizeMode="cover"
              />

              {/* Information Section */}
              <View style={styles.infoContainer}>
                    <ThemedText variant="subtitle2" color="text1">
                      {name}
                    </ThemedText>

                    {/* Address Row */}
                    <Row style={styles.ratingRow}>
                          <Image
                            source={require("@/assets/images/salon/map-pin-gray.png")}
                            style={{ width: 18, height: 18 }}
                          />
                          <ThemedText variant="textstyle1" color="text2">
                            {address}
                          </ThemedText>
                    </Row>

                    {/* Rating and Reviews Row */}
                    <Row style={styles.ratingRow}>
                          <Image
                            source={require("@/assets/images/salon/star.png")}
                            style={{ width: 18, height: 18 }}
                          />
                          <ThemedText variant="textstyle1" color="text2" style={{marginTop: 2,}}>
                            {rate}
                          </ThemedText>
                          <ThemedText variant="textstyle1" color="text2" style={{marginTop: 2,}}>
                            ({reviewsNumber})
                          </ThemedText>
                    </Row>
              </View>

              {/* Availability Section */}
              <Availability
                availabilities={[
                  { date: "Ven.27", time: "matin", isAvailable: false },
                  { date: "Sam.28", time: "matin", isAvailable: true },
                  { date: "Dim.29", time: "matin", isAvailable: false },
                  { date: "Ven.27", time: "après-midi", isAvailable: true },
                  { date: "Sam.28", time: "après-midi", isAvailable: false },
                  { date: "Dim.29", time: "après-midi", isAvailable: true },
                ]}
              />
            </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  shadowContainer: {
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    borderRadius: 15, // Même rayon que la vue interne pour cohérence
  },

  salon: {
    borderRadius: 15,
    overflow: 'hidden'

  },
  image: {
    width: "100%",
    height: 250, // Adjust height as needed
  },
  infoContainer: {
    flexDirection: "column",
    gap: 8,
    //marginHorizontal: 8,
    paddingHorizontal: 8,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "null",
    gap: 4,
    //paddingHorizontal: 10,
  },

});