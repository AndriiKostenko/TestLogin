import React from "react";
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import AppNavigator from "./src/navigation/AppNavigator";

import { AuthProvider } from './src/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  const queryClient = new QueryClient();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
       <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <AuthProvider>
                        <AppNavigator />
                    </AuthProvider>
                </NavigationContainer>
            </SafeAreaProvider>
        </QueryClientProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
