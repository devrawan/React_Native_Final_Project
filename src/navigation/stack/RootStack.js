import React, { useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const RootStack = () => {
  // const [accessToken, setAccessToken] = useState('Not_User');
  // useEffect(() => {
  //   AsyncStorage.getItem('AccessToken')
  //     .then(token => setAccessToken(token))
  //     .catch(err => console.log(err));
  // }, [accessToken]);
  return (
    <>
      {/* {accessToken !== 'Not_User' ? ( */}
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          // initialRouteName={accessToken === null ? 'AuthStack' : 'AppStack'}
          >
           <Stack.Screen name={"AppStack"}component={AppStack} />
          <Stack.Screen name={"AuthStack"} component={AuthStack} />
        </Stack.Navigator>
      {/* ) : null} */}
    </>
  );
};
export default RootStack;