// src/components/study/AddModuleModal.js
import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Modal, Portal, Title, TextInput, Button, SegmentedButtons } from 'react-native-paper';
import { createModule } from '../../api/apiService';

const AddModuleModal = ({ visible, onDismiss, subjectId, onModuleAdded }) => {
    const [type, setType] = useState('FLASHCARD'); // 'FLASHCARD' hoặc 'QUIZ'
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState(''); // Cho Flashcard
    const [options, setOptions] = useState(['', '', '', '']); // Cho Quiz
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0); // Cho Quiz
    const [loading, setLoading] = useState(false);

    const resetState = () => {
        setQuestion('');
        setAnswer('');
        setOptions(['', '', '', '']);
        setCorrectAnswerIndex(0);
        setLoading(false);
    };

    const handleAddModule = async () => {
        if (!question.trim()) {
            Alert.alert('Lỗi', 'Câu hỏi không được để trống.');
            return;
        }

        let moduleData = { type, question };
        if (type === 'FLASHCARD') {
            if (!answer.trim()) {
                Alert.alert('Lỗi', 'Câu trả lời không được để trống.');
                return;
            }
            moduleData.answer = answer;
        } else { // QUIZ
            if (options.some(opt => !opt.trim())) {
                Alert.alert('Lỗi', 'Tất cả các lựa chọn phải được điền.');
                return;
            }
            moduleData.options = options;
            moduleData.correctAnswerIndex = correctAnswerIndex;
        }
        
        setLoading(true);
        try {
            await createModule(subjectId, moduleData);
            Alert.alert('Thành công', 'Đã thêm học phần mới!');
            resetState();
            onModuleAdded(); // Callback để refresh list
            onDismiss();
        } catch (error) {
            console.error('Failed to create module:', error);
            Alert.alert('Lỗi', 'Không thể tạo học phần.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <Portal>
            <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modalContainer}>
                <ScrollView>
                    <Title>Thêm học phần mới</Title>
                    <SegmentedButtons
                        value={type}
                        onValueChange={setType}
                        buttons={[
                            { value: 'FLASHCARD', label: 'Flashcard' },
                            { value: 'QUIZ', label: 'Trắc nghiệm' },
                        ]}
                        style={styles.segment}
                    />
                    <TextInput label="Câu hỏi (*)" value={question} onChangeText={setQuestion} mode="outlined" style={styles.input}/>

                    {type === 'FLASHCARD' ? (
                        <TextInput label="Câu trả lời (*)" value={answer} onChangeText={setAnswer} mode="outlined" style={styles.input}/>
                    ) : (
                        <>
                            {options.map((opt, index) => (
                                <TextInput
                                    key={index}
                                    label={`Lựa chọn ${index + 1} ${index === correctAnswerIndex ? '(Đáp án đúng)' : ''}`}
                                    value={opt}
                                    onChangeText={text => {
                                        const newOptions = [...options];
                                        newOptions[index] = text;
                                        setOptions(newOptions);
                                    }}
                                    mode="outlined"
                                    style={styles.input}
                                    right={<TextInput.Icon icon="check-circle" color={index === correctAnswerIndex ? 'green' : 'gray'} onPress={() => setCorrectAnswerIndex(index)} />}
                                />
                            ))}
                        </>
                    )}
                    <Button mode="contained" onPress={handleAddModule} loading={loading} disabled={loading} style={styles.button}>Thêm</Button>
                    <Button mode="text" onPress={onDismiss}>Hủy</Button>
                </ScrollView>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modalContainer: { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10, maxHeight: '80%' },
    segment: { marginVertical: 10 },
    input: { marginVertical: 5 },
    button: { marginTop: 10, backgroundColor: '#36d5bf' }
});

export default AddModuleModal;