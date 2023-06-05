
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
export var deviceId = "";
export var fcmToken = "";


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

    setTimeout(async () => {
      // messaging().getToken()
      //   .then((data) => {
      //     fcmToken = data;
      //   }).catch((error) => {
      //     console.log("Error FCM: " , error)
      //   });

      try {
        if ('test' == 'test') {
          await messaging().setAPNSToken('test');
        }

        let token = await messaging().getToken();
        console.log("token: ", token);
        fcmToken = token;
      } catch (error) {

        console.log("error: ", error);

      }
    }, 1000);
  }

  useEffect(() => {

    try {
      SplashScreen.hide();
    } catch (error) {
      console.log("splashError: ", error);
    }
    setTimeout(() => {
      setup();
    }, 1000);


  }, []);

  deviceId = getUniqueId().then((id) => {
    console.log("App Device Id : ", id);
    deviceId = id;

  }).catch((err) => {
    console.log("App Device Id : erro ", err);

  });

  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default App;




