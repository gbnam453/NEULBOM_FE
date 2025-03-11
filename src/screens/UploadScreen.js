import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../styles/colors'; // 색상 파일 import
import NavigationBar from '../components/Common/NavigationBar'; // NavigationBar import
import UploadListButton from '../components/UploadScreen/UploadListButton';

const API_URL = 'http://gbnam453.iptime.org:8080/api/uploads'; // 업로드 목록 조회 API

export default function UploadScreen({ navigation }) {
    const [uploads, setUploads] = useState([]); // 업로드 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 데이터 로딩 상태

    useEffect(() => {
        fetchUploads(); // 업로드 목록 가져오기
    }, []);

    // 업로드 목록 가져오기 함수
    const fetchUploads = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('서버 응답 실패');
            }
            const data = await response.json();
            setUploads(data); // 가져온 데이터를 상태에 저장
        } catch (error) {
            console.error('업로드 목록 가져오기 실패:', error);
            Alert.alert('에러', '업로드 목록을 불러올 수 없습니다.');
        } finally {
            setLoading(false); // 로딩 완료
        }
    };

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
                    {uploads.length > 0 ? (
                        uploads.map((upload, index) => (
                            <View key={upload.id || index} style={styles.buttonContainer}>
                                {/* type 값에 따라 버튼 컴포넌트 선택 */}
                                <UploadListButton
                                    title={upload.title}
                                    detail={upload.detail} // 상세 설명
                                    type={upload.type} // survey 또는 file
                                    link={upload.link} // 파일 URL 또는 설문 링크
                                    navigation={navigation}
                                />
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noUploadText}>업로드된 서류가 없습니다.</Text>
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
    noUploadText: {
        fontSize: 16,
        color: 'gray',
        marginTop: 20,
    },
});
