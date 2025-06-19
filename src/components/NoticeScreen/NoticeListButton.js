import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import textStyles from '../../styles/textStyles';
import colors from '../../styles/colors';

export default function NoticeListButton({ id, title, content, date, color = 'white' }) {
    const navigation = useNavigation();

    const handlePress = () => {
        // id 포함해서 NoticeDetailScreen으로 전달
        navigation.navigate('NoticeDetailScreen', { id, title, content, date });
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
            <View style={styles.titleContainer}>
                <Text allowFontScaling={false} style={textStyles.subtitle18semiBold20}>{title}</Text>
                <Text allowFontScaling={false} style={[textStyles.caption14Medium16, { color: colors.gray700, marginTop: 6 }]}>
                    {date}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const { width: screenWidth } = Dimensions.get('window');
const adjustedWidth = screenWidth - 20;

const styles = StyleSheet.create({
    button: {
        width: adjustedWidth,
        borderRadius: 16,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 12,
        paddingTop: 16,
        paddingBottom: 26,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray300,
    },
    titleContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
});
