import React, { useRef, useState, useEffect } from 'react';
import {View, Image, StyleSheet, TouchableOpacity, ScrollView, Linking, FlatList, Dimensions, Text, Alert, ToastAndroid, Platform, TextInput, Modal} from 'react-native';

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
    const [clickCount, setClickCount] = useState(0);
    const [password, setPassword] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

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

    const handleIconPress = () => {
        if (clickCount + 1 >= 10) {
            setClickCount(0); // 카운트 초기화
            showPasswordPrompt();
        } else {
            setClickCount(clickCount + 1);
        }
    };

    const showPasswordPrompt = () => {
        if (Platform.OS === 'ios') {
            // iOS에서는 Alert.prompt() 사용 가능
            Alert.prompt(
                'Enter Password',
                '',
                [
                    {
                        text: '취소',
                        style: 'cancel'
                    },
                    {
                        text: '확인',
                        onPress: (input) => {
                            if (input === 'neulbom2415') {
                                handleNetworkCheck(() => navigateToScreen('AdminScreen'));
                            } else {
                                Alert.alert('Invalid Password', '');
                            }
                        }
                    }
                ],
                'secure-text'
            );
        } else {
            // Android에서는 커스텀 모달 사용
            setModalVisible(true);
        }
    };

    const handlePasswordSubmit = () => {
        if (password === 'neulbom2415') {
            setModalVisible(false);
            handleNetworkCheck(() => navigateToScreen('AdminScreen'));
        } else {
            Alert.alert('Invalid Password', '');
        }
    };


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

    useEffect(() => {
        fetch('http://gbnam453.iptime.org:2401/api/notices')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.length > 0) {
                    // ID 기준으로 내림차순 정렬하여 가장 최신 공지를 가져옴
                    const latestNotice = data.sort((a, b) => b.id - a.id)[0];
                    setMainNotice(latestNotice);
                }
            })
            .catch((error) => console.error('Failed to fetch notices:', error));
    }, []);

    // 상세 화면으로 이동
    const navigateToDetail = () => {
        if (mainNotice) {
            navigation.navigate('NoticeDetailScreen', {
                title: mainNotice.title,
                content: mainNotice.content,
                date: `${mainNotice.date} | ${mainNotice.region}`,
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
                <TouchableOpacity onPress={handleIconPress} activeOpacity={1}>
                    <Image
                        source={require('../assets/images/Icons/Icon_Neulbom.webp')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                {/*
                <TouchableOpacity onPress={CloseFeature}>
                    <ButtonIcon width={24} height={24} />
                </TouchableOpacity>
                */}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.buttonWrapper}>
                    {/* 중요 공지 */}
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            {mainNotice ? (
                                <NoticeButton
                                    title={mainNotice.title}
                                    onPress={navigateToDetail}
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

            <Modal visible={isModalVisible} transparent animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
                        <Text style={{ marginBottom: 10 }}>Enter Password</Text>
                        <TextInput
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            style={{ borderWidth: 1, borderColor: 'gray', padding: 8, marginBottom: 10 }}
                        />
                        <TouchableOpacity onPress={handlePasswordSubmit} style={{ backgroundColor: 'blue', padding: 10, alignItems: 'center', borderRadius: 5 }}>
                            <Text style={{ color: 'white' }}>확인</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 10, alignItems: 'center' }}>
                            <Text style={{ color: 'red' }}>취소</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        width: 60,
        height: 40,
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
