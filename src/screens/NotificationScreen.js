import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../styles/colors'; // 색상 파일 import

export default function NotificationScreen({ navigation }) {
    const handlePress = () => {
        // 버튼 클릭 시 이동할 화면 추가
        alert('알림 버튼이 클릭되었습니다.');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text allowFontScaling={false} style={styles.title}>알림 화면</Text>
                <Text allowFontScaling={false} style={styles.description}>
                    이곳은 알림 내용을 보여주는 화면입니다.
                </Text>
                <TouchableOpacity style={styles.button} onPress={handlePress}>
                    <Text allowFontScaling={false} style={styles.buttonText}>알림 버튼 클릭</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray050,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: colors.text,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
    },
});
