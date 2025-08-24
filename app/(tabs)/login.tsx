// src/screens/Login.tsx
import { fetchAuthSession, signIn } from "@aws-amplify/auth";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginUser = async () => {
    try {
        const user = await signIn({ username, password });
        console.log("User object:", user);

        const session = await fetchAuthSession();
        console.log("Auth session:", session);

    } catch (err: any) {
      console.log("Error with logging in", err)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          style={styles.passwordInput}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.toggleButton}
        >
          <Text style={styles.toggleText}>{showPassword ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>

      <Button title="Login" onPress={loginUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginVertical: 8,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
  },
  toggleButton: {
    padding: 12,
  },
  toggleText: {
    color: "#007AFF",
    fontWeight: "500",
  },
});
