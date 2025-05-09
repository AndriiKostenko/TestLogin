import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import { useQuery } from "@tanstack/react-query";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { userService } from "../services";
import { NavigationRoutes } from "../enums/navigation.enum";
import { RootStackParamList } from "../navigation/AppNavigator";
import { User } from "../types";
import { CustomButton } from "../ui";

const Profile: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user, logout } = useAuth();

  const queryResult = useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: () => userService.fetchUser(user!.accessToken),
    enabled: !!user?.accessToken,
  });

  const { data: userData, error, isLoading } = queryResult;

  useLayoutEffect(() => {
    if (navigation && userData) {
      navigation.setOptions({
        headerTitle: () => (
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>
              Hi, {userData.firstName} {userData.lastName}!
            </Text>
          </View>
        ),
      });
    }
  }, [navigation, userData]);

  if (!user) {
    navigation.navigate(NavigationRoutes.HOME);
    return null;
  }

  const handleLogout = () => {
    logout();
    navigation.navigate(NavigationRoutes.HOME);
  };

  if (isLoading) {
    return <Text>Loading user data...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <CustomButton onPress={handleLogout} label="Logout" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F8FA",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
});

export default Profile;
