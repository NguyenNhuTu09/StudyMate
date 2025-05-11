import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import SubjectDetailScreen from "../screens/SubjectDetailScreen";
import AddSubjectScreen from "../screens/AddSubjectScreen";

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tab" component={TabNavigator} />
      <Stack.Screen name="SubjectDetail" component={SubjectDetailScreen} options={{ title: "Chi tiết môn học" }} />
      <Stack.Screen name="AddSubject" component={AddSubjectScreen} options={{ title: "Thêm môn học" }} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
