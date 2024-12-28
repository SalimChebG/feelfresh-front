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
      href={{ pathname: "/salons/[id]",     params: { id: id,} }}
      asChild
    >
      <Pressable
        android_ripple={{
          color: colors.secondaryBackground,
          foreground: true,
        }}
        style={style}
      >
        <View style={[styles.salon]}>
          {/* Image Section */}
          <Image
            source={require("@/assets/images/8.png")}
            style={styles.image}
            resizeMode="cover"
          />

          {/* Information Section */}
          <View style={styles.infoContainer}>
            <ThemedText variant="subtitle2" color="text1" style={styles.name}>
              {name}
            </ThemedText>

            {/* Address Row */}
            <Row style={styles.ratingRow}>
              <Image
                source={require("@/assets/images/salon/map-pin-gray.png")}
                style={{ width: 18, height: 18 }}
              />
              <ThemedText variant="textstyle2" color="text2" style={styles.text}>
                {address}
              </ThemedText>
            </Row>

            {/* Rating and Reviews Row */}
            <Row style={styles.ratingRow}>
              <Image
                source={require("@/assets/images/salon/star.png")}
                style={{ width: 18, height: 18 }}
              />
              <ThemedText variant="textstyle1" color="text2" style={styles.text}>
                {rate}
              </ThemedText>
              <ThemedText variant="textstyle1" color="text2" style={styles.text}>
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
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  salon: {
    width: "100%",
    borderRadius: 15,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    //overflow: "hidden", // Ensures the image doesn't overflow the card
  },
  image: {
    width: "100%",
    height: 170, // Adjust height as needed
  },
  infoContainer: {
    padding: 12,
    flexDirection: "column",
    gap: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    justifyContent: "null",
    gap: 4,
  },
  text: {
    marginTop: 2,
  },
});