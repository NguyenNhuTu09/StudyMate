import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PaperProvider } from "react-native-paper";
import AppNavigator from "./src/navigation/AppNavigator";


const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar/>
          <AppNavigator/>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default App;
