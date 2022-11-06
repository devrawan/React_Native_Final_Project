import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../../screens/profileScreen/ProfileScreen';
const Stack = createNativeStackNavigator();
const ProfileStack =()=>{
    return (
        <Stack.Navigator screenOptions={{
          headerShown: false
  }}>
          <Stack.Screen name="MainProf" component={Profile} />
          {/* <Stack.Screen name="Terms" component={Details} /> */}
        </Stack.Navigator>
    
      );
}
export default ProfileStack;