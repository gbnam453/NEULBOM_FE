import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Dimensions, Image } from 'react-native';
import textStyles from '../../styles/textStyles'; // textStyles 가져오기

export default function OneByOneButton_V2({ title, onPress, color = 'white', imageSource }) {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
            <View style={styles.contentContainer}>
                {imageSource && ( // 이미지 경로가 전달되었을 경우에만 렌더링
                    <Image
                        source={imageSource}
                        style={styles.image}
                        resizeMode="contain"
                    />
                )}
                <View style={styles.titleContainer}>
                    <Text style={textStyles.title16Bold}>{title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const { width: screenWidth } = Dimensions.get('window'); // 화면 가로 크기
const adjustedWidth = screenWidth - 40; // 화면 가로 크기에서 40px을 뺀 값

const styles = StyleSheet.create({
    button: {
        width: adjustedWidth * (1 / 3),
        height: adjustedWidth * (1 / 3),
        borderRadius: 16, // 네 귀퉁이 둥근 값 16px
        elevation: 2, // 약간의 엘리베이션 효과
        shadowColor: '#000', // 그림자 색상
        shadowOffset: { width: 0, height: 2 }, // 그림자 위치
        shadowOpacity: 0.1, // 그림자 투명도
        shadowRadius: 3, // 그림자 반경
        paddingVertical: 12, // 상하 여백
        justifyContent: 'center', // 터치영역 내부 중앙 정렬
        alignItems: 'center',
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        marginTop: 8, // 이미지와 텍스트 사이 여백
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: adjustedWidth * 0.15, // 이미지 크기
        height: adjustedWidth * 0.15, // 이미지 크기
        borderRadius: 6, // 이미지 모서리 둥글게
    },
});
