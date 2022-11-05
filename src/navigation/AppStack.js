import OnBording from '../screens/OnBorgingScreen/OnBording';
import BottomTab from './BottomTab';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const AppStack =()=>{
    return (
        <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
  }}>
          <Stack.Screen name="OnBording" component={OnBording} />
          {/* <Stack.Screen name="Auth" component={AuthStack} /> */}
          <Stack.Screen name="BottomTab" component={BottomTab} />
        </Stack.Navigator>
        </NavigationContainer>
      );
}
export default AppStack;


