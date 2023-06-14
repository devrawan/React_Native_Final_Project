
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './src/navigation/stack/AppStack';
import './src/i18n';
import { getUniqueId } from 'react-native-device-info';
import messaging, { firebase } from '@react-native-firebase/messaging';
import { initializeApp } from '@react-native-firebase/app';
import { set } from 'react-native-reanimated';
import SplashScreen from 'react-native-splash-screen';
import { err } from 'react-native-svg/lib/typescript/xml';
import axios from 'axios';
import { AsyncStorage } from 'react-native';


export var deviceId = "";
export var fcmToken = "";
export var timeout = 4000;


async function requestUserPermission() {

  try {

    if (firebase.apps.length == 0) {

      const app = await initializeApp({
        appId: '1:368594238603:ios:c77836caefc2c04028e88e',
        apiKey: 'AIzaSyCVexBz9LQO4yIIFt15VPIgPnXh484GEJs',
        messagingSenderId: '368594238603',
        projectId: 'xcobon-cbd5a',

        authDomain: "",
        databaseURL: "",
        storageBucket: "",
      });
    }

  } catch (error) {
    console.log("initializeApp error: ", error)
  }


  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('KAREEM Authorization status:', authStatus);
  }
}





function onMessageReceived(message) {
}

const App = () => {



  const setup = async () => {


    deviceId = await AsyncStorage.getItem('deviceId');
    if (deviceId == undefined || deviceId == null) {
      deviceId = await getUniqueId();
      await AsyncStorage.setItem('deviceId', deviceId);
    }

    await requestUserPermission();

    messaging().onMessage(onMessageReceived);
    messaging().setBackgroundMessageHandler(onMessageReceived);
    fcmToken = await AsyncStorage.getItem('fcmToken');
    if (fcmToken == undefined || deviceId == null) {
      let apns = await messaging().getAPNSToken();
      await messaging().setAPNSToken(apns);
      let token = await messaging().getToken();
      await  AsyncStorage.setItem('fcmToken', token);
      fcmToken = token;
    }



    try {
      timeout = 0;
      axios.post(
        `https://xcobon.com/api/update_device_key`,
        {
          'deviceKey': deviceId,
          'device_key': deviceId,
          'fcm-token': fcmToken
        },
        {
          headers: {
            'deviceKey': deviceId,
            'Content-Type': 'application/json',
            'accept': '*/*',
            'language': 'en'
          }
        }

      ).then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.log(error.response.data);
      })
    } catch (error) {
      console.log("inittttttt error: ", error);
    }
  }

  useEffect(() => {

    try {
      SplashScreen.hide();
    } catch (error) {
      console.log("splashError: ", error);
    }

    setup();



  }, []);



  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default App;




