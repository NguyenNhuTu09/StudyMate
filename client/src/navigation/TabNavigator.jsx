import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import StudyPlanScreen from "../screens/StudyPlanScreen";
import SubjectsScreen from "../screens/SubjectsScreen";
import AIRecommendationsScreen from "../screens/AIRecommendationsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SubjectDetailScreen from "../screens/SubjectDetailScreen";
import StudyPlanStack from "./StudyPlanStack";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="home" size={size} color={color} />,
        }} 
      />
      <Tab.Screen 
        name="Create" 
        component={StudyPlanScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="calendar" size={size} color={color} />,
        }} 
      />
      <Tab.Screen 
        name="AllPlans" 
        component={StudyPlanStack} 
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="book" size={size} color={color} />,
        }} 
      />
     
      <Tab.Screen 
        name="AI" 
        component={AIRecommendationsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="robot" size={size} color={color} />,
        }} 
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="cog" size={size} color={color} />,
        }} 
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
