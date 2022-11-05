import React from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import HomeStack from '../navigation/HomeStack';
import SaveList from '../screens/SaveScreen/Save';
import Profile from '../screens/ProfileScreen/Profile';
import Category from '../screens/CategoryScreen/Category';
import Icon from 'react-native-vector-icons/AntDesign'
import Ic from 'react-native-vector-icons/Fontisto'
import IcM from 'react-native-vector-icons/MaterialIcons'
import IcO from 'react-native-vector-icons/Octicons';
import CatIco from 'react-native-vector-icons/Feather'
function BottomTab() {
    const {width,height}=useWindowDimensions();
  return (
    // <Tab.Navigator screenOptions={{
    //     headerShown: false
    //   }} 
    //   >
    <Tab.Navigator
      initialRouteName="Homee"
      screenOptions={({route}) => ({
        headerShown:false,
        tabBarIcon: ({focused, color}) => {
          let iconName;
        

          if (route.name === 'Homee') {
            iconName = focused ? 'home' : 'home';
           
          }
          else if(route.name === 'Category'){
            iconName = focused ? 'grid' : 'grid';
        }
           else if (route.name === 'SaveList') {
            iconName = focused ? 'bookmark' : 'bookmark';
          
          } 
          else if (route.name === 'Profile') {
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
                {route.name=== 'Homee' ? <Icon name={iconName} size={28} color={color} /> : route.name==='Category' ? <CatIco name={iconName} size={30} color={color} /> : route.name==='SaveList' ?<Ic name={iconName} size={28} color={color} />  :<IcO name={iconName} size={28} color={color} /> }
             
             
            </View>
          );
        },

        tabBarActiveTintColor: "#475AD7",
  tabBarInactiveTintColor: "#ACAFC3",
  tabBarShowLabel: false,
  tabBarStyle: [
    {
        height:'11%',
     borderTopEndRadius:15,
     borderTopStartRadius:15,
     borderWidth:1,
     borderColor:'#ACAFC3'
     
    }
  ]

      })}
      >
      <Tab.Screen name="Homee" component={HomeStack} />
      <Tab.Screen name="Category" component={Category} />
      <Tab.Screen name="SaveList" component={SaveList} />
      <Tab.Screen name="Profile" component={Profile} />

    </Tab.Navigator>

  );
}

export default BottomTab;





