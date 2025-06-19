import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 네비게이션 추가
import textStyles from '../../styles/textStyles'; // textStyles 가져오기
import colors from '../../styles/colors'; // colors 가져오기

export default function DownloadRegionButton({ region, category, color = 'white' }) {
    const navigation = useNavigation(); // 네비게이션 훅 사용

    const handlePress = () => {
        navigation.navigate('DownloadDetailScreen', { region }); // DownloadDetailScreen으로 이동하면서 region 값 전달
    };

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={handlePress}>
            <View style={styles.titleContainer}>
                <Text allowFontScaling={false} style={textStyles.subtitle18semiBold20}>{region}</Text>
                <Text allowFontScaling={false} style={[textStyles.caption14Medium16, { color: colors.gray700, marginTop: 6 }]}>
                    {category} {/* 카테고리 값 표시 */}
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
