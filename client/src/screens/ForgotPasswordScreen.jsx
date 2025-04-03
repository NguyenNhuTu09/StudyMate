import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Card, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import CustomButton01 from "../component/CustomButton01";

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Reset Your Password" titleStyle={styles.cardTitle} />
        <Card.Content>
          <Text style={styles.description}>
            Enter your email address and we will send you a link to reset your password.
          </Text>

          <TextInput
            label="Email"
            left={<TextInput.Icon icon="email" />}
            style={styles.input}
            underlineColor="black"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </Card.Content>

        <Card.Actions style={styles.actionContainer}>
          <CustomButton01 title="Send Reset Link" onPress={() => console.log("Reset Link Sent")} />
        </Card.Actions>

        <View style={styles.backToLoginContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.backToLoginText}>Back to Login</Text>
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
  description: {
    textAlign: "center",
    fontSize: 14,
    color: "#555",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "transparent",
    marginVertical: 10,
  },
  actionContainer: {
    justifyContent: "center",
  },
  backToLoginContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  backToLoginText: {
    color: "#1877F2",
    fontWeight: "bold",
  },
});

export default ForgotPasswordScreen;
