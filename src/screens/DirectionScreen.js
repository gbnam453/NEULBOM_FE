import React from 'react';
import { StyleSheet, View, ScrollView, Text, Linking, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageModal from 'react-native-image-modal'; // ImageModal 사용
import colors from '../styles/colors';
import textStyles from '../styles/textStyles';
import NavigationBar from '../components/Common/NavigationBar';
import OneByOneButton_V2 from '../components/HomeScreen/OneByOneButton_V2';
import ThreeByOneButton from '../components/HomeScreen/ThreeByOneButton';

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
                <View style={styles.row}>
                    <View style={styles.buttonContainer}>
                        <ThreeByOneButton
                            title="문의처"
                            detail="이곳으로 연락해주세요!"
                            imageSource={require('../assets/images/Buttons/Button_Contact.webp')}
                            onPress={() => navigateToScreen('ContactScreen')}
                        />
                    </View>
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
