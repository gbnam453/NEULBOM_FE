import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import NavigationBar from '../components/Common/NavigationBar';

const AdminScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <WebView source={{ uri: 'http://9oormthonuniv.gonetis.com:3102' }} style={styles.webView} />
        </SafeAreaView>
    );
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    webView: {
        flex: 1,
    },
};

export default AdminScreen;
