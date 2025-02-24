import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
                    <Text style={textStyles.title18Bold}>{title}</Text>
                    <Text style={[textStyles.title14Bold, styles.date]}>{date}</Text>
                </View>
                <View style={styles.detailContainer}>
                    <Text style={[textStyles.title16SemiBold, styles.detail]}>{detail}</Text>
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
    content: {
        padding: 20,
    },
    titleContainer: {
        marginBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray300,
        paddingBottom: 20,
    },
    date: {
        marginTop: 5,
        color: colors.gray700,
    },
    detailContainer: {
        marginTop: 20,
    },
    detail: {
        color: colors.gray900,
    },
});
