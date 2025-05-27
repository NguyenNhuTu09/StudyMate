// src/screens/AIRecommendationsScreen.js
import React from "react";
import { View, StyleSheet } from "react-native"; // Thêm StyleSheet
import { useNavigation } from "@react-navigation/native";
import { Button, Surface, Text } from "react-native-paper";

const AIRecommendationsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.headline}>
        🤖 AI Recommendations
      </Text>

      <Surface style={styles.surface}>
        <Text variant="bodyLarge" style={styles.surfaceText}>
          Tính năng gợi ý lịch học bằng AI đang được phát triển.
          Hiện tại, bạn có thể tự tạo kế hoạch học tập cho mình.
        </Text>
      </Surface>

      <Button
        mode="contained"
        buttonColor="#3B82F6" // Màu xanh dương
        icon="calendar-plus" // Icon tạo lịch
        onPress={() => navigation.navigate('Main', { screen: 'CreateStudyPlan' })} // Điều hướng đến màn hình tạo kế hoạch
        style={styles.button}
      >
        Tạo Kế Hoạch Thủ Công
      </Button>

      <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.button}>
        ⬅ Quay lại
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({ // Thêm style
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20, // Tăng padding
    justifyContent: 'center', // Căn giữa nội dung
    alignItems: 'center', // Căn giữa theo chiều ngang
  },
  headline: {
    fontWeight: "bold",
    marginBottom: 24, // Tăng khoảng cách
    textAlign: 'center',
  },
  surface: {
    padding: 20, // Tăng padding
    borderRadius: 12, // Bo tròn hơn
    elevation: 4,
    backgroundColor: "#F3F4F6",
    marginBottom: 30, // Tăng khoảng cách
    width: '100%', // Chiếm toàn bộ chiều rộng
  },
  surfaceText: {
    color: "#4B5563", // Màu chữ đậm hơn
    textAlign: 'center',
    lineHeight: 22, // Tăng chiều cao dòng
  },
  button: {
    marginTop: 16, // Thêm khoảng cách giữa các nút
    width: '80%', // Đặt chiều rộng cho nút
    paddingVertical: 6, // Tăng padding dọc cho nút
  }
});

export default AIRecommendationsScreen;