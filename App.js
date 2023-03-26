
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './src/navigation/stack/AppStack';
import  './src/i18n';
import { getUniqueId} from 'react-native-device-info';

export var  deviceId = "";

const App =  () => {


 deviceId =   getUniqueId().then((id)=>{
  console.log("App Device Id : " , id);
  deviceId = id;

 }).catch((err)=>{
  console.log("App Device Id : erro " , err);

 });
 
  return (
    <NavigationContainer>
      <AppStack />
  </NavigationContainer>
  );
};

export default App;
  



