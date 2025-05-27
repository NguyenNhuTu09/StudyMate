import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import { Card, Title, Paragraph, useTheme, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native'; // Dùng để refresh khi focus lại màn hình

const API_URL = 'http://10.0.2.2:8080/api/study-plans/all'; // Thay đổi IP nếu cần

const AllStudyPlansScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStudyPlans = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Fetched study plans:", data); // Log dữ liệu nhận được
            setPlans(data);
        } catch (e) {
            console.error("Error fetching study plans:", e);
            setError("Không thể tải danh sách kế hoạch. Vui lòng thử lại.");
            Alert.alert("Lỗi", "Không thể tải danh sách kế hoạch: " + e.message);
        } finally {
            setLoading(false);
        }
    };

    // Sử dụng useFocusEffect để tải lại dữ liệu mỗi khi màn hình được focus
    useFocusEffect(
        useCallback(() => {
            fetchStudyPlans();
        }, [])
    );

    const renderPlanItem = ({ item }) => {
        const createdAt = new Date(item.generatedAt).toLocaleString('vi-VN', {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });

        // Tính tổng số giờ học từ dailyHoursBreakdown
        const totalHours = Object.values(item.dailyHoursBreakdown || {}).reduce((sum, hours) => sum + hours, 0);

        return (
            <Card
                style={styles.planCard}
                onPress={() => navigation.navigate('StudyPlanDetail', { generatedPlan: item })} // Truyền toàn bộ đối tượng kế hoạch
            >
                <Card.Content>
                    <Title style={styles.cardTitle}>Kế hoạch ngày {createdAt.split(',')[0]}</Title>
                    <Paragraph>
                        <Text style={styles.label}>Tạo lúc:</Text> {createdAt.split(',')[1]}
                    </Paragraph>
                    <Paragraph>
                        <Text style={styles.label}>Tổng số môn học:</Text> {new Set(item.schedule.map(s => s.subject_name)).size}
                    </Paragraph>
                    <Paragraph>
                        <Text style={styles.label}>Tổng giờ học:</Text> {totalHours.toFixed(1)} giờ
                    </Paragraph>
                    <Button
                        mode="outlined"
                        onPress={() => navigation.navigate('StudyPlanDetail', { generatedPlan: item })}
                        style={styles.viewDetailButton}
                        labelStyle={styles.viewDetailButtonText}
                    >
                        Xem chi tiết
                    </Button>
                </Card.Content>
            </Card>
        );
    };

    if (loading) {
        return (
            <SafeAreaView style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={{ color: colors.text, marginTop: 10 }}>Đang tải kế hoạch...</Text>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
                <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
                <Button mode="contained" onPress={fetchStudyPlans} style={{ marginTop: 20 }}>
                    Thử lại
                </Button>
            </SafeAreaView>
        );
    }

    if (plans.length === 0) {
        return (
            <SafeAreaView style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
                <Text style={styles.noPlansText}>Chưa có kế hoạch nào được tạo.</Text>
                <Button mode="contained" onPress={() => navigation.navigate('Create')} style={{ marginTop: 20 }}>
                    Tạo kế hoạch mới
                </Button>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <Title style={[styles.screenTitle, { color: colors.primary }]}>Các Kế Hoạch Đã Tạo</Title>
            <FlatList
                data={plans}
                keyExtractor={(item) => item.id}
                renderItem={renderPlanItem}
                contentContainerStyle={styles.listContentContainer}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    screenTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        paddingTop: 10,
    },
    listContentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    planCard: {
        marginBottom: 15,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: 'white',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#34495E',
    },
    label: {
        fontWeight: 'bold',
        color: '#555',
    },
    viewDetailButton: {
        marginTop: 15,
        borderColor: '#1e88e5',
    },
    viewDetailButtonText: {
        color: '#1e88e5',
    },
    errorText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    noPlansText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#777',
        marginBottom: 20,
    },
});

export default AllStudyPlansScreen;