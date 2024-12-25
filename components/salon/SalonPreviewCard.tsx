import { Platform, View, Pressable, StyleSheet, ViewStyle, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Row } from "@/components/Row";

type Props = {
  style?: ViewStyle;
  id: number;
  name: string;
};

export function SalonPreviewCard({ style, id, name }: Props) {
  const colors = useThemeColors();
  return (
    <Link
      href={{ pathname: "/salons/[id]", params: { id: id } }}
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
          <View style={[styles.frame]}>
            {/* Image */}
            <Image
              //source={{
                //uri: `${id}`,
                source={require("@/assets/images/8.jpg")}
              //}}
              style={[styles.image]}
            />

            {/* Information Frame */}
            <View style={[styles.infoContainer]}>
                <Row style={styles.ratingRow}>
                      <ThemedText variant="subtitle2" color="text1"> {name} </ThemedText>
                      <ThemedText variant="subtitle2" color="gray" style={styles.distance}> 2 km </ThemedText>
                 </Row>

                  <ThemedText variant="body2" color="gray">
                        Lakewood, California
                  </ThemedText>

                  {/* Rating and Distance */}
                  <Row style={styles.ratingRow}>
                        <ThemedText variant="body1" color="accent">⭐ 4.7 </ThemedText>
                        <ThemedText variant="body1" color="gray">(312) </ThemedText>
                  </Row>
            </View>

            {/* Distance */}

          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  salon: {
    height: 114,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "column",
    gap: 10,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  frame: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    flex: 1,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 6,
    width: "100%",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    justifyContent: "null",
  },
  distance: {
    alignSelf: "flex-end",
    marginLeft: "auto",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
});
