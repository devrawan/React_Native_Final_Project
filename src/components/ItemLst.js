import React from 'react';

import { StyleSheet,StatusBar, Image,Text, View,TouchableOpacity} from 'react-native';
const ItemLst = ({item,onpres}) => (
    <TouchableOpacity 
    onPress={()=>onpres(item)}
    style={styles.warpView}>
  <Image source={item.img} style={styles.imView} resizeMode={'contain'}/>
  <Text style={{fontSize:16,fontWeight:'700',fontFamily:'Dubai-Bold'}}>{item.tit}</Text>
  </TouchableOpacity>
  );
  export default ItemLst;

const styles = StyleSheet.create({
 warpView:{
  width:'100%',height:70,backgroundColor:'red',
  shadowOffset: {width: 2, height: 1},
  shadowOpacity: 0.2,
  shadowRadius: 3,
  elevation: 9,
  shadowColor: 'gray',
  backgroundColor: 'white',
  marginBottom:1,
  flexDirection:'row'
  ,alignItems:'center',
  paddingHorizontal:20
 },
 imView:{
  width:20,height:20,marginEnd:10
 }
 
 
});
