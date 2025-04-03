import React from "react";
import { View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Card, Text, List } from "react-native-paper";

const SubjectsScreen = () => {
  const navigation = useNavigation();
  const subjects = ["Toán", "Lập trình", "Khoa học", "Ngôn ngữ", "Lịch sử"];

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF", padding: 16 }}>
      <Text variant="headlineMedium" style={{ fontWeight: "bold", marginBottom: 16 }}>
        📚 Subjects
      </Text>

      <FlatList
        data={subjects}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 8 }}>
            <Card.Content>
              <List.Item title={item} left={(props) => <List.Icon {...props} icon="book" />} />
            </Card.Content>
          </Card>
        )}
      />

      <Button mode="contained" buttonColor="#3B82F6" onPress={() => navigation.goBack()} style={{ marginTop: 16 }}>
        ⬅ Quay lại
      </Button>
    </View>
  );
};

export default SubjectsScreen;
