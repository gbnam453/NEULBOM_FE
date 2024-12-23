import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonIcon from '../assets/images/Buttons/Button_Notification.svg';
import colors from '../styles/colors';
import { useNavigation } from '@react-navigation/native'; // 네비게이션 훅 import
import OneByOneButton from '../components/Buttons/OneByOneButton'; // 1x1Button 컴포넌트 임포트

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

            {/* 1x1Button 추가 */}
            <View style={styles.buttonContainer}>
                <OneByOneButton title="수업자료" onPress={handleButtonPress} />
            </View>
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
        paddingLeft: 10,
        paddingRight: 20,
    },
    icon: {
        width: '15%',
        resizeMode: 'contain',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20, // 버튼이 화면에 잘 보이도록 간격 조정
    },
});
