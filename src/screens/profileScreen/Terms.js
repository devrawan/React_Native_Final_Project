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
import SmallCard from '../../components/SmallCard';
const category=[
  {id:"0",name:"General"},
  {id:"1",name:"Entertainment"},
  {id:"2",name:"Business"},
  {id:"3",name:"Health"},
  {id:"4",name:"Science"},
  {id:"5",name:"Sports"},
  {id:"6",name:"Technology"},
  {id:"7",name:"Technology"},
]
const Terms =()=>{
  const {width,height}=useWindowDimensions();
 
return(
  <SafeAreaView style={[styles.cont,{width:width}]}>
       <View style={styles.titleView}>
        <Text style={styles.titleStyle}>Bookmarks</Text>
       </View>
 </SafeAreaView>
       )}
       
       export default Terms;