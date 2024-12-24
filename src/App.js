import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
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

enableScreens();

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="NoticeScreen" component={NoticeScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="UploadScreen" component={UploadScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="DownloadScreen" component={DownloadScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="DirectionScreen" component={DirectionScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="WelcomeMessageScreen" component={WelcomeMessageScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="ContactScreen" component={ContactScreen} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
