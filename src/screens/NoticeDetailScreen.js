import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import NavigationBar from '../components/Common/NavigationBar'; // NavigationBar 컴포넌트 import
import textStyles from '../styles/textStyles'; // textStyles 가져오기
import colors from '../styles/colors'; // colors 가져오기

export default function NoticeDetailScreen({ route }) {
    const { title, date, detail } = route.params; // 전달받은 데이터

    return (
        <SafeAreaView style={styles.container}>
            {/* 상단 NavigationBar */}
            <NavigationBar title="공지사항" />

            {/* 공지사항 상세 내용 */}
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.titleContainer}>
                    <Text style={textStyles.title22Bold}>{title}</Text>
                    <Text style={styles.date}>{date}</Text>
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.detail}>{detail}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    content: {
        padding: 20,
    },
    titleContainer: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray300,
        paddingBottom: 10,
    },
    date: {
        marginTop: 10,
        fontSize: 14,
        color: colors.gray700,
    },
    detailContainer: {
        marginTop: 20,
    },
    detail: {
        fontSize: 16,
        lineHeight: 24,
        color: colors.gray900,
    },
});
