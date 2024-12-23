import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // SafeAreaView import
import ButtonIcon from '../assets/images/Buttons/Button_Notification.svg'; // SVG 파일 import
import colors from '../styles/colors'; // 색상 파일 import

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.shadowBox}>
                <Image
                    source={require('../assets/images/Icons/Icon_Neulbom.png')} // 아이콘 경로
                    style={styles.icon}
                />
                <ButtonIcon width={24} height={24}/> {/* SVG 파일을 컴포넌트로 사용 */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // 화면 꽉 채움
        backgroundColor: colors.gray050,
    },
    shadowBox: {
        flexDirection: 'row', // 아이콘과 버튼을 가로로 정렬
        alignItems: 'center', // 세로 중앙 정렬
        justifyContent: 'space-between', // 양쪽 끝으로 정렬
        width: '100%', // 화면 너비에 맞춤
        height: '8%', // 세로 길이 60px
        paddingLeft: 10, // 왼쪽 여백 10px
        paddingRight: 20, // 오른쪽 여백 추가 (아이폰 안전구역)
    },
    icon: {
        width: '15%', // 아이콘 너비
        resizeMode: 'contain', // 비율 유지
    },
});
