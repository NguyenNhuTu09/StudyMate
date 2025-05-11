import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Card, Text, List, FAB } from "react-native-paper";

const SubjectsScreen = () => {
  const navigation = useNavigation();
  const [subjects, setSubjects] = useState([]);

  // Giả lập dữ liệu subject, sau này sẽ gọi API thay cho useEffect này
  useEffect(() => {
    setSubjects([
      { _id: "1", name: "Toán", description: "Môn học liên quan đến đại số và hình học" },
      { _id: "2", name: "Lập trình", description: "Cơ bản về Java, cấu trúc dữ liệu" },
      { _id: "3", name: "Khoa học", description: "Vật lý, Hoá học, Sinh học" },
      { _id: "4", name: "Ngôn ngữ", description: "Tiếng Anh, tiếng Nhật" },
      { _id: "5", name: "Lịch sử", description: "Việt Nam & thế giới" },
    ]);
  }, []);

  const handleSubjectPress = (subject) => {
    navigation.navigate("SubjectDetail", { subject }); // Điều hướng tới chi tiết môn học
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        📚 Môn học của bạn
      </Text>

      <FlatList
        data={subjects}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => handleSubjectPress(item)}>
            <Card.Content>
              <List.Item
                title={item.name}
                description={item.description}
                left={(props) => <List.Icon {...props} icon="book-open-variant" />}
              />
            </Card.Content>
          </Card>
        )}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        label="Thêm môn học"
        onPress={() => navigation.navigate("AddSubject")}
      />
    </View>
  );
};

export default SubjectsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    marginBottom: 12,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
