import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

type GradientButtonProps = {
  disabled?: boolean;
  onPress: () => void;
  label?: string;
  labelStyle?: object;
};

const GradientButton: React.FC<GradientButtonProps> = ({
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
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1.0, y: 1.0 }}
        locations={[0.3, 0.6]}
        colors={["#338BFF", "#51C7FE"]}
        style={[styles.gradient, styles.shadowStyle]}
      >
        {label && (
          <View style={styles.labelWrapper}>
          <Text style={[labelStyle ? labelStyle : styles.buttonText]}>
            {label}
          </Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 80,
    overflow: "hidden",
    width: "100%",
  },
  disabledContainer: {
    opacity: 0.32,
  },
  gradient: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 80,
  },
  shadowStyle: {
    elevation: 4,
    shadowColor: "#338BFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  labelWrapper:{
    marginVertical: 9,
    alignItems: "center",
    justifyContent: "center",
  }
});

export { GradientButton };
