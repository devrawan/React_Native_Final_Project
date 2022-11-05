import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../../screens/LoginScreens/LoginScreen';
import SignUp from '../../screens/RegisterScreens/RegisterScreen';
import OnBoarding from '../../screens/OnBoardingScreen/OnBoardingScreen';
// import Homes from '../../screens/HomeScreens/Homes';
import AppStack from './AppStack';
const Stack = createStackNavigator();
export default function AuthStack() {
  return (
    
    <Stack.Navigator initialRouteName='OnBoarding' screenOptions={{headerShown:false}}>
        <Stack.Screen name={"OnBoarding"} component={OnBoarding} />
        <Stack.Screen name={'SignIn'} component={SignIn} />
        <Stack.Screen name={'SignUp'} component={SignUp} />
        <Stack.Screen name={"AppStack"}component={AppStack} />
    </Stack.Navigator>
  )
}
