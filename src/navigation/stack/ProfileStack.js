import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../../screens/profileScreen/ProfileScreen';
import Terms from '../../screens/profileScreen/Terms'
import LanguageScreen from '../../screens/profileScreen/LanguageScreen';
const Stack = createNativeStackNavigator();
const ProfileStack =()=>{
    return (
        <Stack.Navigator screenOptions={{
          headerShown: false
  }}>
          <Stack.Screen name="MainProf" component={Profile} />
          <Stack.Screen name="Terms" component={Terms} />
          <Stack.Screen name='LanguageScreen' component={LanguageScreen}/>
        </Stack.Navigator>
    
      );
}
export default ProfileStack;