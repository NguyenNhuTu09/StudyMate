import React from "react";
import { View, StyleSheet } from "react-native";
import { Title, Paragraph, Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";

const SubjectDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { subject } = route.params;

  const handleViewModules = () => {
    navigation.navigate("ModuleList", { subjectId: subject._id });
  };

  const handleEditSubject = () => {
    navigation.navigate("EditSubject", { subject });
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>{subject.name}</Title>
      <Paragraph style={styles.description}>{subject.description}</Paragraph>

      <Button mode="contained" onPress={handleViewModules} style={styles.button}>
        Xem danh sách học phần
      </Button>
      <Button mode="outlined" onPress={handleEditSubject} style={[styles.button, { marginTop: 8 }]}>
        Chỉnh sửa môn học
      </Button>
      <Button mode="text" onPress={() => navigation.goBack()} style={[styles.button, { marginTop: 8 }]}>
        ⬅ Quay lại
      </Button>
    </View>
  );
};

export default SubjectDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 12,
    fontSize: 24,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    marginTop: 12,
  },
});
