import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../styles/colors'; // 색상 파일 import
import NavigationBar from '../components/Common/NavigationBar'; // NavigationBar import
import NoticeListButton from '../components/NoticeScreen/NoticeListButton';

const API_URL = 'http://gbnam453.iptime.org:2401/api/notices'; // Spring Boot API 주소

export default function NoticeScreen({ navigation }) {
    const [notices, setNotices] = useState([]); // 공지사항 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 데이터 로딩 상태

    useEffect(() => {
        fetchNotices(); // 공지 목록 가져오기
    }, []);

    // 공지 목록 가져오기 함수
    const fetchNotices = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('서버 응답 실패');
            }
            const data = await response.json();

            // 공지사항을 ID 기준으로 내림차순 정렬 (최신 공지가 위로)
            const sortedNotices = data.sort((a, b) => b.id - a.id);
            setNotices(sortedNotices);
        } catch (error) {
            console.error('공지사항 가져오기 실패:', error);
            Alert.alert('에러', '공지사항을 불러올 수 없습니다.');
        } finally {
            setLoading(false); // 로딩 완료
        }
    };

    // 로딩 중일 때는 로딩 인디케이터 표시
    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <NavigationBar title="공지사항" />
                <ActivityIndicator size="large" style={styles.loader} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* 네비게이션 바 */}
            <NavigationBar title="공지사항" />

            {/* 스크롤 가능한 화면 내용 */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.row}>
                    {notices.length > 0 ? (
                        notices.map((notice, index) => (
                            <View key={notice.id || index} style={styles.buttonContainer}>
                                <NoticeListButton
                                    title={notice.title}
                                    content={notice.content}
                                    date={`${notice.date} | ${notice.region}`} // 지역 | 날짜 형식
                                    navigation={navigation}
                                />
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noNoticeText}>공지사항이 없습니다.</Text>
                    )}
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
    noNoticeText: {
        fontSize: 16,
        color: 'gray',
        marginTop: 20,
    },
});
