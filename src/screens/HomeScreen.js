import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonIcon from '../assets/images/Buttons/Button_Notification.svg';
import colors from '../styles/colors';
import { useNavigation } from '@react-navigation/native'; // 네비게이션 훅 import
import OneByOneButton from '../components/Buttons/OneByOneButton'; // 1x1Button 컴포넌트 임포트
import TwoByOneButton from '../components/Buttons/TwoByOneButton';
import ThreeByOneButton from '../components/Buttons/ThreeByOneButton';
import TwoByTwoButton from '../components/Buttons/TwoByTwoButton';

// 기존 코드 유지

export default function HomeScreen() {
    const navigation = useNavigation();

    const handlePress = () => {
        // 알림 버튼 클릭 시 NotificationScreen으로 이동
        navigation.navigate('NotificationScreen');
    };

    const handleButtonPress = () => {
        console.log('Button Pressed');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.shadowBox}>
                <Image
                    source={require('../assets/images/Icons/Icon_Neulbom.png')}
                    style={styles.icon}
                />
                <TouchableOpacity onPress={handlePress}>
                    <ButtonIcon width={24} height={24} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.buttonWrapper}>
                    {/* 첫 번째 행 */}
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <TwoByTwoButton title="수업자료" onPress={handleButtonPress} />
                        </View>
                        <View style={styles.column}>
                            <View style={styles.buttonContainer}>
                                <OneByOneButton title="공지사항" onPress={handleButtonPress} />
                            </View>
                            <View style={styles.buttonContainer}>
                                <OneByOneButton title="학사일정" onPress={handleButtonPress} />
                            </View>
                        </View>
                    </View>

                    {/* 두 번째 행 */}
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <TwoByOneButton title="서류제출" onPress={handleButtonPress} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <OneByOneButton title="오시는길" onPress={handleButtonPress} />
                        </View>
                    </View>

                    {/* 세 번째 행 */}
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <ThreeByOneButton title="SNS" onPress={handleButtonPress} />
                        </View>
                    </View>

                    {/* 네 번째 행 */}
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <ThreeByOneButton title="추가자료" onPress={handleButtonPress} />
                        </View>
                    </View>

                    {/* 네 번째 행 */}
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <ThreeByOneButton title="추가자료" onPress={handleButtonPress} />
                        </View>
                    </View>

                    {/* 네 번째 행 */}
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <ThreeByOneButton title="추가자료" onPress={handleButtonPress} />
                        </View>
                    </View>

                    {/* 네 번째 행 */}
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <ThreeByOneButton title="추가자료" onPress={handleButtonPress} />
                        </View>
                    </View>

                    {/* 네 번째 행 */}
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <ThreeByOneButton title="추가자료" onPress={handleButtonPress} />
                        </View>
                    </View>

                    {/* 네 번째 행 */}
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <ThreeByOneButton title="추가자료" onPress={handleButtonPress} />
                        </View>
                    </View>

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
        backgroundColor: 'red',
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
        paddingTop: 5,
        alignItems: 'center',
    },
    buttonContainer: {
        //margin: 5,
        //padding: 5,
        //paddingLeft: 5,
        //paddingRight: 5,
        //paddingTop: 5,
        //paddingBottom: 5,
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});
