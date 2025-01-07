import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Dimensions, Image } from 'react-native';
import textStyles from '../../styles/textStyles'; // textStyles 가져오기
import colors from '../../styles/colors'; // colors 가져오기

export default function ThreeByOneButton({ title, detail, onPress, color = 'white', imageSource }) {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
            <View style={styles.contentContainer}>
                {/* 텍스트 컨테이너 */}
                <View style={styles.textContainer}>
                    <Text style={textStyles.title22Bold}>{title}</Text>
                    <Text style={[textStyles.subtitle14SemiBold16, { color: colors.gray700 }]}>{detail}</Text>
                </View>
                {/* 이미지 */}
                <Image source={imageSource} style={styles.image} />
            </View>
        </TouchableOpacity>
    );
}

const { width: screenWidth } = Dimensions.get('window'); // 화면 가로 크기
const adjustedWidth = screenWidth - 20; // 화면 가로 크기에서 20px을 뺀 값

const styles = StyleSheet.create({
    button: {
        width: adjustedWidth,
        height: adjustedWidth * (1 / 3),
        borderRadius: 16, // 네 귀퉁이 둥근 값 16px
        justifyContent: 'center', // 가로 중앙 정렬
        alignItems: 'center', // 세로 중앙 정렬
        elevation: 2, // 약간의 엘리베이션 효과
        shadowColor: '#000', // 그림자 색상
        shadowOffset: { width: 0, height: 2 }, // 그림자 위치
        shadowOpacity: 0.1, // 그림자 투명도
        shadowRadius: 3, // 그림자 반경
        paddingHorizontal: 12, // 좌우 여백
        flexDirection: 'row', // 내부를 가로 방향 정렬
    },
    contentContainer: {
        flexDirection: 'row', // 텍스트와 이미지를 가로로 배치
        alignItems: 'center', // 세로 중앙 정렬
        justifyContent: 'space-between', // 텍스트와 이미지 간격 유지
        width: '100%', // 버튼 전체 너비 사용
    },
    textContainer: {
        justifyContent: 'center', // 세로 중앙 정렬
        alignItems: 'flex-start', // 텍스트를 왼쪽 정렬
        flex: 1, // 텍스트 영역 확장
        paddingLeft: 12, // 왼쪽 여백
    },
    image: {
        width: adjustedWidth * (1 / 4), // 버튼 가로 크기의 10%
        height: adjustedWidth * (1 / 4), // 버튼 높이에 맞춤
        MarginRight: 12, // 왼쪽 여백
        resizeMode: 'contain', // 이미지 비율 유지하며 맞춤
    },
});
