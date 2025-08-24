// src/screens/Home.tsx
import { User } from "@/constants/types";
import { fetchAuthSession, signOut } from "@aws-amplify/auth";
import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing signed-in user
  const checkUser = async () => {
    try {
      const session = await fetchAuthSession();
      if (session && session.identityId) {
        const username = session?.tokens?.idToken?.payload["cognito:username"];

        if(username && typeof username === "string"){
            setUser({ username });
        }
      } else {
        setUser(null);
      }
    } catch (err: any) {
      console.log("Error fetching session:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
      Alert.alert("Success", "Logged out successfully!");
    } catch (err: any) {
      console.log("Logout error:", err);
      Alert.alert("Error", "Failed to log out");
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.text}>Signed in as: {user.username}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <Text style={styles.text}>No user signed in</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});
