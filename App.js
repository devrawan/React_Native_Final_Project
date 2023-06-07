
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
export var deviceId = "";
export var fcmToken = "";
export var timeout = 3000;


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

  // const [generatedToken, setGeneratedToken] = useState();

  const setup = async () => {
    // createFCMChannel();
    await requestUserPermission();
    messaging().onMessage(onMessageReceived);


    messaging().setBackgroundMessageHandler(onMessageReceived);

    console.log("use effect kareem init ");


    try {
      if ('test' == 'test') {
        await messaging().setAPNSToken('test');
      }

      let token = await messaging().getToken();
      console.log("token: ", token);
      fcmToken = token;
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
      console.log("error: ", error);
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

  deviceId = getUniqueId().then((id) => {
    deviceId = id;
  }).catch((err) => { });

  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default App;




