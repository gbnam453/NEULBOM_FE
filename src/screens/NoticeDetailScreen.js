import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationBar from '../components/Common/NavigationBar';
import ImageModal from 'react-native-image-modal';
import colors from '../styles/colors';
import textStyles from '../styles/textStyles';

const API_URL = 'http://9oormthonuniv.iptime.org:3101/api/notices';

export default function NoticeDetailScreen({ route }) {
    const { id, title, date, content, region } = route.params;
    const [images, setImages] = useState([]);
    const [loadingImages, setLoadingImages] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(`${API_URL}/${id}/images`);
                if (!response.ok) {
                    throw new Error('서버 응답 실패');
                }
                const data = await response.json();
                setImages(data);
            } finally {
                setLoadingImages(false);
            }
        };
        fetchImages();
    }, [id]);

    return (
        <SafeAreaView style={styles.container}>
            <NavigationBar title="공지사항" />
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.titleContainer}>
                    <Text allowFontScaling={false} style={textStyles.subtitle18semiBold20}>{title}</Text>
                    <Text allowFontScaling={false} style={[textStyles.caption14Medium16, styles.date]}>
                        {date}{region}
                    </Text>
                </View>
                <View style={styles.detailContainer}>
                    <Text allowFontScaling={false} style={[textStyles.caption14Medium16, styles.detail]}>
                        {content}
                    </Text>
                </View>
                <View style={styles.imageSection}>
                    {loadingImages ? (
                        <ActivityIndicator size="small" color={colors.gray700} style={styles.loader} />
                    ) : (
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {images.map((img, index) => (
                                <ImageModal
                                    key={index}
                                    resizeMode="contain"
                                    imageBackgroundColor={colors.gray050}
                                    style={styles.imageThumbnail}
                                    source={{ uri: img.imageUrl }}
                                />
                            ))}
                        </ScrollView>
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
    content: {
        padding: 20,
    },
    titleContainer: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray300,
        paddingBottom: 20,
    },
    date: {
        marginTop: 5,
        color: colors.gray700,
    },
    detailContainer: {
        marginTop: 20,
    },
    detail: {
        color: colors.gray900,
    },
    imageSection: {
        marginTop: 40,
    },
    imageThumbnail: {
        width: 100,
        height: 100,
        marginRight: 8,
        borderRadius: 12,
    },
    loader: {
        marginVertical: 10,
    },
});
