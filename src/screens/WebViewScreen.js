import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';

export default function WebViewScreen({ route }) {
    const { url } = route.params; // 전달받은 URL

    return (
        <SafeAreaView style={styles.container}>
            <WebView source={{ uri: url }} style={styles.webView} />
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
