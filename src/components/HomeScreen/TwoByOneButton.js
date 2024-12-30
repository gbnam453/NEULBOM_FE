import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Dimensions, Image } from 'react-native';
import textStyles from '../../styles/textStyles'; // textStyles 가져오기

export default function TwoByOneButton({ title, onPress, color = 'white', imageSource }) { // 기본값 설정
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
            <View style={styles.titleContainer}>
                <Text style={textStyles.title22Bold}>{title}</Text>
            </View>
            {imageSource && ( // 이미지 경로가 전달되었을 경우에만 렌더링
                <Image
                    source={imageSource}
                    style={styles.image}
                    resizeMode="contain"
                />
            )}
        </TouchableOpacity>
    );
}

const { width: screenWidth } = Dimensions.get('window'); // 화면 가로 크기
const adjustedWidth = screenWidth - 25; // 화면 가로 크기에서 25px을 뺀 값

const styles = StyleSheet.create({
    button: {
        width: adjustedWidth * (2 / 3),
        height: adjustedWidth * (1 / 3) - 5,
        borderRadius: 16, // 네 귀퉁이 둥근 값 16px
        justifyContent: 'flex-start', // 버튼 내용 왼쪽 상단으로 정렬
        alignItems: 'flex-start', // 텍스트를 왼쪽으로 정렬
        paddingLeft: 12, // 왼쪽 여백 12px
        paddingTop: 16, // 위쪽 여백 16px
        elevation: 2, // 약간의 엘리베이션 효과
        shadowColor: '#000', // 그림자 색상
        shadowOffset: { width: 0, height: 2 }, // 그림자 위치
        shadowOpacity: 0.1, // 그림자 투명도
        shadowRadius: 3, // 그림자 반경
        position: 'relative', // 하위 요소 위치 설정
    },
    titleContainer: {
        justifyContent: 'flex-start', // 텍스트 위쪽으로 정렬
        alignItems: 'flex-start', // 텍스트 왼쪽으로 정렬
    },
    image: {
        position: 'absolute', // 버튼의 오른쪽 아래 고정
        right: 8,
        bottom: 8,
        width: adjustedWidth * (1 / 4), // 이미지 너비
        height: adjustedWidth * (1 / 4), // 이미지 높이
        borderRadius: 8, // 이미지 모서리 둥글게
    },
});
