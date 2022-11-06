import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../../screens/LoginScreens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreens/RegisterScreen';
import OnBoarding from '../../screens/OnBorgingScreen/OnBordingScreen';
// import Homes from '../../screens/HomeScreens/Homes';
import AppStack from './AppStack';
const Stack = createStackNavigator();
export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name={"OnBoarding"} component={OnBoarding} />
         <Stack.Screen name={'SignIn'} component={LoginScreen} />
        <Stack.Screen name={'SignUp'} component={RegisterScreen} /> 
     <Stack.Screen name={"AppStack"}component={AppStack} />
    </Stack.Navigator>
  )
}