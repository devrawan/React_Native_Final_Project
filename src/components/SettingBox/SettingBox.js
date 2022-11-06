import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ic from 'react-native-vector-icons/MaterialIcons';

const SettingBox =(props)=>{
  const navigation = useNavigation();

return(
    <TouchableOpacity style={{flexDirection:'row',width:"90%",backgroundColor:'#F3F4F6',height:56,alignSelf:'center',borderRadius:12,alignItems:'center',paddingHorizontal:24,justifyContent:'space-between',marginBottom:16}}> 
    <Text style={{color:'#666C8E',fontSize:16}}>{props.name}</Text>
    {props.icon}
    </TouchableOpacity>
)
}
export default SettingBox;