/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

// Handle background notifications

messaging().onMessage(async remoteMessage => {
    Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
});

   


messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

messaging().getInitialNotification(async remoteMessage => {
    console.log('Message handled in the Killed!', remoteMessage);
  });

AppRegistry.registerComponent(appName, () => App);
