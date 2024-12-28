import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../styles/colors'; // 색상 파일 import
import NavigationBar from '../components/NavigationBar'; // NavigationBar import
import ThreeByOneButton from '../components/Buttons/ThreeByOneButton';

export default function NoticeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            {/* 네비게이션 바 */}
            <NavigationBar title="공지사항"/>
            {/* 화면 내용 */}
            <View style={styles.content}>
                {/* 세 번째 행 */}
                <View style={styles.row}>
                    <View style={styles.buttonContainer}>
                        <ThreeByOneButton title='SNS'/>
                    </View>
                </View>
                {/* 세 번째 행 */}
                <View style={styles.row}>
                    <View style={styles.buttonContainer}>
                        <ThreeByOneButton title='SNS'/>
                    </View>
                </View>
                {/* 세 번째 행 */}
                <View style={styles.row}>
                    <View style={styles.buttonContainer}>
                        <ThreeByOneButton title='SNS'/>
                    </View>
                </View>
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
        justifyContent: 'flex-start',
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
});
