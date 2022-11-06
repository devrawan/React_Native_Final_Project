import React, {useContext} from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import HomeStack from '../navigation/stack/HomeStack';
import SaveList from '../screens/SaveScreen/SaveScreen';
import Profile from '../screens/profileScreen/ProfileScreen';
import Category from '../screens/CategoryScreen/CategoryScreen';
import Icon from 'react-native-vector-icons/AntDesign';
import Ic from 'react-native-vector-icons/Fontisto';
import IcO from 'react-native-vector-icons/Octicons';
import CatIco from 'react-native-vector-icons/Feather';
import {AppProvider} from '../context/AppContext';
import ProfileStack from '../navigation/stack/ProfileStack';
import ProfileScreen from '../screens/profileScreen/ProfileScreen'
function BottomTab() {
  return (
    <AppProvider>
      <Tab.Navigator
        initialRouteName="Homee"
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color}) => {
            let iconName;
            if (route.name === 'Homee') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Category') {
              iconName = focused ? 'grid' : 'grid';
            } else if (route.name === 'SaveList') {
              iconName = focused ? 'bookmark' : 'bookmark';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person';
            }

            return (
              <View
                style={{
                  width: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 5,
                  marginTop: 10,
                }}>
                {route.name === 'Homee' ? (
                  <Icon name={iconName} size={28} color={color} />
                ) : route.name === 'Category' ? (
                  <CatIco name={iconName} size={30} color={color} />
                ) : route.name === 'SaveList' ? (
                  <Ic name={iconName} size={28} color={color} />
                ) : (
                  <IcO name={iconName} size={28} color={color} />
                )}
              </View>
            );
          },

          tabBarActiveTintColor: '#475AD7',
          tabBarInactiveTintColor: '#ACAFC3',
          tabBarShowLabel: false,
          tabBarStyle: [
            {
              height: '11%',
              borderTopEndRadius: 15,
              borderTopStartRadius: 15,
              borderWidth: 1,
              borderColor: '#ACAFC3',
            },
          ],
        })}>
        <Tab.Screen name="Homee" component={HomeStack} />
        <Tab.Screen name="Category" component={Category} />
        <Tab.Screen name="SaveList" component={SaveList} />
        <Tab.Screen name="Profile" component={ProfileStack} />
      </Tab.Navigator>
    </AppProvider>
  );
}

export default BottomTab;
