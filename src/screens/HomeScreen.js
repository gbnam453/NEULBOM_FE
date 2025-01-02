import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, Linking, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonIcon from '../assets/images/Buttons/Button_Notification.svg';
import colors from '../styles/colors';
import { useNavigation } from '@react-navigation/native';
import NoticeButton from '../components/HomeScreen/NoticeButton';
import Banner from '../components/HomeScreen/Banner';
import OneByOneButton from '../components/HomeScreen/OneByOneButton';
import TwoByOneButton from '../components/HomeScreen/TwoByOneButton';
import ThreeByOneButton from '../components/HomeScreen/ThreeByOneButton';
import TwoByTwoButton from '../components/HomeScreen/TwoByTwoButton';
import OneByOneButton_V2 from '../components/HomeScreen/OneByOneButton_V2';
import textStyles from '../styles/textStyles'; // 폰트 스타일 가져오기
import pkg from '../../package.json'; // package.json에서 버전 가져오기

export default function HomeScreen() {
    const navigation = useNavigation();

    const navigateToScreen = (screenName) => {
        navigation.navigate(screenName);
    };

    const openURL = (url) => {
        Linking.openURL(url).catch(err => console.error("Failed to open URL: ", err));
    };

    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <View style={styles.shadowBox}>
                <Image
                    source={require('../assets/images/Icons/Icon_Neulbom.png')}
                    style={styles.icon}
                />
                <TouchableOpacity onPress={() => navigateToScreen('NotificationScreen')}>
                    <ButtonIcon width={24} height={24} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.buttonWrapper}>
                    {/* 중요공지 */}
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <NoticeButton title="이곳에 중요 공지가 표시될 예정이예요." />
                        </View>
                    </View>

                    {/* 수업자료, 공지사항, 학사일정 */}
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <TwoByTwoButton title="수업자료" imageSource={require('../assets/images/Buttons/Button_Download.png')} onPress={() => navigateToScreen('DownloadScreen')} />
                        </View>
                        <View style={styles.column}>
                            <View style={styles.buttonContainer}>
                                <OneByOneButton title="공지사항" imageSource={require('../assets/images/Buttons/Button_Notice.png')} onPress={() => navigateToScreen('NoticeScreen')} />
                            </View>
                            <View style={styles.buttonContainer}>
                                <OneByOneButton title="학사일정" imageSource={require('../assets/images/Buttons/Button_Schedule.png')} onPress={() => navigateToScreen('ScheduleScreen')} />
                            </View>
                        </View>
                    </View>

                    {/* 서류제출, 오시는길 */}
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <TwoByOneButton title="서류제출" imageSource={require('../assets/images/Buttons/Button_Upload.png')} onPress={() => navigateToScreen('UploadScreen')} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <OneByOneButton title="오시는길" imageSource={require('../assets/images/Buttons/Button_Direction.png')} onPress={() => navigateToScreen('DirectionScreen')} />
                        </View>
                    </View>

                    {/* 배너 */}
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <Banner imageSource={require('../assets/images/Banner/Banner_HoseoUniv.png')} />
                        </View>
                    </View>

                    {/* SNS */}
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <OneByOneButton_V2 title="유튜브" imageSource={require('../assets/images/Icons/Icon_YouTube.png')} onPress={() => openURL('https://www.youtube.com/@neul2bom2/featured')} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <OneByOneButton_V2 title="인스타그램" imageSource={require('../assets/images/Icons/Icon_Instagram.png')} onPress={() => openURL('https://www.instagram.com/neul2bom2?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==')} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <OneByOneButton_V2 title="페이스북" imageSource={require('../assets/images/Icons/Icon_Facebook.png')} onPress={() => openURL('https://www.facebook.com/people/늘봄/61553601422680/')} />
                        </View>
                    </View>

                    {/* 문의처 */}
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <ThreeByOneButton title="문의처" detail="이곳으로 연락해주세요!" imageSource={require('../assets/images/Buttons/Button_Notice.png')} onPress={() => navigateToScreen('ContactScreen')} />
                        </View>
                    </View>

                    {/* 인사말 */}
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <ThreeByOneButton title="인사말" detail="환영합니다" imageSource={require('../assets/images/Buttons/Button_Notice.png')} onPress={() => navigateToScreen('WelcomeMessageScreen')} />
                        </View>
                    </View>
                </View>

                {/* 현재 버전 표시 */}
                <View style={styles.versionContainer}>
                    <Text style={[textStyles.subtitle14SemiBold16, { color: colors.gray300 }]}>
                        V{pkg.version}-beta
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray050,
        height: '90%',
    },
    shadowBox: {
        backgroundColor: colors.gray050,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '8%',
        paddingLeft: 20,
        paddingRight: 20,
    },
    icon: {
        width: '15%',
        resizeMode: 'contain',
    },
    buttonWrapper: {
        backgroundColor: colors.gray050,
        alignItems: 'center',
    },
    buttonContainer: {
        margin: 5,
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    versionContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
});
