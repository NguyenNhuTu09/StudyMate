import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const AddSubjectScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddSubject = () => {
    // Gọi API ở đây nếu cần
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Thêm môn học mới</Title>
      <TextInput
        label="Tên môn học"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Mô tả"
        value={description}
        onChangeText={setDescription}
        mode="outlined"
        multiline
        numberOfLines={3}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleAddSubject} style={styles.button}>
        Thêm môn học
      </Button>
      <Button mode="text" onPress={() => navigation.goBack()} style={styles.button}>
        ⬅ Quay lại
      </Button>
    </View>
  );
};

export default AddSubjectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 12,
  },
});
