import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Card, Title, Paragraph, useTheme, Divider } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

const StudyPlanDetailScreen = () => {
    const { colors } = useTheme();
    const route = useRoute();
    // generatedPlan ở đây là một GeneratedStudyPlanResult object
    const { generatedPlan } = route.params;

    if (!generatedPlan || !generatedPlan.schedule || generatedPlan.schedule.length === 0) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                <Text style={[styles.title, { color: colors.primary }]}>Chi Tiết Kế Hoạch Học Tập</Text>
                <Card style={styles.errorCard}>
                    <Card.Content>
                        <Title style={{ color: colors.error }}>Không có dữ liệu kế hoạch chi tiết.</Title>
                        <Paragraph>
                            Vui lòng kiểm tra lại kế hoạch đã chọn hoặc tạo kế hoạch mới.
                        </Paragraph>
                    </Card.Content>
                </Card>
            </SafeAreaView>
        );
    }

    const formatTimeDisplay = (timeString) => {
        if (!timeString) return 'N/A';
        const parts = timeString.split(':');
        return `${parts[0]}:${parts[1]}`;
    };

    // Nhóm các buổi học theo ngày trong tuần
    const dailyStudyPlan = generatedPlan.schedule.reduce((acc, session) => {
        const day = session.day_of_week;
        if (!acc[day]) {
            acc[day] = [];
        }
        acc[day].push(session);
        return acc;
    }, {});

    // Sắp xếp các buổi học trong mỗi ngày theo thời gian bắt đầu
    Object.keys(dailyStudyPlan).forEach(day => {
        dailyStudyPlan[day].sort((a, b) => a.start_time.localeCompare(b.start_time));
    });

    // Lấy các ngày có lịch học và sắp xếp
    const sortedDays = Object.keys(dailyStudyPlan).sort((a, b) => parseInt(a) - parseInt(b));

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={[styles.title, { color: colors.primary }]}>Chi Tiết Kế Hoạch</Text>

                <Card style={styles.summaryCard}>
                    <Card.Content>
                        <Title style={styles.cardTitle}>Tổng Quan</Title>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>ID Kế hoạch:</Text>
                            <Text style={styles.summaryValue}>{generatedPlan.id || 'N/A'}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Tổng điểm ưu tiên:</Text>
                            <Text style={styles.summaryValue}>{generatedPlan.totalPriorityScore?.toFixed(1) || 'N/A'}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Thời gian tạo:</Text>
                            <Text style={styles.summaryValue}>
                                {new Date(generatedPlan.generatedAt).toLocaleString('vi-VN')}
                            </Text>
                        </View>
                        {generatedPlan.dailyHoursBreakdown && (
                            <View style={styles.breakdownSection}>
                                <Divider style={styles.divider} />
                                <Text style={styles.breakdownTitle}>Chi tiết giờ học theo ngày:</Text>
                                {Object.entries(generatedPlan.dailyHoursBreakdown).map(([dayOfWeek, hours]) => (
                                    <View key={dayOfWeek} style={styles.summaryRow}>
                                        <Text style={styles.summaryLabel}>{dayNames[parseInt(dayOfWeek)]}:</Text>
                                        <Text style={styles.summaryValue}>{hours.toFixed(1)} giờ</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </Card.Content>
                </Card>

                {sortedDays.map(dayOfWeek => (
                    <Card key={dayOfWeek} style={styles.dayCard}>
                        <Card.Content>
                            <Title style={styles.dayTitle}>
                                {dayNames[parseInt(dayOfWeek)]}
                            </Title>
                            {dailyStudyPlan[dayOfWeek].length > 0 ? (
                                dailyStudyPlan[dayOfWeek].map((session, index) => (
                                    <View key={index} style={styles.sessionItem}>
                                        <Text style={styles.sessionSubject}>{session.subject_name}</Text>
                                        <Text style={styles.sessionTime}>
                                            {formatTimeDisplay(session.start_time)} - {formatTimeDisplay(session.end_time)}
                                        </Text>
                                    </View>
                                ))
                            ) : (
                                <Paragraph style={styles.noSessionText}>Không có buổi học nào trong ngày này.</Paragraph>
                            )}
                        </Card.Content>
                    </Card>
                ))}

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        padding: 16,
        paddingBottom: 50,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    summaryCard: {
        marginBottom: 20,
        elevation: 3,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#34495E',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        paddingHorizontal: 5,
    },
    summaryLabel: {
        fontSize: 16,
        color: '#555',
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    breakdownSection: {
        marginTop: 15,
        paddingTop: 10,
        borderTopWidth: 0,
        borderColor: '#eee',
    },
    breakdownTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
        textAlign: 'center',
    },
    divider: {
        marginVertical: 10,
    },
    dayCard: {
        marginBottom: 15,
        elevation: 2,
        borderRadius: 8,
        backgroundColor: 'white',
    },
    dayTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2C3E50',
        textAlign: 'center',
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ECEFF1',
    },
    sessionItem: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    sessionSubject: {
        fontSize: 16,
        fontWeight: '600',
        color: '#34495E',
    },
    sessionTime: {
        fontSize: 14,
        color: '#7F8C8D',
        marginTop: 2,
    },
    noSessionText: {
        fontStyle: 'italic',
        color: '#777',
        textAlign: 'center',
        paddingVertical: 10,
    },
    errorCard: {
        marginTop: 50,
        marginHorizontal: 20,
        backgroundColor: '#FFEBEE',
        borderColor: '#EF9A9A',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
    },
});

export default StudyPlanDetailScreen;