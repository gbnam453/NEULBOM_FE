import React, {} from 'react';
import {StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../styles/colors'; // 색상 파일 import
import NavigationBar from '../components/Common/NavigationBar'; // NavigationBar import

export default function ScheduleScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            {/* 네비게이션 바 */}
            <NavigationBar title="학사일정" />
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
    row: {
        width: '100%',
        alignItems: 'center',
    },
    buttonContainer: {
        marginBottom: 10,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
