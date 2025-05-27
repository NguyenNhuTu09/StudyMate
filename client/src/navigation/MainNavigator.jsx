import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import SubjectDetailScreen from "../screens/SubjectDetailScreen";
import AddSubjectScreen from "../screens/AddSubjectScreen";
import CreateStudyPlanScreen from "../screens/CreateStudyPlanScreen"; // <--- Import mới

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tab" component={TabNavigator} />
      <Stack.Screen name="SubjectDetail" component={SubjectDetailScreen} options={{ title: "Chi tiết môn học" }} />
      <Stack.Screen name="AddSubject" component={AddSubjectScreen} options={{ title: "Thêm môn học" }} />
      <Stack.Screen
        name="CreateStudyPlan" 
        component={CreateStudyPlanScreen}
        options={{ title: "Tạo Kế Hoạch Học Tập", headerShown: true }} // <--- Hiển thị header cho màn hình này
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
