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
import Ic from 'react-native-vector-icons/Ionicons'
import Icc from 'react-native-vector-icons/Fontisto'

const Details =()=>{
  const {width,height}=useWindowDimensions();
return(
  <SafeAreaView style={[styles.cont,{width:width}]}>
    <View style={styles.headerView}>
<Ic name='arrow-back' size={18} color={'#7C82A1'}/>
<Icc name='favorite' size={20} color="#7C82A1" />

    </View>
    
    </SafeAreaView>
)
}
export default Details;
const styles =StyleSheet.create({
  cont:{
    flex:1,
    backgroundColor:'white',

  },
  headerView:{
    paddingVertical:10,
    paddingHorizontal:10,
    justifyContent:'space-between',
    alignSelf:'center',
    flexDirection:'row',
   width:'90%',
   backgroundColor:'pink' 
  }
})

