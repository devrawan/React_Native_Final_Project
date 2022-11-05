import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
const SmallCard =()=>{
return(
    <TouchableOpacity style={{width:'90%',flexDirection:'row',alignSelf:'center',marginVertical:10}}>
    <Image style={{width:85,height:85,borderRadius:12}} source={{uri:'https://www.vol.at/2022/11/AKW-Beschuss-4-3-358713981049-1398x1049.jpg'}} />
    <View style={{paddingVertical:6,paddingHorizontal:5,width:'70%',justifyContent:'center'}}>
        <View style={{paddingVertical:0,paddingStart:5,height:20}}><Text style={{color:'#7C82A1'}}>UI/UX Design</Text></View>
        <View style={{paddingVertical:3,paddingStart:5}}><Text style={{fontSize:16}}>Creating Color Palette from world around you</Text></View>
    </View>
  </TouchableOpacity>
)
}
export default SmallCard;