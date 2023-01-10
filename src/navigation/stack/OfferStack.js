import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OfferScreen from '../../screens/OfferScreens/OfferScreen';
import DetScreen from '../../screens/OfferScreens/DetScreen';
const Stack = createNativeStackNavigator();
const OfferStack =()=>{
    return (
        <Stack.Navigator screenOptions={{
          headerShown: false
  }}>
          <Stack.Screen name="OfferScreen" component={OfferScreen} />
          <Stack.Screen name="DetScreen" component={DetScreen} />

        </Stack.Navigator>
      );
}
export default OfferStack;