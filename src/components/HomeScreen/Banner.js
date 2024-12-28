import React from 'react';
import { TouchableOpacity, StyleSheet, View, Dimensions, Image } from 'react-native';

export default function Banner({ onPress, color = 'white', imageSource }) { // imageSource 추가
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
            <View style={styles.imageContainer}>
                {imageSource && (
                    <Image
                        source={imageSource}
                        style={styles.image}
                        resizeMode="contain" // 이미지 비율 유지
                    />
                )}
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
        borderRadius: 16, // 네 귀퉁이 둥근 값
        justifyContent: 'center', // 내용 중앙 정렬
        alignItems: 'center', // 내용 중앙 정렬
        elevation: 2, // 약간의 엘리베이션 효과
        shadowColor: '#000', // 그림자 색상
        shadowOffset: { width: 0, height: 2 }, // 그림자 위치
        shadowOpacity: 0.1, // 그림자 투명도
        shadowRadius: 3, // 그림자 반경
        position: 'relative',
    },
    imageContainer: {
        position: 'absolute', // 중앙 배치를 위해 절대 위치 지정
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center', // 이미지 세로 중앙 정렬
        alignItems: 'center', // 이미지 가로 중앙 정렬
    },
    image: {
        height: adjustedWidth, // 버튼 높이에 맞추기
        padding: 36,
        aspectRatio: 1, // 비율 유지 (기본 1:1, 필요시 조정 가능)
    },
});
