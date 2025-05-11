import React, { useState } from "react";
import { Modal, Portal, TextInput, Button, Title } from "react-native-paper";
import { View, StyleSheet } from "react-native";

const AddSubjectModal = ({ visible, onDismiss, onAddSubject }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (name.trim()) {
      const newSubject = { name, description };
      onAddSubject(newSubject); // callback gửi về component cha
      setName("");
      setDescription("");
      onDismiss();
    }
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modalContainer}>
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
        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          ✅ Thêm
        </Button>
        <Button mode="text" onPress={onDismiss} style={styles.button}>
          ❌ Hủy
        </Button>
      </Modal>
    </Portal>
  );
};

export default AddSubjectModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  title: {
    marginBottom: 16,
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
  },
});
