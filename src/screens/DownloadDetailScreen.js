import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import colors from '../styles/colors';
import NavigationBar from '../components/Common/NavigationBar';
import DownloadListButton from '../components/DownloadScreen/DownloadListButton';

const API_URL = 'http://9oormthonuniv.gonetis.com:3101/api/downloads'; // 다운로드 목록 조회 API

export default function DownloadDetailScreen({ navigation }) {
    const [downloads, setDownloads] = useState([]); // 다운로드 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 데이터 로딩 상태
    const [refreshing, setRefreshing] = useState(false); // 새로고침 상태
    const [categories, setCategories] = useState([]); // 중복 없는 카테고리 목록
    const [selectedCategory, setSelectedCategory] = useState('전체'); // 기본값을 '전체'로 설정

    const route = useRoute();
    const { region } = route.params; // 전달받은 region 값

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

            // ✅ 선택한 region 값과 일치하는 데이터만 필터링
            const filteredDownloads = data.filter(item => item.region === region);

            // ✅ category를 기준으로 오름차순 정렬 후, 같은 category 내에서는 type을 기준으로 오름차순 정렬
            const sortedDownloads = filteredDownloads.sort((a, b) => {
                if (a.category < b.category) return -1;
                if (a.category > b.category) return 1;
                if (a.type < b.type) return -1;
                if (a.type > b.type) return 1;
                return 0;
            });

            // ✅ 중복 없는 카테고리 목록 생성 (가나다순 정렬) + '전체' 추가
            const uniqueCategories = [
                '전체',
                ...Array.from(new Set(sortedDownloads
                    .map(item => item.category || '기타') // ✅ category가 없는 경우 '기타'로 설정
                    .filter(category => category))) // ✅ undefined 값 필터링
                    .sort()
            ];
            setDownloads(sortedDownloads);
            setCategories(uniqueCategories);
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

    // ✅ 선택된 카테고리에 맞는 데이터 필터링 (전체면 모든 데이터 표시)
    const filteredDownloads =
        selectedCategory === '전체' ? downloads : downloads.filter(download => download.category === selectedCategory);

    // 로딩 중일 때는 로딩 인디케이터 표시
    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <NavigationBar title={region} />
                <ActivityIndicator size="large" style={styles.loader} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* 네비게이션 바 */}
            <NavigationBar title={region} />

            {/* ✅ 가로 스크롤 가능한 카테고리 버튼 추가 (전체 포함) */}
            <View style={styles.categoryContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {categories.map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.categoryButton,
                                selectedCategory === category && styles.selectedCategoryButton
                            ]}
                            onPress={() => setSelectedCategory(category)}
                        >
                            <Text style={[
                                styles.categoryText,
                                selectedCategory === category && styles.selectedCategoryText
                            ]}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* 스크롤 가능한 화면 내용 + 새로고침 기능 추가 */}
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={styles.row}>
                    {filteredDownloads.length > 0 ? (
                        filteredDownloads.map((download, index) => (
                            <View key={download.id || index} style={styles.buttonContainer}>
                                <DownloadListButton
                                    title={download.title} // 자료 제목
                                    category={download.category} // 카테고리
                                    type={download.type} // 자료 유형 (PDF, 링크 등)
                                    link={download.link} // 다운로드 링크
                                    navigation={navigation}
                                />
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noDownloadText}>해당 카테고리의 다운로드 가능한 자료가 없습니다.</Text>
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
    categoryContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray200,
        backgroundColor: colors.white,
    },
    categoryButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: colors.gray100,
        marginRight: 8,
    },
    selectedCategoryButton: {
        backgroundColor: colors.primary, // 선택된 카테고리의 색상 변경
    },
    categoryText: {
        fontSize: 14,
        color: colors.gray700,
    },
    selectedCategoryText: {
        color: colors.white, // 선택된 카테고리의 텍스트 색상 변경
        fontWeight: 'bold',
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
