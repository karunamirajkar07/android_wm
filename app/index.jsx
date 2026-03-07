import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState("aditya@gmail.com");
  const [password, setPassword] = useState("pass123");

  const handleLogin = () => {
   if(email === "aditya@gmail.com" && password === "pass123") {
    router.push("/home");
   } else {
    alert("Invalid credentials. Please try again.");
   }
  }

  return (
    <LinearGradient
      colors={["#06141B", "#0B2E3F", "#051923"]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.inner}>
        <Text style={styles.title}>IoT Washing Machine</Text>
        <Text style={styles.logo}>≋≋≋</Text>
        <Text style={styles.subtitle}>
          Sign in to access your smart washing machine
        </Text>

        {/* EMAIL FIELD */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#00E5FF" />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#8fa3ad"
            style={styles.input}
            // value={email}
  onChangeText={setEmail}
          />
        </View>

        {/* PASSWORD FIELD */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#00E5FF" />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#8fa3ad"
            secureTextEntry={secure}
            style={styles.input}
            // value={password}
  onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Ionicons
              name={secure ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#00E5FF"
            />
          </TouchableOpacity>
        </View>

        {/* FORGOT PASSWORD */}
        <TouchableOpacity style={styles.forgotContainer}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* LOGIN BUTTON */}
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.loginButton}
        >
          <LinearGradient
            colors={["#00E5FF", "#00B8D4"]}
            style={styles.gradientBtn}
          >
            <Text style={styles.buttonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  inner: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  logo: {
    fontSize: 50,
    textAlign: "center",
    color: "#00E5FF",
    marginBottom: 10,
  },

  title: {
    fontSize: 26,
    textAlign: "center",
    color: "#E0F7FA",
    fontWeight: "600",
  },

  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#9ED9E3",
    marginBottom: 30,
    marginTop: 5,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(0,229,255,0.3)",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 15,
  },

  input: {
    flex: 1,
    padding: 15,
    color: "#fff",
  },

  forgotContainer: {
    alignItems: "flex-end",
    marginBottom: 25,
  },

  forgotText: {
    color: "#00E5FF",
    fontSize: 14,
  },

  loginButton: {},

  gradientBtn: {
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#00E5FF",
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },

  buttonText: {
    color: "#002B36",
    fontWeight: "bold",
    fontSize: 16,
  },
});