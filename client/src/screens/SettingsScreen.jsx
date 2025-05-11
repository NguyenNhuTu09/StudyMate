import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, List, Switch, Text } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const SettingsScreen = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity> */}
        <Text variant="headlineMedium" style={{alignItems:"center"}}>
          Cài đặt
        </Text>
      </View>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: "https://i.pravatar.cc/300", // có thể thay bằng avatar người dùng thật
          }}
          style={styles.avatar}
        />
        <Text variant="titleMedium" style={styles.username}>
          John Doe
        </Text>
      </View>

      <View style={styles.listContainer}>
        <List.Item
          title="Chỉnh sửa thông tin cá nhân"
          left={() => <List.Icon icon="account-edit" />}
          onPress={() => console.log("Edit profile")}
          style={styles.listItem}
        />
        <List.Item
          title="Cài đặt hệ thống"
          left={() => <List.Icon icon="cog" />}
          onPress={() => console.log("System settings")}
          style={styles.listItem}
        />
        <List.Item
          title="Trợ giúp & Hỗ trợ"
          left={() => <List.Icon icon="help-circle" />}
          onPress={() => console.log("Help")}
          style={styles.listItem}
        />
        <List.Item
          title="Dark Mode"
          left={() => <List.Icon icon="theme-light-dark" />}
          right={() => (
            <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
          )}
          style={styles.listItem}
        />
        <List.Item
          title="Đăng xuất"
          left={() => <List.Icon icon="logout" />}
          onPress={() => console.log("Logout")}
          style={[styles.listItem, { backgroundColor: "#FEE2E2" }]}
        />
      </View>

      
    </View>
  );
};

export default SettingsScreen;

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  headerBar: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 8,
  },
  username: {
    fontWeight: "600",
  },
  listContainer: {
    marginBottom: 24,
  },
  listItem: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 15,
  },
});
