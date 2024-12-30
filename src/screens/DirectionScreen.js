import React from 'react';
import {StyleSheet, View, ScrollView, Image, Linking, Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../styles/colors'; // 색상 파일 import
import NavigationBar from '../components/Common/NavigationBar';
import ThreeByOneButton from '../components/HomeScreen/ThreeByOneButton'; // ThreeByOneButton import

export default function DirectionScreen({ navigation }) {
    const openKakaoMap = () => {
        Linking.openURL('kakaomap://open');
    };

    const openNaverMap = () => {
        Linking.openURL('naversearchapp://addshortcut?url=http%3A%2F%2Fm.nstore.naver.com&icon=http%3A%2F%2Fstatic.naver.net%2Fwww%2Fu%2F2012%2F0604%2Fnmms_153256734.png&title=N%EC%8A%A4%ED%86%A0%EC%96%B4&serviceCode=nstore&version=7');
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* 네비게이션 바 */}
            <NavigationBar title="오시는길" />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* 스케치 맵 이미지 */}
                <Image
                    source={require('../assets/images/Direction/sketchmap.png')}
                    style={styles.mapImage}
                />

                {/* 카카오맵 버튼 */}
                <View style={styles.buttonContainer}>
                    <ThreeByOneButton
                        title="카카오맵"
                        detail="호서대학교 KTX캠퍼스"
                        imageSource={require('../assets/images/Direction/kakaomap.png')}
                        onPress={openKakaoMap}
                    />
                </View>

                {/* 네이버 지도 버튼 */}
                <View style={styles.buttonContainer}>
                    <ThreeByOneButton
                        title="네이버 지도"
                        detail="호서대학교 KTX캠퍼스"
                        imageSource={require('../assets/images/Direction/navermap.png')}
                        onPress={openNaverMap}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const { width: screenWidth } = Dimensions.get('window'); // 화면 가로 크기
const adjustedWidth = screenWidth - 20; // 화면 가로 크기에서 20px을 뺀 값

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray050,
    },
    scrollContent: {
        alignItems: 'center', // alignItems를 contentContainerStyle로 이동
        paddingHorizontal: 20,
        paddingVertical: 10, // 스크롤뷰 패딩
    },
    mapImage: {
        width: adjustedWidth, // 화면 너비에 맞게 이미지 크기 설정
        height: 300, // 높이는 원래 이미지 비율로 설정
        borderRadius: 16, // 이미지 끝을 둥글게
        shadowColor: '#000', // 그림자 색상
        shadowOffset: { width: 0, height: 5 }, // 그림자의 위치
        shadowOpacity: 0.2, // 그림자의 투명도
        shadowRadius: 10, // 그림자의 흐림 정도
        elevation: 1, // 안드로이드에서 그림자 효과를 추가하려면 elevation 필요
    },
    buttonContainer: {
        marginTop: 10, // 이미지와 버튼 사이에 여백 추가
    },
});
