import React, { useState } from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Image
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign'
import IcAnt from 'react-native-vector-icons/AntDesign'
import { TextInput } from 'react-native-gesture-handler';
import IcFound from 'react-native-vector-icons/Foundation';
import Ic from 'react-native-vector-icons/Fontisto'
import Button from '../../components/Button/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Color } from '../../utils';

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
const Homes =()=>{
  const navigation = useNavigation();
const {width,height}=useWindowDimensions();
const [id,setId]=useState("0")
const renderItem=({ item })=>{
  return(
    <TouchableOpacity 
    onPress={()=>{setId(item.id)}}
    style={[styles.boxStyle,{backgroundColor: item.id==id ? '#475AD7': '#F3F4F6' }]}>
    <Text style={[styles.txtBoxStyle,{color: item.id == id ? "white":"#7C82A1" ,lineHeight:28}]}>{item.name}</Text>
       </TouchableOpacity>
  )
}

const renderItem2 =()=>{
  return(
    <TouchableOpacity>
    <ImageBackground  
        source={{uri:'https://1gr.cz/tempimg/fb/2022/8/PIT953c66_9SIS_ZAPORIZHZHIA_NUCLEAR_0804_11.JPG'}}
        style={styles.itemBack} 
        imageStyle={{ borderRadius: 12}}
        >  
        <View style={{width:'95%',alignItems:'flex-end'}}>
     <Ic name='favorite' size={25} color="white" ></Ic>
        </View>

        <View>
        <View style={{width:'100%',alignSelf:'center',paddingVertical:5}}>
        <Text style={{color:'#ACAFC352'}}>ISABEL VELLOSO</Text>
        </View>
        <View style={{width:'100%',alignSelf:'center',paddingVertical:5}}>
        <Text style={{color:'white'}}>Guerra Ucrania - Rusia, última hora: La central nuclear ucraniana</Text>
        </View>
        </View>
        

        </ImageBackground>
        </TouchableOpacity>
  )
}
const renderItem3=()=>{
  return(
    <View style={{width:'90%',flexDirection:'row',alignSelf:'center'}}>
    <Image style={{width:96,height:96,borderRadius:12}} source={{uri:'https://www.vol.at/2022/11/AKW-Beschuss-4-3-358713981049-1398x1049.jpg'}} />
    <View style={{paddingVertical:10,paddingHorizontal:5,width:'70%',justifyContent:'center'}}>
        <View style={{paddingVertical:5,paddingStart:5}}><Text>Jakub Svoboda</Text></View>
        <View style={{paddingVertical:5,paddingStart:5}}><Text>Student na Slovensku útočil sekerou na spolužáky - Novinky.cz</Text></View>
    </View>
  </View>
  )
}
return(
    <SafeAreaView style={[styles.cont,{width:width}]}>
       <View style={styles.titleView}>
<Text style={styles.titleStyle}>Browse</Text>
       </View>
       <View style={styles.descView}>
        <Text style={styles.desTitle}>Discover things of this world</Text>
       </View>
       <View style={styles.searchView}>
<TouchableOpacity style={styles.searchIcnView}>
  <IcAnt name='search1'  size={25} color='#7C82A1'/>
</TouchableOpacity>
<TextInput style={styles.txtInputStyle} />
<TouchableOpacity style={styles.microIcnView}>
  <IcFound name='microphone'  size={28} color='#7C82A1'/>
</TouchableOpacity>
       </View>

        <View style={[styles.flatView,{width:width}]}>    
        <FlatList
       
          data={category}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item=>item.id}
          />
        </View>

       <View style={styles.flatView2}>
        <FlatList
          data={category}
          renderItem={renderItem2}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item=>item.id}
          />
       </View>
        <View style={styles.footerTitle}>
        <Text style={{fontSize:20}}>Recommended for you</Text>
        <Text>See All</Text>
        </View>


        {/* 
        <View style={{width:'90%',flexDirection:'row',alignSelf:'center'}}>
          <Image style={{width:96,height:96,borderRadius:12}} source={{uri:'https://www.vol.at/2022/11/AKW-Beschuss-4-3-358713981049-1398x1049.jpg'}} />
          <View style={{paddingVertical:10,paddingHorizontal:5,width:'70%',justifyContent:'center'}}>
              <View style={{paddingVertical:5,paddingStart:5}}><Text>Jakub Svoboda</Text></View>
              <View style={{paddingVertical:5,paddingStart:5}}><Text>Student na Slovensku útočil sekerou na spolužáky - Novinky.cz</Text></View>
          </View>
        </View> 
        */}


       
        
          <Button onPress={()=>{
            AsyncStorage.removeItem('AccessToken');
            navigation.replace('AuthStack', {screen:'SignIn'})
          }} label={'Log Out'} style={styles.button} />
        
   
    </SafeAreaView>
)
}
export default Homes;
const styles =StyleSheet.create({
  button: {backgroundColor: Color.button},
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
searchView:{
flexDirection:'row',
  borderRadius:12,
  marginTop:32,
  alignSelf:'center',
  width:"90%",
  height:55,
  backgroundColor:'#F3F4F6'
},
searchIcnView:{
  alignSelf:'center',marginStart:8
},
txtInputStyle:{
  width:'80%',paddingHorizontal:10
},
microIcnView:{
  alignSelf:'center',marginStart:8
},
boxStyle:{
  width:90,
  height:36,
  backgroundColor:'#F3F4F6',
  borderRadius:12,
  justifyContent:'center',
  alignItems:'center',
  marginEnd:15,
  paddingHorizontal:5
    },
    txtBoxStyle:{
  fontSize:12,
  color:'#7C82A1'
    },
    flatView:{
      marginStart:"5%",
      paddingVertical:10,
      width:"100%",
      marginTop:10,
     flexDirection:'row',

    },
     flatView2:{
      marginTop:5,
      marginStart:"5%",
      
      flexDirection:'row',
   
      paddingVertical:10,
 
    },
    itemBack:{
     width:245,
     height:245,
      borderRadius:20,
      marginEnd:12,
      paddingHorizontal:18,
      paddingVertical:15,
justifyContent:'space-between'
    },
    footerTitle:{
      paddingVertical:10,
      width:'88%',
      alignSelf:'center',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
    }
})