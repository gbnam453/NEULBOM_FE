import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Dimensions } from 'react-native';
import textStyles from '../../styles/textStyles'; // textStyles 가져오기
import colors from '../../styles/colors'; // colors 가져오기

export default function UploadListButton({ title, date, link, navigation, color = 'white' }) {
    const handlePress = () => {
        if (link) {
            navigation.navigate('WebViewScreen', { url: link }); // WebViewScreen으로 이동
        }
    };

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={handlePress}>
            <View style={styles.titleContainer}>
                <Text style={textStyles.title22Bold}>{title}</Text>
                <Text style={[textStyles.subtitle14SemiBold16, { color: colors.gray700, marginTop: 6 }]}>
                    {date} {/* 날짜 값 표시 */}
                </Text>
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
        justifyContent: 'flex-start', // 버튼 내용 왼쪽 상단으로 정렬
        alignItems: 'flex-start', // 텍스트를 왼쪽으로 정렬
        paddingLeft: 12, // 왼쪽 여백 12px
        paddingTop: 16, // 위쪽 여백 16px
        paddingBottom: 16, // 아래쪽 여백 추가 (텍스트 아래의 여백을 감싸기 위해)
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
