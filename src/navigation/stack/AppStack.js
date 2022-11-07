import OnBording from '../../screens/OnBorgingScreen/OnBordingScreen';
import BottomTab from '../BottomTab';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
const Stack = createNativeStackNavigator();
const AppStack =()=>{
    return (
        
        <Stack.Navigator screenOptions={{
          headerShown: false
  }}>
          {/* <Stack.Screen name="OnBording" component={OnBording} />
          <Stack.Screen name="Auth" component={AuthStack} /> */}
          <Stack.Screen name="BottomTab" component={BottomTab} />
        </Stack.Navigator>
      );
}
export default AppStack;


