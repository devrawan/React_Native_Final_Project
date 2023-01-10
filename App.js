
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './src/navigation/stack/AppStack';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, useWindowDimensions, TouchableOpacity, Alert } from 'react-native'
const App = () => {
  return (

    <NavigationContainer>
<AppStack />
  </NavigationContainer>
  );
};

export default App;
  // <AppStack />



