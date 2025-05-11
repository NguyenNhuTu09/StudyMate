import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Card, Searchbar, Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState("");

  // Dữ liệu danh sách môn học giả lập
  const subjects = [
    { id: "1", name: "Mathematics", icon: "calculator" },
    { id: "2", name: "Physics", icon: "atom" },
    { id: "3", name: "Chemistry", icon: "flask" },
    { id: "4", name: "Computer Science", icon: "laptop-code" },
  ];

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <Searchbar
        placeholder="Search for subjects, topics..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      {/* AI Gợi ý lộ trình học */}
      <Card style={styles.aiCard}>
        <Card.Title 
          title="AI Study Plan" 
          left={(props) => <Avatar.Icon {...props} icon="robot" />} 
        />
        <Card.Content>
          <Text>Get a personalized study plan based on your free time.</Text>
        </Card.Content>
        <Card.Actions>
          <TouchableOpacity onPress={() => navigation.navigate("AIRecommendations")}>
            <Text style={styles.aiButton}>Get AI Recommendations</Text>
          </TouchableOpacity>
        </Card.Actions>
      </Card>

      {/* Danh sách môn học */}
      <Text style={styles.sectionTitle}>Subjects</Text>
      <FlatList
        data={subjects}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.subjectCard} onPress={() => navigation.navigate("Subjects")}>
            <FontAwesome5 name={item.icon} size={24} color="white" />
            <Text style={styles.subjectText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Nút điều hướng nhanh */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickButton} onPress={() => navigation.navigate("StudyPlan")}>
          <FontAwesome5 name="clipboard-list" size={24} color="white" />
          <Text style={styles.quickText}>Study Plan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickButton} onPress={() => navigation.navigate("Settings")}>
          <MaterialIcons name="settings" size={24} color="white" />
          <Text style={styles.quickText}>Settings</Text>
        </TouchableOpacity>
      </View>
      <View>
        
      </View>
    </View>
  );
};

// 🌟 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 10,
  },
  searchBar: {
    marginBottom: 10,
  },
  aiCard: {
    marginBottom: 15,
    padding: 10,
  },
  aiButton: {
    color: "#1877F2",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  subjectCard: {
    backgroundColor: "#4A90E2",
    padding: 20,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  subjectText: {
    color: "white",
    fontWeight: "bold",
    marginTop: 5,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  quickButton: {
    backgroundColor: "#FF7043",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  quickText: {
    color: "white",
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default HomeScreen;
