import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 네비게이션 훅 import
import ButtonBack from '../../assets/images/Buttons/Button_Back.svg';
import textStyles from '../../styles/textStyles'; // textStyles 임포트

const { width } = Dimensions.get('window');

const NavigationBar = ({ title }) => {
    const navigation = useNavigation(); // 네비게이션 객체 가져오기

    return (
        <View style={styles.container}>
            {/* 뒤로가기 버튼 */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <ButtonBack width={24} height={24} />
            </TouchableOpacity>
            {/* 타이틀 */}
            <Text style={[textStyles.title22Bold, styles.title]}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width,
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    backButton: {
        width: 30,
        height: 52,
        position: 'absolute',
        left: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginLeft: 30, // 아이콘 오른쪽 여백
        marginTop: 2, // 아이콘 오른쪽 여백
        fontSize: 22,
        textAlign: 'center',
        color: '#000', // 필요에 따라 수정
    },
});

export default NavigationBar;
