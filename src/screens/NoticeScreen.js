import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../styles/colors';
import NavigationBar from '../components/Common/NavigationBar';
import NoticeListButton from '../components/NoticeScreen/NoticeListButton';

const API_URL = 'http://9oormthonuniv.gonetis.com:3101/api/notices';

export default function NoticeScreen({ navigation }) {
    const [notices, setNotices] = useState([]); // 공지사항 데이터
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [refreshing, setRefreshing] = useState(false); // 새로고침 상태

    useEffect(() => {
        fetchNotices();
    }, []);

    // 공지사항 목록 가져오기 함수
    const fetchNotices = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('서버 응답 실패');
            }
            const data = await response.json();
            // ID 기준으로 내림차순 정렬 (최신 공지가 위로)
            const sortedNotices = data.sort((a, b) => b.id - a.id);
            setNotices(sortedNotices);
        } catch (error) {
            console.error('공지사항 가져오기 실패:', error);
            Alert.alert('에러', '공지사항을 불러올 수 없습니다.');
        } finally {
            setLoading(false);
            setRefreshing(false); // 새로고침 종료
        }
    };

    // 공지사항을 선택했을 때: 이미지 데이터도 함께 가져와서 NoticeDetailScreen으로 전달 (공지사항 id도 전달)
    const handleNoticePress = async (notice) => {
        try {
            const response = await fetch(`${API_URL}/${notice.id}/images`);
            if (!response.ok) {
                throw new Error('이미지 응답 실패');
            }
            const images = await response.json();
            navigation.navigate('NoticeDetailScreen', {
                id: notice.id,
                title: notice.title,
                date: `${notice.date} | ${notice.region}`,
                content: notice.content,
                images, // 이미지 목록 전달
            });
        } catch (error) {
            console.error('공지 상세 데이터 가져오기 실패:', error);
            Alert.alert('에러', '공지 상세 정보를 불러올 수 없습니다.');
        }
    };

    const onRefresh = () => {
        setRefreshing(true); // 새로고침 시작
        fetchNotices(); // 데이터를 다시 불러옴
    };

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
            <NavigationBar title="공지사항" />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={styles.row}>
                    {notices.length > 0 ? (
                        notices.map((notice, index) => (
                            <TouchableOpacity key={notice.id || index} onPress={() => handleNoticePress(notice)}>
                                <View style={styles.buttonContainer}>
                                    {/* NoticeListButton에 id도 전달 */}
                                    <NoticeListButton
                                        id={notice.id}
                                        title={notice.title}
                                        content={notice.content}
                                        date={`${notice.date} | ${notice.region}`}
                                    />
                                </View>
                            </TouchableOpacity>
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
        paddingVertical: 10,
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
