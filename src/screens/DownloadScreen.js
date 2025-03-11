import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../styles/colors'; // 색상 파일 import
import NavigationBar from '../components/Common/NavigationBar'; // NavigationBar import
import DownloadListButton from '../components/DownloadScreen/DownloadListButton';
import DownloadCategoryButton from '../components/DownloadScreen/DownloadCategoryButton';

export default function DownloadScreen({ navigation }) {
    const [notices, setNotices] = useState([]); // 공지사항 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 데이터 로딩 상태

    useEffect(() => {
        // API 요청을 보내서 공지사항 데이터를 가져옴
        fetch('http://gbnam453.iptime.org:2401/neulbom/api/download')
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
                <NavigationBar title="수업자료" />
                <ActivityIndicator size="large" style={styles.loader} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* 네비게이션 바 */}
            <NavigationBar title="수업자료" />
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.category}>
                <DownloadCategoryButton text={'공통'}/>
                <DownloadCategoryButton text={'기후환경'}/>
                <DownloadCategoryButton text={'문화예술'}/>
                <DownloadCategoryButton text={'사회정서'}/>
                <DownloadCategoryButton text={'창의과학'}/>
                <DownloadCategoryButton text={'체육'}/>
            </ScrollView>
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
    category: {
        flexDirection: 'row', // ✅ 버튼을 가로로 정렬
        alignItems: 'center', // ✅ 버튼을 세로 중앙 정렬
        paddingHorizontal: 8, // ✅ 좌우 여백 추가 (필요시 조절)
        marginBottom: 16,
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
