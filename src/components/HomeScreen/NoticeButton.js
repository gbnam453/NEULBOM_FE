import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Dimensions } from 'react-native';
import textStyles from '../../styles/textStyles';

export default function NoticeButton({ title, onPress }) {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: '#1E2530' }]} onPress={onPress}>
            {/* 공지 상자 */}
            <View style={styles.noticeBox}>
                <Text allowFontScaling={false} style={[textStyles.title14Bold, styles.noticeText]}>공지</Text>
            </View>
            {/* 기존 텍스트 */}
            <View style={styles.titleContainer}>
                <Text allowFontScaling={false} style={[textStyles.subtitle14SemiBold21, styles.whiteText]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const { width: screenWidth } = Dimensions.get('window'); // 화면 가로 크기
const adjustedWidth = screenWidth - 20; // 화면 가로 크기에서 20px을 뺀 값

const styles = StyleSheet.create({
    button: {
        width: adjustedWidth,
        height: adjustedWidth * (1 / 9),
        borderRadius: 24, // 네 귀퉁이 둥근 값 16px
        flexDirection: 'row', // 가로로 정렬
        alignItems: 'center', // 수직 중앙 정렬
        paddingLeft: 10, // 왼쪽 여백
        paddingRight: 12, // 오른쪽 여백
        elevation: 2, // 약간의 엘리베이션 효과
        shadowColor: '#000', // 그림자 색상
        shadowOffset: { width: 0, height: 2 }, // 그림자 위치
        shadowOpacity: 0.1, // 그림자 투명도
        shadowRadius: 3, // 그림자 반경
    },
    noticeBox: {
        width: adjustedWidth * (1 / 8), // 너비
        height: adjustedWidth * (1 / 15), // 높이
        backgroundColor: '#FE6F61', // 색상
        borderRadius: 20, // 둥근 모서리
        justifyContent: 'center', // 내용 수직 중앙 정렬
        alignItems: 'center', // 내용 수평 중앙 정렬
    },
    noticeText: {
        color: 'white', // 텍스트 색상
    },
    titleContainer: {
        flex: 1, // 남은 공간 사용
        justifyContent: 'center', // 텍스트 수직 중앙 정렬
        alignItems: 'flex-start', // 텍스트 오른쪽 정렬
        paddingLeft: 6, // 오른쪽 여백
    },
    whiteText: {
        color: 'white', // 텍스트 색상 흰색
    },
});
