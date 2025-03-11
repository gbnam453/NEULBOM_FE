import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Dimensions, Linking } from 'react-native';
import textStyles from '../../styles/textStyles'; // textStyles 가져오기
import colors from '../../styles/colors'; // colors 가져오기

export default function UploadListButton({ title, detail, type, link, navigation, color = 'white' }) {
    const handlePress = () => {
        if (!link) return; // 링크가 없으면 아무 동작 안 함

        if (type === 'survey') {
            // 설문조사(survey)일 경우 WebView로 열기
            navigation.navigate('WebViewScreen', { url: link });
        } else if (type === 'file') {
            // 파일(file)일 경우 외부 브라우저에서 열기
            Linking.openURL(link).catch(err => console.error("링크를 열 수 없습니다:", err));
        }
    };

    return (
        <TouchableOpacity style={[styles.button]} onPress={handlePress}>
            <View style={styles.titleContainer}>
                <Text style={textStyles.subtitle18semiBold20}>{title}</Text>
                <Text style={[textStyles.caption14Medium16, { color: colors.gray700, marginTop: 6 }]}>
                    {detail} {/* 날짜 값 표시 */}
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
        paddingBottom: 26, // 아래쪽 여백 추가 (텍스트 아래의 여백을 감싸기 위해)
        borderBottomWidth: 1,
        borderBottomColor: colors.gray300,
    },
    titleContainer: {
        justifyContent: 'flex-start', // 텍스트 위쪽으로 정렬
        alignItems: 'flex-start', // 텍스트 왼쪽으로 정렬
    },
});
