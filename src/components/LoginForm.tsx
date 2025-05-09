import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { authService } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { LoginResponse } from "../types";
import { useForm, Controller } from "react-hook-form";
import { RootStackParamList } from "../navigation/AppNavigator";
import { NavigationRoutes } from "../enums/navigation.enum";
import { GradientButton } from "../ui";
const closeIcon = require("../assets/images/icons/close.png");

interface FormData {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { login } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = async (data: FormData) => {
    try {
      const userData: LoginResponse = await authService.login(
        data.username,
        data.password
      );
      console.log("User data:", userData);
      login(userData);
      navigation.navigate(NavigationRoutes.PROFILE);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message || "Login failed");
      } else {
        setError("Login failed");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View>
        {error && <Text style={styles.error}>{error}</Text>}
        {usernameFocused && <Text style={styles.label}>Username</Text>}
        <Controller
          control={control}
          rules={{
            required: "Username is required",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, usernameFocused && styles.inputFocused]}
                placeholder={usernameFocused ? undefined : "Username"}
                onBlur={() => {
                  onBlur();
                  setUsernameFocused(false);
                }}
                onFocus={() => setUsernameFocused(true)}
                onChangeText={onChange}
                value={value}
                placeholderTextColor={"#879399"}
              />
              {value ? (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => onChange("")}
                >
                  <Image source={closeIcon} />
                </TouchableOpacity>
              ) : null}
            </View>
          )}
          name="username"
        />
      </View>
      {errors.username && (
        <Text style={styles.error}>{errors.username.message}</Text>
      )}

      <View>
        {passwordFocused && <Text style={styles.label}>Password</Text>}
        <Controller
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, passwordFocused && styles.inputFocused]}
                placeholder={passwordFocused ? undefined : "Password"}
                secureTextEntry
                onBlur={() => {
                  onBlur();
                  setPasswordFocused(false);
                }}
                onFocus={() => setPasswordFocused(true)}
                onChangeText={onChange}
                value={value}
                placeholderTextColor={"#879399"}
              />

              {value ? (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => onChange("")}
                >
                  <Image source={closeIcon} />
                </TouchableOpacity>
              ) : null}
            </View>
          )}
          name="password"
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}
      </View>

      <GradientButton onPress={handleSubmit(handleLogin)} label="Login"/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: "400",
    color: "#338BFF",
    top: 6,
    left: 16,
    position: "absolute",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 53,
    borderColor: "#D8E2E6",
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    width: "100%",
    color: "#000",
  },
  inputFocused: {
    borderColor: "#338BFF",
    borderWidth: 1,
    paddingBottom: 6,
  },
  clearButton: {
    position: "absolute",
    right: 16,
    top: 18,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export { LoginForm };
