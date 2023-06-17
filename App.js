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
// export var deviceId = "";
// export var fcmToken = "";
// export var timeout = 3000;









const App = () => {

  // const [generatedToken, setGeneratedToken] = useState();


  useEffect(() => {

    try {
      SplashScreen.hide();
    } catch (error) {
      console.log("splashError: ", error);
    }

  }, []);



  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default App;


