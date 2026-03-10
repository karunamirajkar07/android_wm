import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../redux/slice/login";

export default function Forgot() {

    const auth = useSelector((state) => state.login);
    const [newPassword, setNewPassword] = useState("")
    const [email, setEmail] = useState(auth.email);
    const dispatch = useDispatch();
    
    const handleReset = () => {
        if (!newPassword) {
          alert("Please enter a new password");
          return;
        }
    
        if (email !== auth.email) {
          alert("Email does not match registered user");
          return;
        }
        dispatch(updatePassword(newPassword));
    
        alert("Password updated successfully!");
        router.replace("/"); 
      };

    return (
        <LinearGradient
            colors={["#06141B", "#0B2E3F", "#051923"]}
            style={styles.container}
        >
            <View style={styles.inner}>

                <Text style={styles.title}>Forgot Password</Text>

                <TextInput
                    placeholder="Enter your email"
                    placeholderTextColor="#8fa3ad"
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    editable={false}
                />

                <TextInput
                    placeholder="Enter New Password"
                    placeholderTextColor="#8fa3ad"
                    style={styles.input}
                    value={newPassword}
                    onChangeText={setNewPassword}
                />

                <TouchableOpacity onPress={handleReset} style={styles.button}>
                    <Text style={styles.buttonText}>OK</Text>
                </TouchableOpacity>

            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center" },

    inner: {
        padding: 25
    },

    title: {
        color: "#fff",
        fontSize: 22,
        textAlign: "center",
        marginBottom: 30
    },

    input: {
        borderWidth: 1,
        borderColor: "#00E5FF",
        padding: 15,
        borderRadius: 10,
        color: "#fff",
        marginBottom: 20
    },

    button: {
        backgroundColor: "#00E5FF",
        padding: 15,
        borderRadius: 20,
        alignItems: "center"
    },

    buttonText: {
        fontWeight: "bold"
    }
});