import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services';
import { NavigationRoutes } from "../enums/navigation.enum";
import { RootStackParamList } from "../navigation/AppNavigator";
import { User } from '../types';
import { CustomButton } from '../ui';

const Profile: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { user, logout } = useAuth();

    const queryResult = useQuery<User, Error>({
        queryKey: ['user'],
        queryFn: () => userService.fetchUser(user!.accessToken),
        enabled: !!user?.accessToken,
    });

    const { data: userData, error, isLoading } = queryResult;

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
            <Text style={styles.title}>Profile</Text>
            <Text>Username: {userData?.username}</Text>
            <Text>Email: {userData?.email}</Text>
            <Text>First Name: {userData?.firstName}</Text>
            <Text>Last Name: {userData?.lastName}</Text>
            <CustomButton onPress={handleLogout} label='Logout' />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default Profile;
