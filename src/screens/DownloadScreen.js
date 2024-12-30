import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../styles/colors'; // 색상 파일 import
import NavigationBar from '../components/Common/NavigationBar'; // NavigationBar import
import NoticeListButton from '../components/NoticeScreen/NoticeListButton';
import NoticeAddButton from '../components/NoticeScreen/NoticeAddButton';

export default function DownloadScreen({ navigation }) {
    const [notices, setNotices] = useState([]); // 공지사항 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 데이터 로딩 상태

    useEffect(() => {
        // API 요청을 보내서 공지사항 데이터를 가져옴
        fetch('http://gbnam453.iptime.org:8080/neulbom/api/download')
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

    // 새로운 공지사항을 추가하는 함수
    const addNotice = () => {
        const newNotice = {
            title: '새로운 수업자료',
            description: '새로운 수업자료의 내용입니다.',
            date: '2024-12-31',
        };

        fetch('http://gbnam453.iptime.org:8080/neulbom/api/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newNotice),
        })
            .then((response) => response.json())
            .then((data) => {
                setNotices((prevNotices) => [...prevNotices, data]); // 새로운 공지사항을 notices 상태에 추가
                Alert.alert('공지사항 추가', '새로운 공지사항이 추가되었습니다.');
            })
            .catch((error) => {
                console.error('Error adding notice:', error);
                Alert.alert('에러', '공지사항을 추가하는 데 실패했습니다.');
            });
    };

    // 로딩 중일 때는 로딩 인디케이터 표시
    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <NavigationBar title="수업자료" />
                <ActivityIndicator size="large" style={styles.loader} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* 네비게이션 바 */}
            <NavigationBar title="수업자료" />
            {/* 스크롤 가능한 화면 내용 */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.row}>
                    {notices.map((notice) => (
                        <View key={notice.id} style={styles.buttonContainer}>
                            <NoticeListButton title={notice.title} date={notice.date} />
                        </View>
                    ))}
                </View>
                <View style={styles.buttonContainer}>
                    <NoticeAddButton onPress={addNotice} /> {/* NoticeAddButton에 addNotice 함수 전달 */}
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
