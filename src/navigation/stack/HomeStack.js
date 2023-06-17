import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreens/HomeScreen';
import DetailScreen from '../../screens/HomeScreens/DetailScreen';
import RegisterScreen from '../../screens/SettingScreens/RegisterScreen';
const Stack = createNativeStackNavigator();
const HomeStack =()=>{
    return (
        <Stack.Navigator screenOptions={{
          headerShown: false
  }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="DetailScreen" component={DetailScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

        </Stack.Navigator>
      );
}
export default HomeStack;