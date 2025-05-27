import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import các màn hình bạn đã tạo
import AllStudyPlansScreen from '../screens/SubjectsScreen';
import StudyPlanDetailScreen from '../screens/SubjectDetailScreen';

const Stack = createNativeStackNavigator();

const StudyPlanStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      {/* Màn hình gốc của Stack này sẽ là danh sách tất cả kế hoạch */}
      <Stack.Screen
        name="AllPlans" // Tên này sẽ được dùng để navigate đến màn hình danh sách
        component={AllStudyPlansScreen}
        options={{ title: 'Các Kế Hoạch Đã Tạo' }} // Tiêu đề cho màn hình này
      />
      {/* Màn hình chi tiết kế hoạch */}
      <Stack.Screen
        name="StudyPlanDetail" // Tên này sẽ được dùng để navigate đến màn hình chi tiết
        component={StudyPlanDetailScreen}
        options={{ title: 'Chi Tiết Kế Hoạch' }} // Tiêu đề cho màn hình này
      />
    </Stack.Navigator>
  );
};

export default StudyPlanStack;