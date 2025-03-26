import React, { useEffect, useRef } from 'react';
import { Alert, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import messaging from '@react-native-firebase/messaging';

import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import NotificationScreen from './screens/NotificationScreen';
import NoticeScreen from './screens/NoticeScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import UploadScreen from './screens/UploadScreen';
import DirectionScreen from './screens/DirectionScreen';
import WelcomeMessageScreen from './screens/WelcomeMessageScreen';
import ContactScreen from './screens/ContactScreen';
import DownloadScreen from './screens/DownloadScreen';
import DownloadDetailScreen from './screens/DownloadDetailScreen';
import WebViewScreen from './screens/WebViewScreen';
import NoticeDetailScreen from './screens/NoticeDetailScreen';
import AdminScreen from './screens/AdminScreen';

enableScreens();

const Stack = createStackNavigator();

// Text 설정
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

// TextInput 설정
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

// 전역 네비게이션 참조 생성
const navigationRef = React.createRef();
function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

export default function App() {
    useEffect(() => {
        // 앱이 종료된 상태에서 알림을 탭하여 실행될 때
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage && remoteMessage.data && remoteMessage.data.noticeId) {
                    navigate('NoticeDetailScreen', { id: remoteMessage.data.noticeId });
                }
            });

        // 앱이 백그라운드 상태에서 알림을 탭했을 때
        const unsubscribeNotificationOpened = messaging().onNotificationOpenedApp(remoteMessage => {
            if (remoteMessage && remoteMessage.data && remoteMessage.data.noticeId) {
                navigate('NoticeDetailScreen', { id: remoteMessage.data.noticeId });
            }
        });

        // 앱이 포그라운드 상태에서 알림을 수신했을 때
        const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
            Alert.alert(
                remoteMessage.notification.title,
                remoteMessage.notification.body,
                [
                    {
                        text: '확인',
                        onPress: () => {
                            if (remoteMessage.data && remoteMessage.data.noticeId) {
                                navigate('NoticeDetailScreen', { id: remoteMessage.data.noticeId });
                            }
                        },
                    },
                ]
            );
        });

        return () => {
            unsubscribeNotificationOpened();
            unsubscribeOnMessage();
        };
    }, []);

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="NoticeScreen" component={NoticeScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="UploadScreen" component={UploadScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="DownloadScreen" component={DownloadScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="DownloadDetailScreen" component={DownloadDetailScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="DirectionScreen" component={DirectionScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="WelcomeMessageScreen" component={WelcomeMessageScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="ContactScreen" component={ContactScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="WebViewScreen" component={WebViewScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="NoticeDetailScreen" component={NoticeDetailScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
