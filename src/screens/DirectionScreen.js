import React from 'react';
import { StyleSheet, View, ScrollView, Image, Text, Linking, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../styles/colors';
import textStyles from '../styles/textStyles'; // textStyles 가져오기
import NavigationBar from '../components/Common/NavigationBar';
import OneByOneButton_V2 from '../components/HomeScreen/OneByOneButton_V2';

export default function DirectionScreen({ navigation }) {
    const openKakaoMap = () => {
        const url = 'kakaomap://place?id=893613647';
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Linking.openURL(
                        Platform.OS === 'ios'
                            ? 'https://apps.apple.com/kr/app/kakao-map/id304608425'
                            : 'market://details?id=net.daum.android.map'
                    );
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };

    const openNaverMap = () => {
        const url = 'nmap://place?id=1070453055';
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Linking.openURL(
                        Platform.OS === 'ios'
                            ? 'https://apps.apple.com/kr/app/naver-map-navigate/id311867728'
                            : 'market://details?id=com.nhn.android.nmap'
                    );
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };

    const openTMap = () => {
        const url = 'tmap://route?goalname=호서대학교 KTX캠퍼스&goalx=127.123456&goaly=36.123456';
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Linking.openURL(
                        Platform.OS === 'ios'
                            ? 'https://apps.apple.com/kr/app/tmap/id431589174'
                            : 'market://details?id=com.skt.tmap.ku'
                    );
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };

    return (
        <SafeAreaView style={styles.container}>
            <NavigationBar title="오시는길" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* 스케치 맵 이미지 */}
                <Image
                    source={require('../assets/images/DirectionScreen/sketchmap.png')}
                    style={styles.mapImage}
                />

                {/* 학교 이름 */}
                <Text style={[textStyles.title22Bold, styles.schoolName]}>
                    호서대학교 KTX캠퍼스
                </Text>

                {/* 주소 텍스트 */}
                <Text style={[textStyles.subtitle14SemiBold16, styles.addressText]}>
                    충남 아산시 배방읍 고속철대로 71 (우)31470
                </Text>

                {/* 지도 버튼 */}
                <View style={styles.row}>
                    <OneByOneButton_V2
                        title="네이버 지도"
                        imageSource={require('../assets/images/DirectionScreen/navermap.png')}
                        onPress={openNaverMap}
                    />
                    <OneByOneButton_V2
                        title="카카오맵"
                        imageSource={require('../assets/images/DirectionScreen/kakaomap.png')}
                        onPress={openKakaoMap}
                    />
                    <OneByOneButton_V2
                        title="티맵"
                        imageSource={require('../assets/images/DirectionScreen/tmap.png')}
                        onPress={openTMap}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const { width: screenWidth } = Dimensions.get('window');
const adjustedWidth = screenWidth - 20;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray050,
    },
    scrollContent: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    schoolName: {
        marginTop: 10, // 학교 이름 아래 여백
        textAlign: 'center',
        color: colors.gray900,
    },
    mapImage: {
        width: adjustedWidth,
        height: adjustedWidth * 0.8,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 1,
    },
    addressText: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: '600',
        color: colors.gray700,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
    },
});
