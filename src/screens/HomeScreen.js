import React, { useRef, useState, useEffect } from 'react';
import {View, Image, StyleSheet, TouchableOpacity, ScrollView, Linking, FlatList, Dimensions, Text, Alert, ToastAndroid, Platform} from 'react-native';

import NetInfo from '@react-native-community/netinfo';

import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonIcon from '../assets/images/Buttons/Button_Notification.svg';
import colors from '../styles/colors';
import textStyles from '../styles/textStyles';
import { useNavigation } from '@react-navigation/native';
import NoticeButton from '../components/HomeScreen/NoticeButton';
import Banner from '../components/HomeScreen/Banner';
import OneByOneButton from '../components/HomeScreen/OneByOneButton';
import TwoByOneButton from '../components/HomeScreen/TwoByOneButton';
import TwoByTwoButton from '../components/HomeScreen/TwoByTwoButton';
import OneByOneButton_V2 from '../components/HomeScreen/OneByOneButton_V2';
import pkg from '../../package.json'; // 버전 정보 가져오기

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen() {
    const navigation = useNavigation();
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(1);
    const [mainNotice, setMainNotice] = useState(null);
    const [isConnected, setIsConnected] = useState(true);

    //인터넷 연결 함수
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
            if (!state.isConnected) {
                showNoInternetAlert();
            }
        });

        return () => unsubscribe();
    }, []);

    const showNoInternetAlert = () => {
        if (Platform.OS === 'android') {
            ToastAndroid.show('인터넷이 연결되어 있지 않아요', ToastAndroid.SHORT);
        } else {
            Alert.alert(
                '네트워크 상태 확인',
                '인터넷이 연결되어 있지 않아요.',
                [{ text: '확인' }]
            );
        }
    };

    const handleNetworkCheck = (callback) => {
        if (isConnected) {
            callback();
        } else {
            if (Platform.OS === 'android') {
                ToastAndroid.show('인터넷이 연결되어 있지 않아요', ToastAndroid.SHORT);
            } else {
                Alert.alert('알림', '인터넷이 연결되어 있지 않아요');
            }
        }
    };

    // 공지사항 데이터를 가져오는 함수
    useEffect(() => {
        fetch('http://gbnam453.iptime.org:8080/neulbom/api/mainnotice')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setMainNotice(data[0])) // 첫 번째 데이터만 설정
            .catch((error) => console.error('Failed to fetch main notice:', error));
    }, []);

    // 상세 화면으로 이동
    const navigateToDetail = () => {
        if (mainNotice) {
            navigation.navigate('NoticeDetailScreen', {
                title: mainNotice.title,
                date: mainNotice.date,
                detail: mainNotice.detail,
            });
        }
    };

    const CloseFeature = () => {
        if (Platform.OS === 'android') {
            ToastAndroid.show('아직 공개되지 않은 기능이에요', ToastAndroid.SHORT);
        } else {
            Alert.alert('알림', '아직 공개되지 않은 기능이에요');
        }
    };

    const banners = [
        require('../assets/images/Banner/Banner_Education.webp'),
        require('../assets/images/Banner/Banner_KoreaScience.webp'),
        require('../assets/images/Banner/Banner_HoseoUniv.webp'),
        require('../assets/images/Banner/Banner_Neulbom.webp'),
    ];

    const infiniteBanners = [banners[banners.length - 1], ...banners, banners[0]];

    const navigateToScreen = (screenName) => {
        navigation.navigate(screenName);
    };

    const openURL = (url) => {
        Linking.openURL(url).catch((err) => console.error('Failed to open URL: ', err));
    };

    // 이미지 미리 로드
    useEffect(() => {
        const preloadImages = async () => {
            await Promise.all(
                banners.map((image) => Image.prefetch(Image.resolveAssetSource(image).uri))
            );
        };
        preloadImages();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const handleScrollEnd = (e) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const newIndex = Math.round(contentOffsetX / screenWidth);

        if (newIndex === 0) {
            flatListRef.current.scrollToIndex({ index: infiniteBanners.length - 2, animated: false });
            setCurrentIndex(infiniteBanners.length - 2);
        } else if (newIndex === infiniteBanners.length - 1) {
            flatListRef.current.scrollToIndex({ index: 1, animated: false });
            setCurrentIndex(1);
        } else {
            setCurrentIndex(newIndex);
        }
    };

    const getItemLayout = (_, index) => ({
        length: screenWidth,
        offset: screenWidth * index,
        index,
    });

    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <View style={styles.shadowBox}>
                <Image
                    source={require('../assets/images/Icons/Icon_Neulbom.webp')}
                    style={styles.icon}
                />
                <TouchableOpacity onPress={CloseFeature}>
                    <ButtonIcon width={24} height={24} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.buttonWrapper}>
                    {/* 중요 공지 */}
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            {mainNotice ? (
                                <NoticeButton
                                    title={mainNotice.title} // 공지사항 제목만 표시
                                    onPress={navigateToDetail} // 상세 화면으로 이동
                                />
                            ) : (
                                <NoticeButton title="인터넷이 연결되어 있지 않아요" />
                            )}
                        </View>
                    </View>

                    {/* 수업자료, 공지사항, 학사일정 */}
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <TwoByTwoButton
                                title="수업자료"
                                imageSource={require('../assets/images/Buttons/Button_Download.webp')}
                                onPress={() => handleNetworkCheck(() => navigateToScreen('DownloadScreen'))}
                            />
                        </View>
                        <View style={styles.column}>
                            <View style={styles.buttonContainer}>
                                <OneByOneButton
                                    title="공지사항"
                                    imageSource={require('../assets/images/Buttons/Button_Notice.webp')}
                                    onPress={() => handleNetworkCheck(() => navigateToScreen('NoticeScreen'))}
                                />
                            </View>
                            <View style={styles.buttonContainer}>
                                <OneByOneButton
                                    title="문의처"
                                    imageSource={require('../assets/images/Buttons/Button_Contact.webp')}
                                    onPress={() => handleNetworkCheck(() => navigateToScreen('ContactScreen'))}
                                />
                            </View>
                        </View>
                    </View>

                    {/* 서류제출, 오시는길 */}
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <TwoByOneButton
                                title="서류제출"
                                imageSource={require('../assets/images/Buttons/Button_Upload.webp')}
                                onPress={() => handleNetworkCheck(() => navigateToScreen('UploadScreen'))}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <OneByOneButton
                                title="오시는길"
                                imageSource={require('../assets/images/Buttons/Button_Direction.webp')}
                                onPress={() => handleNetworkCheck(() => navigateToScreen('DirectionScreen'))}
                            />
                        </View>
                    </View>

                    {/* SNS */}
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <OneByOneButton_V2
                                title="유튜브"
                                imageSource={require('../assets/images/Icons/Icon_YouTube.webp')}
                                onPress={() => handleNetworkCheck(() => openURL('https://www.youtube.com/@neul2bom2/featured'))}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <OneByOneButton_V2
                                title="인스타그램"
                                imageSource={require('../assets/images/Icons/Icon_Instagram.webp')}
                                onPress={() => handleNetworkCheck(() => openURL('https://www.instagram.com/neul2bom2'))}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <OneByOneButton_V2
                                title="페이스북"
                                imageSource={require('../assets/images/Icons/Icon_Facebook.webp')}
                                onPress={() => handleNetworkCheck(() => openURL('https://www.facebook.com/people/늘봄/61553601422680/'))}
                            />
                        </View>
                    </View>
                </View>

                {/* 배너 */}
                <View style={styles.bannerContainer}>
                    <FlatList
                        data={infiniteBanners}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.bannerWrapper}>
                                <Banner imageSource={item} />
                            </View>
                        )}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        ref={flatListRef}
                        onMomentumScrollEnd={handleScrollEnd}
                        snapToInterval={screenWidth}
                        decelerationRate="fast"
                        initialScrollIndex={1}
                        getItemLayout={getItemLayout}
                        onScrollToIndexFailed={(info) => {
                            flatListRef.current?.scrollToIndex({
                                index: info.index,
                                animated: false,
                            });
                        }}
                    />
                </View>

                {/* 버전 표시 */}
                <View style={styles.versionContainer}>
                    <Text style={[textStyles.subtitle12Bold14, styles.versionText, { color: colors.gray300 }]}>
                        {pkg.version}
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
    bannerContainer: {
        width: screenWidth,
        alignItems: 'center',
    },
    bannerWrapper: {
        width: screenWidth,
        height: screenWidth * (1 / 3) + 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    versionContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    versionText: {
        fontSize: 14,
        fontWeight: '600',
    },
});
