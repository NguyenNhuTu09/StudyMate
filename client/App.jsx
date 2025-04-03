import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PaperProvider } from "react-native-paper";

import HomeScreen from "./src/screens/HomeScreen";
import StudyPlanScreen from "./src/screens/StudyPlanScreen";
import SubjectsScreen from "./src/screens/SubjectsScreen";
import AIRecommendationsScreen from "./src/screens/AIRecommendationsScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import LoginScreen from "./src/screens/LoginScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar/>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="StudyPlan" component={StudyPlanScreen} />
            <Stack.Screen name="Subjects" component={SubjectsScreen} />
            <Stack.Screen name="AIRecommendations" component={AIRecommendationsScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default App;
