import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { Avatar, Button, Card } from "react-native-paper";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

const scheduleData = [
  {
    id: "1",
    time: "9:30",
    endTime: "10:20",
    subject: "Physics",
    topic: "Chapter 3: Force",
    teacher: "Alex Jesus",
    platform: "Google Meet",
    platformIcon: "google",
    color: "#9A9DFD",
  },
  {
    id: "2",
    time: "11:00",
    endTime: "11:50",
    subject: "Geography",
    topic: "Chapter 12: Soil Profile",
    teacher: "Jenifer Clark",
    platform: "Zoom",
    platformIcon: "video",
    color: "#D7F9F3",
  },
  {
    id: "3",
    time: "12:20",
    endTime: "13:00",
    subject: "Assignment",
    topic: "World Regional Pattern",
    teacher: "Alexa Tenorio",
    platform: "Google Docs",
    platformIcon: "file-document",
    color: "#D7F9F3",
  },
];

const StudyPlanScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.date}>17 April</Text>
          <Text style={styles.title}>Today</Text>
        </View>
        <Button mode="contained" buttonColor="#4CAF50" style={styles.addButton}>
          + Add Task
        </Button>
      </View>

      {/* Calendar row (giả lập) */}
      <View style={styles.weekRow}>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => (
          <View key={idx} style={idx === 3 ? styles.activeDay : styles.day}>
            <Text style={styles.dayText}>{day}</Text>
            <Text style={idx === 3 ? styles.activeDate : styles.dateText}>{14 + idx}</Text>
          </View>
        ))}
      </View>

      <FlatList
        data={scheduleData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <View style={styles.time}>
              <Text style={styles.timeText}>{item.time}</Text>
              <Text style={styles.endTime}>{item.endTime}</Text>
            </View>

            <View style={styles.line}></View>

            <Card style={[styles.card, { backgroundColor: item.color }]}>
              <Card.Title title={item.subject} subtitle={item.topic} />
              <Card.Content>
                <View style={styles.infoRow}>
                  <Avatar.Text size={24} label={item.teacher[0]} style={styles.avatar} />
                  <Text style={styles.teacher}>{item.teacher}</Text>
                </View>
                <View style={styles.infoRow}>
                  <MaterialCommunityIcons name={item.platformIcon} size={20} color="#4CAF50" />
                  <Text style={styles.platform}>{item.platform}</Text>
                </View>
              </Card.Content>
            </Card>
          </View>
        )}
      />
    </View>
  );
};

export default StudyPlanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    color: "#888",
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    borderRadius: 8,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  day: {
    alignItems: "center",
  },
  activeDay: {
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "#4CAF50",
    paddingBottom: 4,
  },
  dayText: {
    fontSize: 14,
    color: "#444",
  },
  dateText: {
    fontSize: 14,
    color: "#444",
  },
  activeDate: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  time: {
    width: 60,
  },
  timeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  endTime: {
    fontSize: 12,
    color: "#888",
  },
  line: {
    width: 2,
    height: "100%",
    backgroundColor: "#BDBDBD",
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 1,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  avatar: {
    marginRight: 8,
    backgroundColor: "#4CAF50",
  },
  teacher: {
    fontSize: 14,
    color: "#333",
  },
  platform: {
    fontSize: 14,
    marginLeft: 6,
  },
});
