import React, {useContext} from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import HomeStack from './stack/HomeStack';
import FavoriteScreen from '../screens/FavoriteScreen/FavoriteScreen';
import OfferStack from './stack/OfferStack';
import SettingStack from './stack/SettingStack';
import Icon from 'react-native-vector-icons/AntDesign';
import Ic from 'react-native-vector-icons/Fontisto';
import IcO from 'react-native-vector-icons/Octicons';
import CatIco from 'react-native-vector-icons/Feather';
import {AppProvider} from '../context/AppContext';
import FontAwesomeIc from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIconsIc from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIconsIc from 'react-native-vector-icons/SimpleLineIcons'
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
function BottomTab() {
  return (
    <AppProvider>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
         
          headerShown: false,
          tabBarIcon: ({focused, color}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Favorite') {
              iconName = focused ? 'star' : 'star';
            } else if (route.name === 'Offer') {
              iconName = focused ? 'ticket-percent' : 'ticket-percent';
            } else if (route.name === 'Setting') {
              iconName = focused ? 'menu' : 'menu';
            }

            return (
              <View
                style={{
                  width: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                 backgroundColor:'#FFFFFF'
                }}>
                {route.name === 'Home' ? (
                  <FontAwesomeIc name={iconName} size={23} color={color} />
                ) : route.name === 'Favorite' ? (
                  <FontAwesomeIc name={iconName} size={23} color={color} />
                ) : route.name === 'Offer' ? (
                  <MaterialCommunityIconsIc name={iconName} size={23} color={color} />
                ) : (
                  <SimpleLineIconsIc name={iconName} size={20} color={color} />
                )}
              </View>
            );
          },

          tabBarActiveTintColor: '#D54078',
          tabBarInactiveTintColor: '#7A7A7A',
          tabBarShowLabel: false,
          tabBarStyle: [
            {
              height: '9%',
              // borderTopEndRadius: 15,
              // borderTopStartRadius: 15,
              // borderWidth: 1,
              borderColor: '#ACAFC3',
              backgroundColor:'#FFFFFF'
            },
          ],
        })}>
        <Tab.Screen name="Home" component={HomeStack}
      //    options={({ route }) => ({
      //     tabBarStyle: ((route) => {
      //       const routeName = getFocusedRouteNameFromRoute(route) ?? ""
      //       console.log(routeName)
      //       if (routeName === 'DetailScreen') {
      //         return { display: 'flex' }
      //       }
      //       return
      //     })(route),
      //   })
      // }
        />
        <Tab.Screen name="Offer" component={OfferStack} />
        <Tab.Screen name="Favorite" component={FavoriteScreen} />
        <Tab.Screen name="Setting" component={SettingStack} />
      </Tab.Navigator>
    </AppProvider>
  );
}

export default BottomTab;
 