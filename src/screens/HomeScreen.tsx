import React from "react";
import { View, StyleSheet } from "react-native";
import { GradientButton } from "../ui";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { NavigationRoutes } from "../enums/navigation.enum";

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLoginPress = () => {
    navigation.navigate(NavigationRoutes.LOGIN);
  };

  return (
    <View style={styles.container}>
      <GradientButton onPress={handleLoginPress} label="Go to login"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default HomeScreen;
