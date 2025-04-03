import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tab" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
