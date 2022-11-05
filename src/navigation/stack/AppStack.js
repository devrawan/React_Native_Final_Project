import OnBoarding from '../../screens/OnBoardingScreen/OnBoardingScreen';
import BottomTab from '../BottomTab';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import Homes from '../../screens/HomeScreens/Homes';
const Stack = createNativeStackNavigator();
const AppStack =()=>{
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={{
          headerShown: false
  }}>
          <Stack.Screen name="Home" component={Homes} />
          <Stack.Screen name="AuthStack" component={AuthStack} />
        </Stack.Navigator>
      );
}
export default AppStack;


