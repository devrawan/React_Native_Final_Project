
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './src/navigation/stack/AppStack';
import  './src/i18n';
const App = () => {

  return (
    <NavigationContainer>
<AppStack />
  </NavigationContainer>
  );
};

export default App;
  



