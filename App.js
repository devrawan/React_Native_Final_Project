
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, useWindowDimensions, TouchableOpacity, Alert } from 'react-native'
import AppStack from './src/navigation/stack/AppStack';
// import RootStack from './src/navigation/stack/RootStack';
// import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigation/stack/AuthStack';
import Login from './src/screens/LoginScreens/LoginScreen';
import BottomTab from './src/navigation/BottomTab';
import RootStack from './src/navigation/stack/RootStack';
const App = () => {
  return (

    <NavigationContainer>
<RootStack/>
  </NavigationContainer>
  );
};

export default App;
  // <AppStack />



