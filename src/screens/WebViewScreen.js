import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import NavigationBar from '../components/Common/NavigationBar';

export default function WebViewScreen({ route }) {
    const { url } = route.params; // 전달받은 URL

    return (
        <SafeAreaView style={styles.container}>
            <NavigationBar title="서류제출" />
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
