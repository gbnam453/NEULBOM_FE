import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Dimensions, Image } from 'react-native';
import textStyles from '../../styles/textStyles'; // textStyles 가져오기
import colors from '../../styles/colors'; // colors 가져오기

export default function ThreeByOneButton_V2({title1, title2, title3, imageSource1, imageSource2, imageSource3, onPress1, onPress2, onPress3, color = 'white'}) {
    return (
        <View style={[styles.button, { backgroundColor: color }]}>
            <TouchableOpacity style={[styles.contentContainer, styles.innerContainer]} onPress={onPress1}>
                {imageSource1 && (
                    <Image
                        source={imageSource1}
                        style={styles.image}
                        resizeMode="contain"
                    />
                )}
                <View style={styles.titleContainer}>
                    <Text style={textStyles.title18Bold}>{title1}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.contentContainer, styles.innerContainer]} onPress={onPress2}>
                {imageSource2 && (
                    <Image
                        source={imageSource2}
                        style={styles.image}
                        resizeMode="contain"
                    />
                )}
                <View style={styles.titleContainer}>
                    <Text style={textStyles.title18Bold}>{title2}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.contentContainer, styles.innerContainer]} onPress={onPress3}>
                {imageSource3 && (
                    <Image
                        source={imageSource3}
                        style={styles.image}
                        resizeMode="contain"
                    />
                )}
                <View style={styles.titleContainer}>
                    <Text style={textStyles.title18Bold}>{title3}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const { width: screenWidth } = Dimensions.get('window');
const adjustedWidth = screenWidth - 20;

const styles = StyleSheet.create({
    button: {
        width: adjustedWidth,
        height: adjustedWidth * (1 / 3),
        borderRadius: 16, // 네 귀퉁이 둥근 값 16px
        flexDirection: 'row', // 내부를 가로로 배치하여 3등분
        elevation: 2, // 약간의 엘리베이션 효과
        shadowColor: '#000', // 그림자 색상
        shadowOffset: { width: 0, height: 2 }, // 그림자 위치
        shadowOpacity: 0.1, // 그림자 투명도
        shadowRadius: 3, // 그림자 반경
        paddingHorizontal: 12, // 좌우 여백
    },
    innerContainer: {
        flex: 1, // 3등분으로 균등하게 배분
        justifyContent: 'center',
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
        borderRadius: 12, // 이미지 모서리 둥글게
    },
});
