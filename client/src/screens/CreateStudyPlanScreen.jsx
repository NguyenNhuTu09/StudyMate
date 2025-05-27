import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Platform, ActivityIndicator } from 'react-native';
import { TextInput, Button, Card, Title, List, HelperText, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
// CẬP NHẬT URL API CỦA BẠN SAO CHO ĐÚNG ĐẾN ENDPOINT SPRING BOOT CỦA BẠN!
// Ví dụ: 'http://localhost:8080/api/v1/generate-schedule' nếu Spring Boot chạy local
// Nếu Spring Boot của bạn có context path khác, hãy thay đổi cho phù hợp.
const API_URL = 'http://10.0.2.2:8080/api/study-plans/generate'; // <<<--- HÃY ĐẢM BẢO ĐÂY LÀ URL ĐÚNG

const CreateStudyPlanScreen = () => {
    const navigation = useNavigation();
    const { colors } = useTheme();

    // State cho Subjects
    const [subjects, setSubjects] = useState([]);
    const [currentSubjectName, setCurrentSubjectName] = useState('');
    const [currentEstimatedHours, setCurrentEstimatedHours] = useState('');
    const [currentPriority, setCurrentPriority] = useState('');
    // GIỮ NGUYÊN 'any' LÀM GIÁ TRỊ MẶC ĐỊNH VÀ GỬI NÓ ĐI
    const [currentPreferredTimeOfDay, setCurrentPreferredTimeOfDay] = useState('any');
    const [currentMinSessions, setCurrentMinSessions] = useState('');
    const [currentMaxSessions, setCurrentMaxSessions] = useState('');
    const [currentAvoidDays, setCurrentAvoidDays] = useState([]); // [0, 1, ...]

    // State cho Available Time Slots
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [currentTimeSlotDayOfWeek, setCurrentTimeSlotDayOfWeek] = useState(0);
    const [currentTimeSlotStartTime, setCurrentTimeSlotStartTime] = useState(new Date(new Date().setHours(8, 0, 0, 0)));
    const [currentTimeSlotEndTime, setCurrentTimeSlotEndTime] = useState(new Date(new Date().setHours(12, 0, 0, 0)));

    // State cho Picker hiển thị
    const [showTimeSlotStartTimePicker, setShowTimeSlotStartTimePicker] = useState(false);
    const [showTimeSlotEndTimePicker, setShowTimeSlotEndTimePicker] = useState(false);

    // Global Plan Settings
    const [maxConsecutiveHours, setMaxConsecutiveHours] = useState('3'); // Giá trị mặc định
    const [balanceLearningAcrossDays, setBalanceLearningAcrossDays] = useState(true); // Giá trị mặc định

    // API Call State
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState(null);

    // --- Utility Functions ---
    const formatTime = (date) => {
        // Đảm bảo date là một đối tượng Date hợp lệ
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            const now = new Date(); // Fallback to current time if date is invalid
            return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:00`;
        }
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:00`;
    };

    const hasErrors = (value, type) => {
        if (type === 'number') {
            return value !== '' && (isNaN(Number(value)) || Number(value) < 0); // Giờ, ưu tiên, số buổi có thể là 0 nếu logic cho phép
        }
        return false;
    };

    // --- Handle Subject Management ---
    const handleAddSubject = () => {
        if (!currentSubjectName.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập tên môn học.');
            return;
        }
        if (hasErrors(currentEstimatedHours, 'number') || hasErrors(currentPriority, 'number') ||
            hasErrors(currentMinSessions, 'number') || hasErrors(currentMaxSessions, 'number')) {
            Alert.alert('Lỗi', 'Vui lòng nhập số hợp lệ cho giờ, ưu tiên và số buổi (không âm).');
            return;
        }
        if (currentPriority !== '' && (parseInt(currentPriority) < 1 || parseInt(currentPriority) > 5)) {
             Alert.alert('Lỗi', 'Độ ưu tiên phải là số từ 1 đến 5.');
             return;
        }
        if (currentMinSessions && currentMaxSessions && parseInt(currentMinSessions) > parseInt(currentMaxSessions)) {
            Alert.alert('Lỗi', 'Số buổi tối thiểu không thể lớn hơn số buổi tối đa.');
            return;
        }

        const newSubject = {
            name: currentSubjectName.trim(),
            // Chuyển về số hoặc để null/undefined nếu không có giá trị
            estimated_hours: currentEstimatedHours ? parseInt(currentEstimatedHours) : undefined,
            priority: currentPriority ? parseInt(currentPriority) : undefined,
            
            // QUAN TRỌNG: Gửi preferred_time_of_day là 'any' nếu người dùng không chọn gì khác
            preferred_time_of_day: currentPreferredTimeOfDay, 

            min_sessions: currentMinSessions ? parseInt(currentMinSessions) : undefined,
            max_sessions: currentMaxSessions ? parseInt(currentMaxSessions) : undefined,
            
            // QUAN TRỌNG: Luôn gửi avoid_days là một mảng, ngay cả khi rỗng
            avoid_days: [...currentAvoidDays], // Đảm bảo luôn là một mảng
            
            id: Math.random().toString(), // Tạm thời dùng id cho UI
        };

        // Loại bỏ các trường undefined để không gửi lên API nếu không có giá trị
        // Giữ lại preferred_time_of_day và avoid_days vì chúng đã được đảm bảo giá trị mặc định hợp lệ.
        Object.keys(newSubject).forEach(key => {
            if (newSubject[key] === undefined) {
                delete newSubject[key];
            }
        });

        setSubjects([...subjects, newSubject]);
        setCurrentSubjectName('');
        setCurrentEstimatedHours('');
        setCurrentPriority('');
        setCurrentPreferredTimeOfDay('any'); // Reset về 'any'
        setCurrentMinSessions('');
        setCurrentMaxSessions('');
        setCurrentAvoidDays([]); // Reset về mảng rỗng
        Alert.alert('Thành công', 'Đã thêm môn học.');
    };

    const handleRemoveSubject = (id) => {
        if (isLoading) return;
        setSubjects(prevSubjects => prevSubjects.filter(s => s.id !== id));
    };

    // --- Handle Time Slot Management ---
    const handleAddTimeSlot = () => {
        const startTotalMinutes = currentTimeSlotStartTime.getHours() * 60 + currentTimeSlotStartTime.getMinutes();
        const endTotalMinutes = currentTimeSlotEndTime.getHours() * 60 + currentTimeSlotEndTime.getMinutes();

        if (endTotalMinutes <= startTotalMinutes) {
            Alert.alert('Lỗi', 'Thời gian kết thúc phải sau thời gian bắt đầu.');
            return;
        }

        const newTimeSlot = {
            day_of_week: currentTimeSlotDayOfWeek,
            start_time: formatTime(currentTimeSlotStartTime),
            end_time: formatTime(currentTimeSlotEndTime),
            id: Math.random().toString(), // Tạm thời dùng id cho UI
        };
        setAvailableTimeSlots([...availableTimeSlots, newTimeSlot]);
        Alert.alert('Thành công', 'Đã thêm khung giờ khả dụng.');
    };

    const handleRemoveTimeSlot = (id) => {
        if (isLoading) return;
        setAvailableTimeSlots(prevSlots => prevSlots.filter(s => s.id !== id));
    };

    // --- Time Picker Handlers ---
    const onTimeSlotStartTimeChange = (event, selectedDate) => {
        setShowTimeSlotStartTimePicker(false);
        if (event.type === "set" && selectedDate) {
            const newStartTime = new Date(selectedDate);
            setCurrentTimeSlotStartTime(newStartTime);
            // Đảm bảo thời gian kết thúc không nhỏ hơn hoặc bằng thời gian bắt đầu
            if (newStartTime.getTime() >= currentTimeSlotEndTime.getTime()) {
                // Đặt thời gian kết thúc là 1 giờ sau thời gian bắt đầu mới
                setCurrentTimeSlotEndTime(new Date(newStartTime.getTime() + 60 * 60 * 1000)); 
            }
        }
    };

    const onTimeSlotEndTimeChange = (event, selectedDate) => {
        setShowTimeSlotEndTimePicker(false);
        if (event.type === "set" && selectedDate) {
            const newEndTime = new Date(selectedDate);
            setCurrentTimeSlotEndTime(newEndTime);
        }
    };

    // --- Create Plan API Call ---
    const handleCreatePlan = async () => {
        if (subjects.length === 0) {
            Alert.alert('Lỗi', 'Vui lòng thêm ít nhất một môn học.');
            return;
        }
        if (availableTimeSlots.length === 0) {
            Alert.alert('Lỗi', 'Vui lòng thêm ít nhất một khung giờ khả dụng.');
            return;
        }
        if (hasErrors(maxConsecutiveHours, 'number')) {
            Alert.alert('Lỗi', 'Số giờ học liên tục tối đa không hợp lệ.');
            return;
        }


        setIsLoading(true);
        setApiError(null);

        const planData = {
            // Loại bỏ 'id' tạm thời được dùng cho UI
            subjects: subjects.map(({ id, ...rest }) => rest), 
            available_time_slots: availableTimeSlots.map(({ id, ...rest }) => rest), 
            // Chuyển về số hoặc để undefined
            max_consecutive_hours: maxConsecutiveHours ? parseInt(maxConsecutiveHours) : undefined,
            balance_learning_across_days: balanceLearningAcrossDays,
        };

        // Loại bỏ các trường undefined ở cấp root nếu không có giá trị
        Object.keys(planData).forEach(key => {
            if (planData[key] === undefined) {
                delete planData[key];
            }
        });
        
        // --- LOG DỮ LIỆU ĐỂ DEBUG ---
        console.log("Dữ liệu gửi đến Spring Boot:", JSON.stringify(planData, null, 2));
        // --- END LOG DỮ LIỆU ---

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer YOUR_AUTH_TOKEN`, // Thêm nếu API yêu cầu
                },
                body: JSON.stringify(planData),
            });

            const responseData = await response.json();

            if (!response.ok) {
                // Cố gắng lấy thông báo lỗi chi tiết từ Spring Boot/AI Service
                let errorMessage = responseData.message || `Lỗi máy chủ: ${response.status}`;
                if (responseData.detail && Array.isArray(responseData.detail)) {
                    errorMessage = responseData.detail.map(d => d.msg).join('\n');
                } else if (typeof responseData === 'string') {
                    errorMessage = responseData; // Trường hợp phản hồi chỉ là một chuỗi lỗi
                }
                throw new Error(`Lỗi từ API: ${response.status} - ${errorMessage}`);
            }

            Alert.alert('Thành công', 'Kế hoạch học tập đã được tạo và lưu!');

            // Điều hướng hoặc xử lý dữ liệu trả về từ API
            navigation.navigate('Main', {
                screen: 'Tab',
                params: {
                    screen: 'StudyPlan', // Giả sử đây là màn hình hiển thị kế hoạch
                    params: { generatedPlan: responseData }, // Truyền dữ liệu kế hoạch đã tạo
                },
            });

        } catch (error) {
            console.error("Lỗi khi tạo kế hoạch:", error);
            setApiError(error.message || 'Đã có lỗi xảy ra khi kết nối tới máy chủ.');
            Alert.alert('Lỗi', error.message || 'Không thể tạo kế hoạch. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Tạo Kế Hoạch Học Tập</Text>

            {/* --- THÔNG TIN MÔN HỌC --- */}
            <Card style={styles.inputCard}>
                <Card.Content>
                    <Title style={styles.cardTitle}>Thêm Môn Học</Title>
                    <TextInput
                        label="Tên Môn Học"
                        value={currentSubjectName}
                        onChangeText={setCurrentSubjectName}
                        mode="outlined"
                        style={styles.input}
                        disabled={isLoading}
                    />
                    <TextInput
                        label="Ước tính số giờ cần (vd: 5)"
                        value={currentEstimatedHours}
                        onChangeText={setCurrentEstimatedHours}
                        keyboardType="numeric"
                        mode="outlined"
                        style={styles.input}
                        disabled={isLoading}
                    />
                    <HelperText type="error" visible={hasErrors(currentEstimatedHours, 'number')}>
                        Số giờ không hợp lệ (phải là số không âm).
                    </HelperText>

                    <TextInput
                        label="Độ ưu tiên (1-5, 5 là cao nhất)"
                        value={currentPriority}
                        onChangeText={setCurrentPriority}
                        keyboardType="numeric"
                        mode="outlined"
                        style={styles.input}
                        disabled={isLoading}
                    />
                    <HelperText type="error" visible={hasErrors(currentPriority, 'number') || (currentPriority !== '' && (parseInt(currentPriority) < 1 || parseInt(currentPriority) > 5))}>
                        Độ ưu tiên phải là số từ 1 đến 5.
                    </HelperText>

                    <Text style={styles.label}>Thời gian ưa thích trong ngày:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={currentPreferredTimeOfDay}
                            onValueChange={(itemValue) => setCurrentPreferredTimeOfDay(itemValue)}
                            style={styles.picker}
                            enabled={!isLoading}
                        >
                            <Picker.Item label="Bất kỳ" value="any" />
                            <Picker.Item label="Sáng (trước 12h)" value="morning" />
                            <Picker.Item label="Chiều (12h-18h)" value="afternoon" />
                            <Picker.Item label="Tối (sau 18h)" value="evening" />
                        </Picker>
                    </View>

                    <TextInput
                        label="Số buổi học tối thiểu"
                        value={currentMinSessions}
                        onChangeText={setCurrentMinSessions}
                        keyboardType="numeric"
                        mode="outlined"
                        style={styles.input}
                        disabled={isLoading}
                    />
                    <HelperText type="error" visible={hasErrors(currentMinSessions, 'number')}>
                        Số buổi không hợp lệ (phải là số không âm).
                    </HelperText>

                    <TextInput
                        label="Số buổi học tối đa"
                        value={currentMaxSessions}
                        onChangeText={setCurrentMaxSessions}
                        keyboardType="numeric"
                        mode="outlined"
                        style={styles.input}
                        disabled={isLoading}
                    />
                    <HelperText type="error" visible={hasErrors(currentMaxSessions, 'number')}>
                        Số buổi không hợp lệ (phải là số không âm).
                    </HelperText>
                    {currentMinSessions && currentMaxSessions && parseInt(currentMinSessions) > parseInt(currentMaxSessions) && (
                        <HelperText type="error" visible={true}>
                            Số buổi tối thiểu không thể lớn hơn số buổi tối đa.
                        </HelperText>
                    )}

                    {/* Lựa chọn ngày muốn tránh (ví dụ: Chủ Nhật) */}
                    <Text style={styles.label}>Không muốn học vào ngày:</Text>
                    <View style={styles.pickerContainer}>
                        {/* Lưu ý: Component Picker của React Native không hỗ trợ đa lựa chọn (multi-select) một cách tự nhiên.
                            Để chọn nhiều ngày, bạn sẽ cần triển khai một cách khác, ví dụ: sử dụng danh sách các Checkbox.
                            Hiện tại, Picker này chỉ cho phép chọn một giá trị duy nhất.
                            Nếu bạn muốn gửi nhiều ngày, `currentAvoidDays` phải được cập nhật như một mảng các số.
                            Để đơn giản, tôi sẽ giữ nó là single-select cho Picker này, nhưng sẽ đảm bảo nó luôn là một mảng.
                            Nếu bạn muốn đa lựa chọn, bạn sẽ cần thay thế Picker này bằng các checkbox.
                        */}
                        <Picker
                            selectedValue={currentAvoidDays.length > 0 ? currentAvoidDays[0] : -1} // Hiển thị ngày đầu tiên đã chọn hoặc -1 (Không)
                            onValueChange={(itemValue) => {
                                if (itemValue === -1) {
                                    setCurrentAvoidDays([]); // Nếu chọn "Không", set mảng rỗng
                                } else {
                                    // Để đơn giản với Picker (single-select), chúng ta chỉ thêm/bỏ ngày này
                                    // Nếu bạn muốn multi-select thực sự, logic sẽ phức tạp hơn (ví dụ: dùng checkbox)
                                    if (currentAvoidDays.includes(itemValue)) {
                                        // Nếu đã có trong danh sách, bỏ chọn
                                        setCurrentAvoidDays(currentAvoidDays.filter(day => day !== itemValue));
                                    } else {
                                        // Nếu chưa có, thêm vào danh sách
                                        setCurrentAvoidDays([...currentAvoidDays, itemValue]);
                                    }
                                }
                            }}
                            style={styles.picker}
                            enabled={!isLoading}
                        >
                            <Picker.Item label="Không" value={-1} />
                            {dayNames.map((name, index) => (
                                <Picker.Item key={index} label={name} value={index} />
                            ))}
                        </Picker>
                    </View>
                    {currentAvoidDays.length > 0 && (
                        <Text style={styles.selectedAvoidDays}>
                            Đang tránh: {currentAvoidDays.map(day => dayNames[day]).join(', ')}
                        </Text>
                    )}


                    <Button mode="contained" onPress={handleAddSubject} style={styles.addButton} icon="book-plus" disabled={isLoading}>
                        Thêm Môn Học
                    </Button>
                </Card.Content>
            </Card>

            <Title style={styles.listTitle}>Các Môn Học Đã Thêm:</Title>
            {subjects.length === 0 ? (
                <Text style={styles.noItemText}>Chưa có môn học nào được thêm.</Text>
            ) : (
                subjects.map((subject) => (
                    <List.Item
                        key={subject.id}
                        title={subject.name}
                        description={`Giờ ước tính: ${subject.estimated_hours ?? 'N/A'}, Ưu tiên: ${subject.priority ?? 'N/A'}${subject.preferred_time_of_day ? `, Ưu thích: ${subject.preferred_time_of_day}` : ''}${subject.min_sessions ? `, Min sessions: ${subject.min_sessions}` : ''}${subject.max_sessions ? `, Max sessions: ${subject.max_sessions}` : ''}${subject.avoid_days && subject.avoid_days.length > 0 ? `, Tránh: ${subject.avoid_days.map(d => dayNames[d]).join(', ')}` : ''}`}
                        left={props => <List.Icon {...props} icon="book-open" />}
                        right={() => (
                            <Button
                                icon="delete"
                                compact
                                onPress={() => handleRemoveSubject(subject.id)}
                                textColor="red"
                                disabled={isLoading}
                            >
                                Xóa
                            </Button>
                        )}
                        style={styles.listItem}
                    />
                ))
            )}
            {/* --- */}

            {/* --- KHUNG GIỜ HỌC KHẢ DỤNG --- */}
            <Card style={styles.inputCard}>
                <Card.Content>
                    <Title style={styles.cardTitle}>Thêm Khung Giờ Học Khả Dụng</Title>
                    <Text style={styles.label}>Chọn Ngày Trong Tuần:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={currentTimeSlotDayOfWeek}
                            onValueChange={(itemValue) => setCurrentTimeSlotDayOfWeek(itemValue)}
                            style={styles.picker}
                            enabled={!isLoading}
                        >
                            {dayNames.map((name, index) => (
                                <Picker.Item key={index} label={name} value={index} />
                            ))}
                        </Picker>
                    </View>

                    <View style={styles.timeRow}>
                        <View style={styles.timeInputContainer}>
                            <Text style={styles.label}>Bắt Đầu:</Text>
                            <Button onPress={() => setShowTimeSlotStartTimePicker(true)} mode="outlined" uppercase={false} labelStyle={styles.timeButtonLabel} disabled={isLoading}>
                                {formatTime(currentTimeSlotStartTime).substring(0, 5)}
                            </Button>
                            {showTimeSlotStartTimePicker && (
                                <DateTimePicker
                                    testID="timeSlotStartTimePicker"
                                    value={currentTimeSlotStartTime}
                                    mode="time"
                                    is24Hour={true}
                                    display="default"
                                    onChange={onTimeSlotStartTimeChange}
                                />
                            )}
                        </View>
                        <View style={styles.timeInputContainer}>
                            <Text style={styles.label}>Kết Thúc:</Text>
                            <Button onPress={() => setShowTimeSlotEndTimePicker(true)} mode="outlined" uppercase={false} labelStyle={styles.timeButtonLabel} disabled={isLoading}>
                                {formatTime(currentTimeSlotEndTime).substring(0, 5)}
                            </Button>
                            {showTimeSlotEndTimePicker && (
                                <DateTimePicker
                                    testID="timeSlotEndTimePicker"
                                    value={currentTimeSlotEndTime}
                                    mode="time"
                                    is24Hour={true}
                                    display="default"
                                    onChange={onTimeSlotEndTimeChange}
                                    minimumDate={currentTimeSlotStartTime} // Đảm bảo thời gian kết thúc sau thời gian bắt đầu
                                />
                            )}
                        </View>
                    </View>

                    <Button mode="contained" onPress={handleAddTimeSlot} style={styles.addButton} icon="clock-plus" disabled={isLoading}>
                        Thêm Khung Giờ
                    </Button>
                </Card.Content>
            </Card>

            <Title style={styles.listTitle}>Các Khung Giờ Khả Dụng Đã Thêm:</Title>
            {availableTimeSlots.length === 0 ? (
                <Text style={styles.noItemText}>Chưa có khung giờ nào được thêm.</Text>
            ) : (
                availableTimeSlots.map((slot) => (
                    <List.Item
                        key={slot.id}
                        title={`${dayNames[slot.day_of_week]}`}
                        description={`${slot.start_time.substring(0, 5)} - ${slot.end_time.substring(0, 5)}`}
                        left={props => <List.Icon {...props} icon="timer-outline" />}
                        right={() => (
                            <Button
                                icon="delete"
                                compact
                                onPress={() => handleRemoveTimeSlot(slot.id)}
                                textColor="red"
                                disabled={isLoading}
                            >
                                Xóa
                            </Button>
                        )}
                        style={styles.listItem}
                    />
                ))
            )}
            {/* --- */}

            {/* --- CÀI ĐẶT CHUNG CHO KẾ HOẠCH --- */}
            <Card style={styles.inputCard}>
                <Card.Content>
                    <Title style={styles.cardTitle}>Cài Đặt Kế Hoạch Chung</Title>
                    <TextInput
                        label="Số giờ học liên tục tối đa"
                        value={maxConsecutiveHours}
                        onChangeText={setMaxConsecutiveHours}
                        keyboardType="numeric"
                        mode="outlined"
                        style={styles.input}
                        disabled={isLoading}
                    />
                    <HelperText type="error" visible={hasErrors(maxConsecutiveHours, 'number')}>
                        Số giờ không hợp lệ (phải là số không âm).
                    </HelperText>

                    <View style={styles.switchContainer}>
                        <Text style={styles.label}>Cân bằng việc học giữa các ngày?</Text>
                        <Picker
                            selectedValue={balanceLearningAcrossDays}
                            onValueChange={(itemValue) => setBalanceLearningAcrossDays(itemValue)}
                            style={styles.picker}
                            enabled={!isLoading}
                        >
                            <Picker.Item label="Có" value={true} />
                            <Picker.Item label="Không" value={false} />
                        </Picker>
                    </View>
                </Card.Content>
            </Card>
            {/* --- */}

            {/* Hiển thị lỗi API nếu có */}
            {apiError && (
                <HelperText type="error" visible={!!apiError} style={styles.apiErrorText}>
                    {apiError}
                </HelperText>
            )}

            <Button
                mode="contained"
                onPress={handleCreatePlan}
                style={styles.createPlanButton}
                disabled={subjects.length === 0 || availableTimeSlots.length === 0 || isLoading}
                icon="calendar-check"
                loading={isLoading}
            >
                {isLoading ? 'Đang tạo kế hoạch...' : 'Tạo & Lưu Kế Hoạch'}
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
        color: '#2C3E50',
    },
    inputCard: {
        marginBottom: 20,
        elevation: 3,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#34495E',
        textAlign: 'center',
    },
    input: {
        marginBottom: 8,
        backgroundColor: 'white',
    },
    label: {
        fontSize: 15,
        color: '#555',
        marginBottom: 5,
        marginTop: 10,
        fontWeight: '500',
    },
    pickerContainer: {
        borderColor: '#CED4DA',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 12,
        backgroundColor: 'white',
        overflow: 'hidden', // Để đảm bảo Picker không tràn ra ngoài border-radius
    },
    picker: {
        height: 48,
        width: '100%',
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        alignItems: 'flex-end',
    },
    timeInputContainer: {
        flex: 1,
        marginHorizontal: 4,
    },
    timeButtonLabel: {
        fontSize: 16,
        color: '#333',
    },
    addButton: {
        marginTop: 20,
        paddingVertical: 5,
        backgroundColor: '#28A745', // Green for add actions
        borderRadius: 8,
    },
    listTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#333',
        textAlign: 'center',
    },
    noItemText: {
        textAlign: 'center',
        color: '#777',
        fontStyle: 'italic',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    listItem: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 8,
        elevation: 1.5,
        paddingVertical: 4,
    },
    apiErrorText: {
        textAlign: 'center',
        fontSize: 14,
        marginBottom: 15,
        color: '#D32F2F', // Red for errors
        fontWeight: 'bold',
    },
    createPlanButton: {
        marginTop: 30,
        paddingVertical: 10,
        backgroundColor: '#007BFF', // Blue for primary action
        marginBottom: 50,
        borderRadius: 8,
    },
    switchContainer: {
        flexDirection: 'column', // Changed to column for better stacking on small screens
        alignItems: 'flex-start', // Align text to start
        marginBottom: 15,
        paddingTop: 10,
    },
    selectedAvoidDays: {
        fontSize: 14,
        color: '#666',
        marginTop: -5,
        marginBottom: 10,
        paddingLeft: 10,
    }
});

export default CreateStudyPlanScreen;