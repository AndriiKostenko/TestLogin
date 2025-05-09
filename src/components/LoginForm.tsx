import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";

interface FormData {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = async (data: FormData) => {
    
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
          )}
          name="username"
        />
        {errors.username && (
          <Text style={styles.error}>{errors.username.message}</Text>
        )}
      </View>

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
          )}
          name="password"
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}
      </View>

      <Button title="Login" onPress={handleSubmit(handleLogin)} />
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
  input: {
    height: 53,
    borderColor: "#D8E2E6",
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    width: "100%",
  },
  inputFocused: {
    borderColor: "#338BFF",
    borderWidth: 1,
    paddingBottom: 6,
    // marginBottom: 12,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export { LoginForm };
