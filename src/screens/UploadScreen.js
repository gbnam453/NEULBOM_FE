import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../styles/colors'; // 색상 파일 import
import NavigationBar from '../components/Common/NavigationBar'; // NavigationBar import
import DownloadListButton from '../components/UploadScreen/UploadListButton';

export default function UploadScreen({ navigation }) {
    const [notices, setNotices] = useState([]); // 공지사항 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 데이터 로딩 상태

    useEffect(() => {
        // API 요청을 보내서 공지사항 데이터를 가져옴
        fetch('http://gbnam453.iptime.org:8080/neulbom/api/upload')
            .then((response) => response.json())
            .then((data) => {
                setNotices(data); // 가져온 데이터를 notices 상태에 저장
                setLoading(false); // 로딩 완료
            })
            .catch((error) => {
                console.error('Error fetching notices:', error);
                setLoading(false);
            });
    }, []);

    // 로딩 중일 때는 로딩 인디케이터 표시
    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <NavigationBar title="서류제출" />
                <ActivityIndicator size="large" style={styles.loader} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* 네비게이션 바 */}
            <NavigationBar title="서류제출" />
            {/* 스크롤 가능한 화면 내용 */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.row}>
                    {notices.map((notice, index) => (
                        <View key={notice.id || index} style={styles.buttonContainer}>
                            <DownloadListButton
                                title={notice.title}
                                date={notice.date}
                                link={notice.link} // link 전달
                                navigation={navigation} // navigation 전달
                            />
                        </View>
                    ))}
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
        paddingHorizontal: 20,
        paddingVertical: 10, // 스크롤뷰 패딩
        alignItems: 'center',
    },
    row: {
        width: '100%',
        alignItems: 'center',
    },
    buttonContainer: {
        marginBottom: 10,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
