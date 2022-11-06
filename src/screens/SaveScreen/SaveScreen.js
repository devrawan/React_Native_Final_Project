import React,{useContext}from 'react';
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
import SmallCard from '../../components/SmallCard/SmallCard';
import AppContext from '../../context/AppContext';
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
const SaveList =()=>{
  const {width,height}=useWindowDimensions();
  const {userCollection, savArray, setCollections, setSaveArray} =
  useContext(AppContext);

  const renderItem3=({item})=>{
    return(
     <SmallCard item={item} />
    )
  }
return(
  <SafeAreaView style={[styles.cont,{width:width}]}>
       <View style={styles.titleView}>
        <Text style={styles.titleStyle}>Bookmarks</Text>
       </View>
       <View style={styles.descView}>
        <Text style={styles.desTitle}>Saved articles to the library
         </Text>
       </View>

     
<FlatList
      style={styles.flatStyle}
          data={savArray}
     renderItem={renderItem3}
   showsVerticalScrollIndicator={false}
   keyExtractor={item=>item.id}
     />
       


    </SafeAreaView>
)
}
export default SaveList;
const styles =StyleSheet.create({
  cont:{
    flex:1,
    backgroundColor:'white',
  
  },
  titleView:{
    width:'100%',
    paddingHorizontal:20,
    paddingTop:15,
    paddingBottom:8
  },
  titleStyle:{
  fontSize:24
  },
  descView:{
    width:'100%',
    paddingHorizontal:20,
   
  },
  desTitle:{
  fontSize:16,
  color:'#7C82A1'
  },
emptyDataView:{
  width:'80%',alignSelf:'center',justifyContent:'center'
}
,
flatStyle:{
  paddingVertical:10,paddingHorizontal:5,marginTop:10
}

})