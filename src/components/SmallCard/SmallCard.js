import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SmallCard =({item})=>{
  const navigation = useNavigation();

return(
    <TouchableOpacity 
    onPress={()=>{ navigation.navigate('Details',{item:item});}}
    style={{width:'90%',flexDirection:'row',alignSelf:'center',marginVertical:10}}>
    <Image style={{width:85,height:85,borderRadius:12}} source={{uri:item.urlToImage}} />
    <View style={{paddingVertical:6,paddingHorizontal:5,width:'70%',justifyContent:'center'}}>
        <View style={{paddingVertical:0,paddingStart:5,height:20}}><Text style={{color:'#7C82A1'}}>{item.source.name}</Text></View>
        <View style={{paddingVertical:3,paddingStart:5}}><Text style={{fontSize:16}}>{`${item.title}`.substring(0,34)}</Text></View>
    </View>
  </TouchableOpacity>
)
}
export default SmallCard;