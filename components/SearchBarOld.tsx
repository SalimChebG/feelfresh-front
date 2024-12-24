import { Platform, TextInput, View, StyleSheet, Image } from "react-native";
import { Row } from "@/components/Row";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
  value: string;
  onChange: (s: string) => void;
};

export function SearchBar({ value, onChange }: Props) {
  const colors = useThemeColors();

  return (
    <Row gap={8} style={[styles.wrapper, { backgroundColor: colors.tint }]}>
      <Image
        source={require("@/assets/images/search.png")}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        value={value}
        placeholder="Search"
      />
    </Row>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row", //added
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 16,
    width: "90%",
    paddingHorizontal: 12,
    //height: Platform.OS === "ios" ? 40 : Platform.OS === "android" ? 32 : 48, // height adjusted for platform
    marginBottom: Platform.OS === "web" ? 16 : 0, // Add margin for web version for better positioning
  },
  icon: {
    width: 16,
    height: 16,
  },
  input: {
    flex: 1,
    height: 40, // Ensuring TextInput height fits well on mobile and web
    fontSize: Platform.OS === "web" ? 16 : 14, // Adjust font size for web
    lineHeight: Platform.OS === "web" ? 20 : 16, // Adjust line height for web
    paddingHorizontal: 8,
  },
});
