
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
import AppStack from './src/navigation/AppStack';
const category=[
  {id:"0",name:"Business"},
  {id:"1",name:"Entertainment"},
  {id:"2",name:"General"},
  {id:"3",name:"Health"},
  {id:"4",name:"Science"},
  {id:"5",name:"Sports"},
  {id:"6",name:"Technology"},
  {id:"7",name:"Technology"},
]
const App = () => {
  const {height, width} = useWindowDimensions();
  const renderItem=({ item })=>{
    return(
      <TouchableOpacity style={styles.boxStyle}>
      <Text style={styles.txtBoxStyle}>{item.name}</Text>
         </TouchableOpacity>
    )
  }
  return (
    <AppStack />
    // <SafeAreaView>
    //   <Text>app </Text>
    // </SafeAreaView>
//     <SafeAreaView style={[styles.cont,{width:width}]}>

//     <View style={styles.titleView}>
//       <Text style={styles.txtStyle}>Select your favorite topics</Text>
//     </View>
//     <View style={styles.desView}>
//       <Text style={styles.desStyle}>Select some of your favorite topics to let us suggest better news for you.</Text>
//     </View>
//   <View style={styles.flatStyle}>
//   <FlatList
//   centerContent={true}
//     data={category}
//     renderItem={renderItem}
//     numColumns={2}
//     keyExtractor={item=>item.id}
//     />
//   </View>
 

// <TouchableOpacity style={styles.btnBox}>
// <Text style={styles.txtBox}>Next</Text>
// </TouchableOpacity>


//     </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cont:{
  flex:1,
  },
  titleView:{
    marginTop:10,
    backgroundColor:'white',
    paddingHorizontal:23,
    paddingBottom:8,
    paddingTop:15
  },
  txtStyle:{
    fontSize:24
  },
  desView:{
paddingHorizontal:23,
paddingTop:5,
paddingBottom:10
  },
  desStyle:{
    fontSize:16,
    color:'#7C82A1'
  },
  boxStyle:{
    width:160,
    height:70,
    backgroundColor:'#F3F4F6',
    borderRadius:12,
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:8,
    marginBottom:15
  },
  txtBoxStyle:{
    fontSize:16,
    color:'black',
    // color:'#666C8E'
  },
  flatStyle:{
    
  paddingVertical:10,
   width:"100%",
   paddingStart:15,
   marginTop:10,
flexDirection:'row',
justifyContent:'center'
  
  
  },
  btnBox:{
    width:338,
    height:56,
    backgroundColor:'#475AD7',
    borderRadius:12,
    flexDirection:'row',
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    marginVertical:5
  },
  txtBox:{
    fontSize:16,color:'white'
  },
 
});

export default App;
