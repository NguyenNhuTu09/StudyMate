// src/screens/StudySessionScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getReviewSession } from '../api/apiService';
import FlashcardView from '../components/study/FlashcardView';
import QuizView from '../components/study/QuizView';

const StudySessionScreen = () => {
    const route = useRoute();
    const { subjectId } = route.params;

    const [reviewModules, setReviewModules] = useState([]);
    const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await getReviewSession(subjectId);
                setReviewModules(response.data); // Backend đã trả về ds theo chiến lược ôn tập
            } catch (error) {
                console.error("Failed to fetch review session:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSession();
    }, [subjectId]);

    const handleNext = () => {
        if (currentModuleIndex < reviewModules.length - 1) {
            setCurrentModuleIndex(currentModuleIndex + 1);
        } else {
            // Kết thúc phiên
            alert("Chúc mừng! Bạn đã hoàn thành phiên ôn tập.");
            // Có thể navigate về màn hình chi tiết môn học
        }
    };

    if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
    if (reviewModules.length === 0) return <Text style={styles.emptyText}>Không có học phần nào để ôn tập.</Text>;

    const currentModule = reviewModules[currentModuleIndex];
    
    return (
        <View style={styles.container}>
            <Text style={styles.progressText}>
                {`Học phần ${currentModuleIndex + 1} / ${reviewModules.length}`}
            </Text>
            {currentModule.type === 'FLASHCARD' ? (
                <FlashcardView module={currentModule} onNext={handleNext} />
            ) : (
                <QuizView module={currentModule} onNext={handleNext} />
            )}
        </View>
    );
};

// ... Thêm các component FlashcardView và QuizView vào thư mục components/study/
// Đây là ví dụ đơn giản
const FlashcardView = ({ module, onNext }) => {
    const [flipped, setFlipped] = useState(false);
    return (
        <Card style={styles.card} onPress={() => setFlipped(!flipped)}>
            <Card.Content style={styles.cardContent}>
                <Title>{flipped ? module.answer : module.question}</Title>
            </Card.Content>
            <Button onPress={onNext} mode="contained" style={{margin:10}}>Tiếp theo</Button>
        </Card>
    );
};
// Component QuizView sẽ phức tạp hơn, cần xử lý logic chọn đáp án.

const styles = StyleSheet.create({
    container: { flex: 1, padding: 15, backgroundColor: '#f0f4f7' },
    loader: { flex: 1, justifyContent: 'center' },
    emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16 },
    progressText: { textAlign: 'center', marginBottom: 15, fontSize: 16, fontWeight: 'bold' },
    card: { minHeight: 300, justifyContent: 'center' },
    cardContent: { alignItems: 'center', justifyContent: 'center', flex: 1 }
});

export default StudySessionScreen;