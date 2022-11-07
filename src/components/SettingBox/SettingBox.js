import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ic from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingBox = props => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        width: '90%',
        backgroundColor: `${props.color}`,
        height: 56,
        alignSelf: 'center',
        borderRadius: 12,
        alignItems: 'center',
        paddingHorizontal: 24,
        justifyContent: 'space-between',
        marginBottom: 16,
      }}
      onPress={() => {
        if (props.type === 'logout') {
          AsyncStorage.removeItem('AccessToken').then(() => {
            navigation.replace('AuthStack', {screen: 'SignIn'});
          });
        } else if (!!props.goTo.length) {
          navigation.navigate(props.goTo);
        }
      }}>
      <Text style={{color: `${props.txt}`, fontSize: 16}}>{props.name}</Text>
      {props.icon}
    </TouchableOpacity>
  );
};
export default SettingBox;
