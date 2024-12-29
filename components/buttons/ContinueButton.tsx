import React, { forwardRef } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

type ContinueButtonProps = {
  isEnabled: boolean;
  onPress: () => void;
  label: string;
};

const ContinueButton = forwardRef(function ContinueButton(
  { isEnabled, onPress, label }: ContinueButtonProps,
  ref
) {
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      ref={ref} // Forward the ref here
      style={[
        styles.button,
        { backgroundColor: isEnabled ? colors.blue : colors.graythin },
      ]}
      disabled={!isEnabled}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <Text
        style={[
          styles.buttonText,
          { color: isEnabled ? colors.white : colors.gray },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
});

export default ContinueButton;

const styles = StyleSheet.create({
  button: {
    width: 343,
    height: 48,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
    alignSelf: "center",
    justifyContent: "space-around",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
