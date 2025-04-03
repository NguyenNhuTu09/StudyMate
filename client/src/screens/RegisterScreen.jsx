import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Card, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import CustomButton01 from "../component/CustomButton01";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Create Your Account" titleStyle={styles.cardTitle} />
        <Card.Content>
          <TextInput
            label="Username"
            left={<TextInput.Icon icon="account" />}
            style={styles.input}
            underlineColor="black"
            value={form.username}
            onChangeText={(text) => setForm({ ...form, username: text })}
          />

          <TextInput
            label="Email"
            left={<TextInput.Icon icon="email" />}
            style={styles.input}
            underlineColor="black"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />

          <TextInput
            label="Password"
            left={<TextInput.Icon icon="lock" />}
            secureTextEntry
            style={styles.input}
            underlineColor="black"
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />

          <TextInput
            label="Confirm Password"
            left={<TextInput.Icon icon="lock" />}
            secureTextEntry
            style={styles.input}
            underlineColor="black"
            value={form.confirmPassword}
            onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
          />
        </Card.Content>

        <Card.Actions style={styles.actionContainer}>
          <CustomButton01 title="Sign Up" onPress={() => console.log("Sign Up Pressed")} />
        </Card.Actions>

        <View style={styles.loginContainer}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginText}> Login</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    padding: 10,
  },
  card: {
    flex: 1,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: "white",
    padding: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "transparent",
    marginVertical: 10,
  },
  actionContainer: {
    justifyContent: "center",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  loginText: {
    color: "#1877F2",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
