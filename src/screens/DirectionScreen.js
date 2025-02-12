import React from 'react';
import { StyleSheet, View, ScrollView, Text, Linking, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageModal from 'react-native-image-modal';
import colors from '../styles/colors';
import textStyles from '../styles/textStyles';
import NavigationBar from '../components/Common/NavigationBar';
import OneByOneButton_V2 from '../components/HomeScreen/OneByOneButton_V2';
import AppleMapsButton from '../components/HomeScreen/AppleMapsButton';
export default function DirectionScreen({ navigation }) {
    const navigateToScreen = (screenName) => {
        navigation.navigate(screenName);
    };

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
        const url = 'tmap://route?goalname=호서대학교 KTX캠퍼스&goalx=127.1075597136932&goaly=36.79069421400222';
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

    const openAppleMap = () => {
        const url = 'https://maps.apple.com/?address=%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD%20%EC%B6%A9%EC%B2%AD%EB%82%A8%EB%8F%84%20%EC%95%84%EC%82%B0%EC%8B%9C%20%EB%B0%B0%EB%B0%A9%EC%9D%8D%20%EA%B3%A0%EC%86%8D%EC%B2%A0%EB%8C%80%EB%A1%9C%2071,%2031470&ll=36.790709,127.107565&q=%ED%98%B8%EC%84%9C%EB%8C%80%ED%95%99%EA%B5%90%20KTX%EC%BA%A0%ED%8D%BC%EC%8A%A4&t=m';
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    };

    return (
        <SafeAreaView style={styles.container}>
            <NavigationBar title="오시는길" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* 스케치 맵 이미지 */}
                <View style={styles.imageWrapper}>
                    <ImageModal
                        resizeMode="contain"
                        style={styles.mapImage}
                        source={require('../assets/images/DirectionScreen/sketchmap.png')}
                        imageBackgroundColor={colors.gray050}
                        overlayBackgroundColor={'black'}
                    />
                </View>

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
                    <View style={styles.buttonContainer}>
                        <OneByOneButton_V2
                            title="네이버 지도"
                            imageSource={require('../assets/images/DirectionScreen/navermap.webp')}
                            onPress={openNaverMap}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <OneByOneButton_V2
                            title="카카오맵"
                            imageSource={require('../assets/images/DirectionScreen/kakaomap.webp')}
                            onPress={openKakaoMap}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <OneByOneButton_V2
                            title="티맵"
                            imageSource={require('../assets/images/DirectionScreen/tmap.webp')}
                            onPress={openTMap}
                        />
                    </View>
                </View>

                {/* Apple 지도 버튼 (iOS 전용) */}
                {Platform.OS === 'ios' && (
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <AppleMapsButton
                                title="Apple 지도로 열기"
                                imageSource={require('../assets/images/DirectionScreen/applemaps.webp')}
                                onPress={openAppleMap}
                            />
                        </View>
                    </View>
                )}
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
    imageWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: adjustedWidth,
    },
    mapImage: {
        width: adjustedWidth,
        height: adjustedWidth * (1400 / 1600), // 원본 비율 유지
        borderRadius: 16,
    },
    schoolName: {
        marginTop: 20,
        textAlign: 'center',
        color: colors.gray900,
    },
    addressText: {
        marginTop: 10,
        marginBottom: 14,
        fontSize: 14,
        fontWeight: '600',
        color: colors.gray700,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    buttonContainer: {
        margin: 5,
    },
});
