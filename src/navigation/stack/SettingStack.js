import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingScreen from '../../screens/SettingScreens/SettingScreen';
import PrivacyScreen from '../../screens/SettingScreens/PrivacyScreen';
import ContactUsScreen from '../../screens/SettingScreens/ContactUsScreen';
const Stack = createNativeStackNavigator();
const SettingStack =()=>{
    return (
        <Stack.Navigator screenOptions={{
          headerShown: false
  }}>
    <Stack.Screen  name='SettingScreen' component={SettingScreen} />
          <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} />
          <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />

        </Stack.Navigator>
      );
}
export default SettingStack;