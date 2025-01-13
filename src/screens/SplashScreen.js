import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // useNavigation import

export default function SplashScreen() {
    const navigation = useNavigation(); // useNavigation 훅 사용

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('HomeScreen'); // 3초 후 'HomeScreen'으로 이동
        }, 2000); // 3초 대기

        return () => clearTimeout(timer); // 컴포넌트가 unmount될 때 타이머를 정리
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/Icons/Icon_Neulbom_Splash.webp')} // 이미지 경로
                style={styles.icon}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF9E6', // 배경 색상 설정
        justifyContent: 'center', // 세로 중앙 정렬
        alignItems: 'center', // 가로 중앙 정렬
    },
    icon: {
        width: 200, // 이미지 가로 크기
        height: 200, // 이미지 세로 크기
        resizeMode: 'contain', // 이미지 비율 유지
    },
});
