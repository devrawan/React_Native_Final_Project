import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingScreen from '../../screens/SettingScreens/SettingScreen';
import PrivacyScreen from '../../screens/SettingScreens/PrivacyScreen';
import ContactUsScreen from '../../screens/SettingScreens/ContactUsScreen';
import TermsConditions from '../../screens/SettingScreens/TermsConditions';
import AddOfferScreen from '../../screens/SettingScreens/AddOfferScreen';
const Stack = createNativeStackNavigator();
const SettingStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='SettingScreen' component={SettingScreen} />
      <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} />
      <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />
      <Stack.Screen name='TermsConditions' component={TermsConditions} />
      <Stack.Screen name='AddOfferScreen' component={AddOfferScreen} />

    </Stack.Navigator>
  );
}
export default SettingStack;