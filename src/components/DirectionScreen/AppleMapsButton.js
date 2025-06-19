import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Dimensions, Image } from 'react-native';
import textStyles from '../../styles/textStyles'; // textStyles 가져오기
import colors from '../../styles/colors'; // colors 가져오기

export default function AppleMapsButton({ title, onPress, color = 'white', imageSource }) {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
            <View style={styles.contentContainer}>
                {/* 이미지 */}
                {imageSource && <Image source={imageSource} style={styles.image} />}
                {/* 텍스트 */}
                <Text allowFontScaling={false} style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const { width: screenWidth } = Dimensions.get('window'); // 화면 가로 크기
const adjustedWidth = screenWidth - 20; // 화면 가로 크기에서 20px을 뺀 값

const styles = StyleSheet.create({
    button: {
        width: adjustedWidth,
        height: adjustedWidth * (1 / 7), // 높이를 1/7로 설정
        borderRadius: 16, // 네 귀퉁이 둥근 값 16px
        justifyContent: 'center', // 세로 중앙 정렬
        alignItems: 'center', // 가로 중앙 정렬
        elevation: 2, // 약간의 엘리베이션 효과
        shadowColor: '#000', // 그림자 색상
        shadowOffset: { width: 0, height: 2 }, // 그림자 위치
        shadowOpacity: 0.1, // 그림자 투명도
        shadowRadius: 3, // 그림자 반경
        paddingHorizontal: 12, // 좌우 여백
    },
    contentContainer: {
        flexDirection: 'row', // 텍스트와 이미지를 가로로 배치
        alignItems: 'center', // 세로 중앙 정렬
        justifyContent: 'center', // 가로 중앙 정렬
        width: '100%', // 버튼 전체 너비 사용
    },
    title: {
        textAlign: 'center', // 텍스트 중앙 정렬
        marginLeft: 12, // 이미지와의 간격 추가
        ...textStyles.title18Bold,
    },
    image: {
        width: adjustedWidth * 0.1, // 정사각형 이미지 크기
        height: adjustedWidth * 0.1,
        borderRadius: 6, // 이미지 모서리 둥글게
        resizeMode: 'contain', // 이미지 비율 유지하며 맞춤
    },
});
