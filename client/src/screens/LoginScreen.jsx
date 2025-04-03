import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Card, Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons"; // Import icon

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Cover 
          source={{
            uri: "https://res.cloudinary.com/dozs7ggs4/image/upload/v1743646845/149940_3609249_497358_image_v67jbi.jpg",
          }}
        />
        <Card.Title title="Welcome to StudyMate!" titleStyle={styles.cardTitle} />

        <Card.Content>
          <TextInput
            label="Username"
            left={<TextInput.Icon icon="account" />}
            style={styles.input}
            underlineColor="black"
          />

          <TextInput
            label="Password"
            left={<TextInput.Icon icon="lock" />}
            secureTextEntry
            style={styles.input}
            underlineColor="black"
          />

          <TouchableOpacity onPress={() => console.log("Forgot Password Pressed")}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </Card.Content>

        <Card.Actions style={styles.actionContainer}>
          <Button mode="contained" onPress={() => console.log("Login Pressed")} style={styles.loginButton}>
            Login
          </Button>
        </Card.Actions>

        <View style={styles.socialContainer}>
          <Text style={styles.orText}>Or Login With</Text>
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="facebook" size={24} color="#1877F2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="google" size={24} color="#DB4437" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.registerContainer}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerText}> Sign Up</Text>
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
    flex: 1, // Card phủ toàn màn hình
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
    marginVertical: 10, // Tăng khoảng cách giữa các input
  },
  forgotPassword: {
    textAlign: "right",
    color: "#1877F2",
    marginVertical: 5,
  },
  actionContainer: {
    justifyContent: "center",
  },
  loginButton: {
    width: "100%",
    borderRadius: 5,
    paddingVertical: 8,
  },
  socialContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  orText: {
    marginBottom: 10,
    fontWeight: "bold",
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  socialButton: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  registerText: {
    color: "#1877F2",
    fontWeight: "bold",
  },
});

export default LoginScreen;
