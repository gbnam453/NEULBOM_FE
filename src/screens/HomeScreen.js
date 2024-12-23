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

export default function HomeScreen() {
    const navigation = useNavigation();

    const handlePress = () => {
        // 알림 버튼 클릭 시 NotificationScreen으로 이동
        navigation.navigate('NotificationScreen');
    };

    const handleButtonPress = () => {
        console.log('OneByOneButton Pressed');
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

            {/* ScrollView로 버튼들을 감싸서 스크롤 가능하게 하고 좌우 여백 추가 */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.buttonWrapper}>
                    {/* 1x1 버튼들 */}
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <OneByOneButton title="수업자료" onPress={handleButtonPress} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <OneByOneButton title="수업자료" onPress={handleButtonPress} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <OneByOneButton title="수업자료" onPress={handleButtonPress} />
                        </View>
                    </View>

                    {/* 2x1과 1x1 버튼 */}
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <TwoByOneButton title="수업자료" onPress={handleButtonPress} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <OneByOneButton title="수업자료" onPress={handleButtonPress} />
                        </View>
                    </View>

                    {/* 3x1 버튼 */}
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <ThreeByOneButton title="수업자료" onPress={handleButtonPress} />
                        </View>
                    </View>

                    {/* 2x2 버튼 */}
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <TwoByTwoButton title="수업자료" onPress={handleButtonPress} />
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '8%',
        paddingLeft: 10,
        paddingRight: 20,
    },
    icon: {
        width: '15%',
        resizeMode: 'contain',
    },
    buttonWrapper: {
        paddingHorizontal: 10, // 좌우 여백 10px 추가
        backgroundColor: 'red',
    },
    buttonContainer: {
        marginTop: 20, // 버튼이 화면에 잘 보이도록 간격 조정
    },
    scrollContainer: {
        paddingBottom: 20, // 스크롤 끝에 여백을 추가하여 버튼들이 잘 보이도록 조정
    },
});
