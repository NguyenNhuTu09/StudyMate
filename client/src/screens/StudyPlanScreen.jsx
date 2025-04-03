import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Surface, Text } from "react-native-paper";

const StudyPlanScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF", padding: 16 }}>
      <Text variant="headlineMedium" style={{ fontWeight: "bold", marginBottom: 16 }}>
        📅 Study Plan
      </Text>

      <Surface style={{ padding: 16, borderRadius: 8, elevation: 4, backgroundColor: "#F3F4F6", marginBottom: 24 }}>
        <Text variant="bodyLarge" style={{ color: "#6B7280" }}>
          Đây là danh sách kế hoạch học tập của bạn.
        </Text>
      </Surface>

      <Button mode="contained" buttonColor="#3B82F6" onPress={() => navigation.goBack()}>
        ⬅ Quay lại
      </Button>
    </View>
  );
};

export default StudyPlanScreen;
