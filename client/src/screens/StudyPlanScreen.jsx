// src/screens/StudyPlanScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Platform } from 'react-native';
import { Avatar, Card, Button, ActivityIndicator } from "react-native-paper"; // Thêm ActivityIndicator
import { useNavigation, useRoute } from "@react-navigation/native"; // Thêm useRoute

// Dữ liệu MOCK để fallback hoặc khi chưa có dữ liệu
// Bạn có thể xóa MOCK_SCHEDULE_DATA nếu không cần thiết nữa sau khi tích hợp hoàn chỉnh
const MOCK_SCHEDULE_DATA = {
  "schedule": [], // Để trống ban đầu
  "total_priority_score": 0,
  "daily_hours_breakdown": {},
  "message": "Chưa có lịch học nào."
};

const dayNames = [
  'Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'
];

const getRandomColor = () => {
  const colors = ["#9A9DFD", "#D7F9F3", "#FFDDC1", "#C7E9B0", "#F5B0C7", "#B2EBF2", "#FFECB3"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const StudyPlanScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [planData, setPlanData] = useState(null); // Khởi tạo là null để biết khi nào dữ liệu thực sự được truyền vào
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading

  useEffect(() => {
    setIsLoading(true);
    if (route.params?.plan) {
      setPlanData(route.params.plan);
    } else {
      // Nếu không có plan từ params, có thể load từ AsyncStorage hoặc để trống
      // For now, using mock data or an empty state
      // setPlanData(MOCK_SCHEDULE_DATA); // Hoặc để trống và hiển thị nút tạo mới
      setPlanData(null); // Đặt là null để hiển thị nút tạo mới
    }
    setIsLoading(false);
  }, [route.params?.plan]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator animating={true} size="large" />
        <Text>Đang tải lịch học...</Text>
      </View>
    );
  }

  if (!planData || !planData.schedule || planData.schedule.length === 0) {
    return (
      <View style={styles.noScheduleContainer}>
        <Text style={styles.noScheduleText}>Chưa có lịch học nào được tạo.</Text>
        <Text style={styles.noScheduleSubText}>Vui lòng tạo lịch mới để bắt đầu.</Text>
        <Button
          mode="contained"
          icon="plus-circle-outline"
          onPress={() => navigation.navigate('Main', { screen: 'CreateStudyPlan' })}
          style={styles.createButton}
        >
          Tạo Kế Hoạch Mới
        </Button>
      </View>
    );
  }

  const { schedule: scheduleData, daily_hours_breakdown: dailyHoursBreakdown, message } = planData;

  const groupedSchedule = scheduleData.reduce((acc, item) => {
    const day = item.day_of_week;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(item);
    return acc;
  }, {});

  const sortedDays = Object.keys(groupedSchedule).sort((a, b) => parseInt(a) - parseInt(b));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Lịch học của bạn</Text>
          {message && <Text style={styles.message}>{message}</Text>}
        </View>
        <Button
          mode="outlined"
          icon="pencil-plus-outline"
          onPress={() => navigation.navigate('Main', { screen: 'CreateStudyPlan' })} // Điều hướng đến màn hình tạo/chỉnh sửa
          // labelStyle={{fontSize: 12}} // Nút nhỏ hơn
        >
          Tạo/Sửa
        </Button>
      </View>

      <FlatList
        data={sortedDays}
        keyExtractor={(day) => day.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item: dayIndex }) => (
          <View style={styles.daySection}>
            <Text style={styles.dayHeader}>
              {dayNames[parseInt(dayIndex)]} ({dailyHoursBreakdown?.[dayIndex]?.toFixed(1) || 0} giờ)
            </Text>
            {groupedSchedule[dayIndex]
              .sort((a, b) => {
                const timeA = new Date(`2000-01-01T${a.start_time}`);
                const timeB = new Date(`2000-01-01T${b.start_time}`);
                return timeA - timeB;
              })
              .map((item, index) => (
                <View key={item.id || index} style={styles.taskRow}>
                  <View style={styles.time}>
                    <Text style={styles.timeText}>{item.start_time.substring(0, 5)}</Text>
                    <Text style={styles.endTime}>{item.end_time.substring(0, 5)}</Text>
                  </View>
                  <View style={styles.line}></View>
                  <Card style={[styles.card, { backgroundColor: getRandomColor() }]}>
                    <Card.Title
                      title={item.subject_name}
                      titleStyle={styles.cardTitle}
                    />
                    <Card.Content>
                      <View style={styles.infoRow}>
                        <Avatar.Text size={24} label={item.subject_name[0] || 'S'} style={styles.avatar} />
                        <Text style={styles.teacher}>{item.subject_name}</Text>
                      </View>
                    </Card.Content>
                  </Card>
                </View>
              ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Đổi màu nền cho dễ nhìn hơn
    paddingTop: Platform.OS === 'android' ? 25 : 50, // Điều chỉnh padding cho status bar
    paddingHorizontal: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: '#333',
  },
  message: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 5,
  },
  noScheduleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  noScheduleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  noScheduleSubText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  createButton: {
    paddingVertical: 5,
    backgroundColor: '#2196F3',
  },
  daySection: {
    marginBottom: 20,
  },
  dayHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  time: {
    width: 60,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  timeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#333',
  },
  endTime: {
    fontSize: 12,
    color: "#888",
  },
  line: {
    width: 2,
    minHeight: 50, // Chiều cao tối thiểu cho đường kẻ
    backgroundColor: "#BDBDBD",
    marginHorizontal: 10,
    marginTop: 5, // Điều chỉnh để khớp với text
    borderRadius: 1,
  },
  card: {
    flex: 1,
    borderRadius: 12, // Bo tròn hơn
    elevation: 2,
  },
  cardTitle: {
    fontSize: 17, // Kích thước tiêu đề card
    fontWeight: 'bold',
    color: '#333',
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  avatar: {
    marginRight: 8,
    backgroundColor: "#4CAF50", // Màu avatar
  },
  teacher: { // Đổi tên từ teacher sang subject info
    fontSize: 14,
    color: "#333",
    flexShrink: 1, // Cho phép text co lại nếu quá dài
  },
});

export default StudyPlanScreen;