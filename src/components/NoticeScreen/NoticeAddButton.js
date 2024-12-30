import React from 'react';
import { TouchableOpacity, StyleSheet, View, Dimensions } from 'react-native';
import ButtonIcon from '../../assets/images/Buttons/Button_Plus.svg'; // SVG 파일 import
import colors from '../../styles/colors'; // colors 가져오기

export default function NoticeAddButton({ onPress, color = 'white' }) {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
            <View style={styles.titleContainer}>
                {/* 중앙에 SVG 이미지 추가 */}
                <ButtonIcon width={24} height={24} />
            </View>
        </TouchableOpacity>
    );
}

const { width: screenWidth } = Dimensions.get('window'); // 화면 가로 크기
const adjustedWidth = screenWidth - 20; // 화면 가로 크기에서 20px을 뺀 값

const styles = StyleSheet.create({
    button: {
        width: adjustedWidth,
        borderRadius: 16, // 네 귀퉁이 둥근 값 16px
        justifyContent: 'center', // 버튼 내용 중앙으로 정렬
        alignItems: 'center', // 텍스트를 중앙으로 정렬
        paddingVertical: 16, // 세로 방향 패딩
        elevation: 2, // 약간의 엘리베이션 효과
        shadowColor: '#000', // 그림자 색상
        shadowOffset: { width: 0, height: 2 }, // 그림자 위치
        shadowOpacity: 0.1, // 그림자 투명도
        shadowRadius: 3, // 그림자 반경
        borderWidth: 1, // 테두리 두께
        borderColor: colors.gray700, // 테두리 색상
    },
    titleContainer: {
        justifyContent: 'center', // 세로로 중앙 정렬
        alignItems: 'center', // 가로로 중앙 정렬
        flex: 1, // 부모 요소 안에서 차지하는 공간을 최대화
    }
});
