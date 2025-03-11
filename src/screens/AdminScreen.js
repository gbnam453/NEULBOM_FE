import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = "http://gbnam453.iptime.org:2401/api/notices"; // Spring Boot API 주소

const AdminScreen = () => {
    const [notices, setNotices] = useState([]);
    const [title, setTitle] = useState("");
    const [region, setRegion] = useState("");
    const [content, setContent] = useState("");

    // 공지 목록 가져오기
    const fetchNotices = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setNotices(data);
        } catch (error) {
            Alert.alert("에러", "공지사항을 불러오지 못했습니다.");
        }
    };

    // 공지 추가하기
    const addNotice = async () => {
        if (!title || !region || !content) {
            Alert.alert("입력 오류", "모든 필드를 입력해주세요.");
            return;
        }

        const newNotice = { title, region, content };

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newNotice),
            });

            if (response.ok) {
                Alert.alert("성공", "공지사항이 추가되었습니다.");
                setTitle("");
                setRegion("");
                setContent("");
                fetchNotices();
            } else {
                Alert.alert("실패", "공지 추가 실패.");
            }
        } catch (error) {
            Alert.alert("에러", "서버와 연결할 수 없습니다.");
        }
    };

    // 공지 삭제하기
    const deleteNotice = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

            if (response.ok) {
                Alert.alert("삭제 완료", "공지사항이 삭제되었습니다.");
                fetchNotices();
            } else {
                Alert.alert("삭제 실패", "공지 삭제에 실패했습니다.");
            }
        } catch (error) {
            Alert.alert("에러", "서버와 연결할 수 없습니다.");
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>공지사항 관리</Text>

            {/* 입력 폼 */}
            <TextInput placeholder="공지 제목" value={title} onChangeText={setTitle} style={styles.input} />
            <TextInput placeholder="지역 (대전, 서산, 아산)" value={region} onChangeText={setRegion} style={styles.input} />
            <TextInput placeholder="공지 내용" value={content} onChangeText={setContent} style={styles.input} multiline />

            <Button title="공지 추가" onPress={addNotice} />

            {/* 공지 목록 */}
            <FlatList
                data={notices}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.noticeItem}>
                        <Text style={styles.noticeTitle}>{item.title} ({item.region})</Text>
                        <Text>{item.content}</Text>
                        <TouchableOpacity onPress={() => deleteNotice(item.id)} style={styles.deleteButton}>
                            <Text style={{ color: "white" }}>삭제</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = {
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    noticeItem: {
        padding: 15,
        marginVertical: 5,
        backgroundColor: "#f9f9f9",
        borderRadius: 5,
    },
    noticeTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    deleteButton: {
        marginTop: 5,
        padding: 8,
        backgroundColor: "red",
        borderRadius: 5,
        alignItems: "center",
    },
};

export default AdminScreen;
