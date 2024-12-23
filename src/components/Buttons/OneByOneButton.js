import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import textStyles from '../../styles/textStyles'; // textStyles 가져오기

export default function OneByOneButton({ title, onPress }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <View style={styles.titleContainer}>
                <Text style={textStyles.title14Bold}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white', // 배경을 흰색으로 설정
        width: 100, // 정사각형 모양
        height: 100,
        borderRadius: 16, // 네 귀퉁이 둥근 값 16px
        justifyContent: 'flex-start', // 버튼 내용 왼쪽 상단으로 정렬
        alignItems: 'flex-start', // 텍스트를 왼쪽으로 정렬
        paddingLeft: 12, // 왼쪽 여백 20px
        paddingTop: 12, // 위쪽 여백 12px
        elevation: 2, // 약간의 엘리베이션 효과
        shadowColor: '#000', // 그림자 색상
        shadowOffset: { width: 0, height: 2 }, // 그림자 위치
        shadowOpacity: 0.1, // 그림자 투명도
        shadowRadius: 3, // 그림자 반경
    },
    titleContainer: {
        justifyContent: 'flex-start', // 텍스트 위쪽으로 정렬
        alignItems: 'flex-start', // 텍스트 왼쪽으로 정렬
    },
});
