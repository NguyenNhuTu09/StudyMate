import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Card, Surface, Text } from "react-native-paper";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F6", padding: 16 }}>
      {/* Tiêu đề */}
      <Text variant="headlineMedium" style={{ textAlign: "center", color: "#2563EB", fontWeight: "bold", marginBottom: 16 }}>
        Personal AI Learning
      </Text>

      {/* Trạng thái học tập */}
      <Surface style={{ padding: 16, borderRadius: 8, elevation: 4, backgroundColor: "white", marginBottom: 24 }}>
        <Text variant="titleMedium">Hôm nay bạn có 3 nhiệm vụ</Text>
        <Text variant="bodyMedium" style={{ color: "#6B7280" }}>Hãy hoàn thành chúng nào! 🚀</Text>
      </Surface>

      {/* Các nút điều hướng */}
      <Card style={{ marginBottom: 12 }}>
        <Button mode="contained" buttonColor="#3B82F6" onPress={() => navigation.navigate("StudyPlan")}>
          📅 My Study Plan
        </Button>
      </Card>

      <Card style={{ marginBottom: 12 }}>
        <Button mode="contained" buttonColor="#10B981" onPress={() => navigation.navigate("Subjects")}>
          📚 Subjects
        </Button>
      </Card>

      <Card style={{ marginBottom: 12 }}>
        <Button mode="contained" buttonColor="#9333EA" onPress={() => navigation.navigate("AIRecommendations")}>
          🤖 AI Recommendations
        </Button>
      </Card>

      <Card>
        <Button mode="contained" buttonColor="#374151" onPress={() => navigation.navigate("Settings")}>
          ⚙️ Settings
        </Button>
      </Card>
    </View>
  );
};

export default HomeScreen;
