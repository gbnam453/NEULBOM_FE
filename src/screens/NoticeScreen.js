import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../styles/colors'; // 색상 파일 import
import NavigationBar from '../components/Common/NavigationBar'; // NavigationBar import
import NoticeListButton from '../components/NoticeScreen/NoticeListButton';

export default function NoticeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            {/* 네비게이션 바 */}
            <NavigationBar title="공지사항" />
            {/* 스크롤 가능한 화면 내용 */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.row}>
                    <View style={styles.buttonContainer}>
                        <NoticeListButton title="첫번째 공지사항" date="2024-12-12"/>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray050,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 10, // 스크롤뷰 패딩
        alignItems: 'center',
    },
    buttonContainer: {
        marginBottom: 10,
    },
});
