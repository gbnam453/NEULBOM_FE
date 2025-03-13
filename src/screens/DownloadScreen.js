import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../styles/colors'; // 색상 파일 import
import NavigationBar from '../components/Common/NavigationBar';
import DownloadRegionButton from '../components/DownloadScreen/DownloadRegionButton';

const API_URL = 'http://gbnam453.iptime.org:2401/api/downloads'; // 다운로드 목록 조회 API

export default function DownloadScreen({ navigation }) {
    const [downloads, setDownloads] = useState([]); // 다운로드 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 데이터 로딩 상태
    const [refreshing, setRefreshing] = useState(false); // 새로고침 상태

    useEffect(() => {
        fetchDownloads();
    }, []);

    // ✅ 다운로드 목록 가져오기 함수
    const fetchDownloads = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('서버 응답 실패');
            }
            const data = await response.json();

            // ✅ 같은 region을 가진 항목들을 묶어서 category를 배열로 변환
            const groupedDownloads = data.reduce((acc, item) => {
                let existingRegion = acc.find((entry) => entry.region === item.region);

                if (existingRegion) {
                    if (!existingRegion.category.includes(item.category)) {
                        existingRegion.category.push(item.category);
                    }
                } else {
                    acc.push({
                        region: item.region,
                        category: [item.category], // 배열로 초기화
                    });
                }
                return acc;
            }, []);

            // ✅ category를 가나다순으로 정렬하여 전달
            const formattedDownloads = groupedDownloads.map((item) => ({
                ...item,
                category: item.category.sort().join(', '), // 문자열로 변환
            }));

            setDownloads(formattedDownloads);
        } catch (error) {
            console.error('다운로드 목록 가져오기 실패:', error);
            Alert.alert('에러', '다운로드 목록을 불러올 수 없습니다.');
        } finally {
            setLoading(false);
            setRefreshing(false); // 새로고침 종료
        }
    };

    // ✅ 새로고침 함수
    const onRefresh = () => {
        setRefreshing(true); // 새로고침 시작
        fetchDownloads(); // 데이터를 다시 불러옴
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

            {/* 스크롤 가능한 화면 내용 + 새로고침 기능 추가 */}
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={styles.row}>
                    {downloads.length > 0 ? (
                        downloads.map((download, index) => (
                            <View key={download.region || index} style={styles.buttonContainer}>
                                {/* ✅ DownloadRegionButton에 데이터 전달 */}
                                <DownloadRegionButton
                                    region={download.region} // 지역 정보
                                    category={download.category} // 여러 개의 카테고리를 정렬된 문자열로 전달
                                    navigation={navigation}
                                />
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noDownloadText}>다운로드 가능한 자료가 없습니다.</Text>
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
    noDownloadText: {
        fontSize: 16,
        color: 'gray',
        marginTop: 20,
    },
});
