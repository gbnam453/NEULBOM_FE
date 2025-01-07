import React from 'react';
import { View, StyleSheet, ScrollView, Text, Linking, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../styles/colors';
import textStyles from '../styles/textStyles';
import NavigationBar from '../components/Common/NavigationBar';
import ThreeByOneButton from '../components/HomeScreen/ThreeByOneButton';

export default function ContactScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <NavigationBar title="문의처" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* 상단 문구 */}
                <Text style={styles.title}>
                    호서대학교 산학협력단
                    {'\n'}벤처교육원 AI·SW교육센터 늘봄학교팀
                </Text>

                {/* ThreeByOneButton 수직 배치 */}
                <View style={styles.buttonContainer}>
                    <ThreeByOneButton
                        title="전화"
                        detail="041-423-2415"
                        imageSource={require('../assets/images/Icons/Icon_Phone.png')} // PNG 사용
                        onPress={() => Linking.openURL('tel:041-423-2415')}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <ThreeByOneButton
                        title="전화"
                        detail="041-423-2416"
                        imageSource={require('../assets/images/Icons/Icon_Phone.png')} // PNG 사용
                        onPress={() => Linking.openURL('tel:041-423-2416')}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <ThreeByOneButton
                        title="이메일"
                        detail="neul2bom2@gmail.com"
                        imageSource={require('../assets/images/Icons/Icon_Email.png')} // PNG 사용
                        onPress={() => Linking.openURL('mailto:neul2bom2@gmail.com')}
                    />
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
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
    },
    title: {
        ...textStyles.title22Bold,
        color: colors.gray900,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        marginBottom: 10,
    },
});
