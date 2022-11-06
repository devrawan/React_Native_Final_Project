import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homes from '../screens/HomeScreens/Homes';
import Details from '../screens/HomeScreens/Details';

const Stack = createNativeStackNavigator();
const HomeStack =()=>{
    return (
        <Stack.Navigator screenOptions={{
          headerShown: false
  }}>
          <Stack.Screen name="HomeC" component={Homes} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
    
      );
}
export default HomeStack;
