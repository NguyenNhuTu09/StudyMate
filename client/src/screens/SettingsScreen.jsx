import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, List, Switch, Text } from "react-native-paper";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF", padding: 16 }}>
      <Text variant="headlineMedium" style={{ fontWeight: "bold", marginBottom: 16 }}>
        ⚙️ Settings
      </Text>

      <List.Item
        title="🌙 Dark Mode"
        right={() => <Switch value={isDarkMode} onValueChange={setIsDarkMode} />}
        style={{ backgroundColor: "#F3F4F6", padding: 12, borderRadius: 8, marginBottom: 16 }}
      />

      <Button mode="contained" buttonColor="#3B82F6" onPress={() => navigation.goBack()}>
        ⬅ Quay lại
      </Button>
    </View>
  );
};

export default SettingsScreen;
