// src/screens/Register.js
import { confirmSignUp, signUp } from "@aws-amplify/auth";
import React, { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState("register"); // register | confirm
  const [showPassword, setShowPassword] = useState(false); // 👈 password toggle

  // Password validation checks
  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  // Email regex for validation
  const isValidEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const validateInputs = () => {
    if (!username.trim()) {
      Alert.alert("Validation Error", "Username is required.");
      return false;
    }
    if (!email.trim() || !isValidEmail(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return false;
    }
    if (
      !passwordChecks.length ||
      !passwordChecks.uppercase ||
      !passwordChecks.lowercase ||
      !passwordChecks.number ||
      !passwordChecks.special
    ) {
      Alert.alert("Validation Error", "Password does not meet requirements.");
      return false;
    }
    return true;
  };

  const signUpUser = async () => {
    if (!validateInputs()) return; // stop if validation fails

    try {
      await signUp({
        username,
        password,
        options: {
          userAttributes: { email },
        },
      });
      setStep("confirm");
    } catch (err: any) {
      console.log("Error", err.message || "Something went wrong");
      Alert.alert("Error", err.message || "Something went wrong");
    }
  };

  const confirmUser = async () => {
    if (!code.trim()) {
      Alert.alert("Validation Error", "Confirmation code is required.");
      return;
    }

    try {
      await confirmSignUp({ username, confirmationCode: code });
      console.log("Success", "Account confirmed!");
      Alert.alert("Success", "Account confirmed!");
    } catch (err: any) {
      console.log("Error", err.message || "Invalid code");
      Alert.alert("Error", err.message || "Invalid code");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {step === "register" ? "Register" : "Confirm Code"}
      </Text>

      {step === "register" ? (
        <>
          <TextInput
            placeholder="Username"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          {/* Password input with toggle */}
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
              <Text style={styles.toggleText}>
                {showPassword ? "Hide" : "Show"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Password requirements */}
          <View style={{ marginBottom: 12 }}>
            <Text
              style={[
                styles.requirement,
                { color: passwordChecks.length ? "green" : "red" },
              ]}
            >
              • At least 8 characters
            </Text>
            <Text
              style={[
                styles.requirement,
                { color: passwordChecks.uppercase ? "green" : "red" },
              ]}
            >
              • At least 1 uppercase letter
            </Text>
            <Text
              style={[
                styles.requirement,
                { color: passwordChecks.lowercase ? "green" : "red" },
              ]}
            >
              • At least 1 lowercase letter
            </Text>
            <Text
              style={[
                styles.requirement,
                { color: passwordChecks.number ? "green" : "red" },
              ]}
            >
              • At least 1 number
            </Text>
            <Text
              style={[
                styles.requirement,
                { color: passwordChecks.special ? "green" : "red" },
              ]}
            >
              • At least 1 special character
            </Text>
          </View>

          <Button title="Register" onPress={signUpUser} />
        </>
      ) : (
        <>
          <TextInput
            placeholder="Confirmation Code"
            style={styles.input}
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
          />
          <Button title="Confirm" onPress={confirmUser} />
        </>
      )}
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
  requirement: {
    fontSize: 14,
    marginLeft: 5,
  },
});
