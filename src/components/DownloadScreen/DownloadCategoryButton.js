import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import colors from '../../styles/colors'; // 색상 파일 import
import textStyles from '../../styles/textStyles';

export default function DownloadCategoryButton({ icon, text }) {
    return (
        <View style={styles.container}>
            {icon && <Image source={icon} style={styles.icon} />}
            <Text style={styles.text}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white000,
        marginRight: 6, // 버튼 간격 조정
        borderRadius: 9999, // 완전히 둥글게
        paddingHorizontal: 12, // 좌우 여백
    },
    icon: {
        width: 20, // ✅ 고정 크기로 설정 (너무 크거나 작지 않게)
        height: 20,
        marginRight: 4,
    },
    text: {
        ...textStyles.title18Bold,
        paddingVertical: 12,
    },
});
