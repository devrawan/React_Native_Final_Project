import BottomTab from '../BottomTab';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const AppStack =()=>{
    return (
        <Stack.Navigator screenOptions={{
          headerShown: false
  }}>
          <Stack.Screen name="BottomTab" component={BottomTab} />
        </Stack.Navigator>
      );
}
export default AppStack;


