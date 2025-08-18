// src/screens/Register.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { signUp, confirmSignUp } from "@aws-amplify/auth";


export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [step, setStep] = useState("register"); // register | confirm

    const signUpUser = async () => {
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
            Alert.alert("Error", err.message || "Something went wrong");
        }
    };

    const confirmUser = async () => {
        try {
            await confirmSignUp({ username, confirmationCode: code });
            Alert.alert("Success", "Account confirmed!");
        } catch (err: any) {
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
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Register" onPress={signUpUser} />
        </>
      ) : (
        <>
          <TextInput
            placeholder="Confirmation Code"
            style={styles.input}
            value={code}
            onChangeText={setCode}
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
});
