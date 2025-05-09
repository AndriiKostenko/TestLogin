import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LoginForm } from "../components"; // Assuming you have a LoginForm component

const LoginScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 12,
  },
});

export default LoginScreen;
