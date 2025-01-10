import React, { useRef } from 'react';
import { StyleSheet, SafeAreaView, Alert, Platform } from 'react-native';
import WebView from 'react-native-webview';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

export default function WebViewScreen({ route }) {
    const { url } = route.params; // 전달받은 URL
    const webViewRef = useRef(null);

    const handleFileDownload = async (downloadUrl) => {
        try {
            const fileName = downloadUrl.split('/').pop(); // 파일명 추출
            const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;

            const download = RNFS.downloadFile({
                fromUrl: downloadUrl,
                toFile: path,
            });

            const result = await download.promise;
            if (result.statusCode === 200) {
                Alert.alert('다운로드 완료', '파일이 다운로드되었습니다.');
                // iOS에서 다운로드된 파일 공유 메뉴 열기
                if (Platform.OS === 'ios') {
                    await Share.open({ url: `file://${path}` }).catch((error) =>
                        console.error('Sharing error:', error),
                    );
                }
            } else {
                Alert.alert('다운로드 실패', '파일을 다운로드할 수 없습니다.');
            }
        } catch (error) {
            console.error('File download error:', error);
            Alert.alert('에러', '파일 다운로드 중 문제가 발생했습니다.');
        }
    };

    const handleShouldStartLoadWithRequest = (request) => {
        const { url: requestUrl } = request;

        if (Platform.OS === 'ios' && requestUrl.match(/\.(pdf|zip|docx|png|jpg)$/)) {
            handleFileDownload(requestUrl);
            return false; // WebView에서 로드하지 않음
        }

        return true;
    };

    return (
        <SafeAreaView style={styles.container}>
            <WebView
                ref={webViewRef}
                source={{ uri: url }}
                style={styles.webView}
                onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowFileAccess={true}
                allowFileAccessFromFileURLs={true}
                allowUniversalAccessFromFileURLs={true}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    webView: {
        flex: 1,
    },
});
