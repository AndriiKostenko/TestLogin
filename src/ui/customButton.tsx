import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

type ButtonProps = {
  disabled?: boolean;
  onPress: () => void;
  label?: string;
  labelStyle?: object;
};

const CustomButton: React.FC<ButtonProps> = ({
  disabled,
  onPress,
  label,
  labelStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={!disabled ? onPress : undefined}
      style={[styles.buttonContainer, disabled && styles.disabledContainer]}
      activeOpacity={disabled ? 1 : 0.7}
    >
      {label && (
        <Text style={[labelStyle ? labelStyle : styles.buttonText]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#fff",
  },
  disabledContainer: {
    opacity: 0.32,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export { CustomButton };
