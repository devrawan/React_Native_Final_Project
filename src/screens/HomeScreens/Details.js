import React from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
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
<Ic name='arrow-back' size={25} color={'#7C82A1'}/>
<Icc name='favorite' size={22} style={{width:18}}  color="#7C82A1" />

    </View>
    <Image source={{uri:'https://media4.s-nbcnews.com/i/newscms/2019_01/2705191/nbc-social-default_b6fa4fef0d31ca7e8bc7ff6d117ca9f4.png'}} 
    style={{marginTop:10,width:350,height:199,alignSelf:'center',borderRadius:16}} />
    <View style={{width:'90%',alignSelf:'center',marginVertical:10,paddingHorizontal:5,marginTop:25}}>
    <TouchableOpacity style={{width:100,height:32,backgroundColor:'#475AD7',borderRadius:16,justifyContent:'center',alignItems:'center',paddingVertical:8}}>
      <Text style={{color:'white'}}>
      US Election
      </Text>
    </TouchableOpacity>
    </View>
   <View style={{width:'90%',alignSelf:'center',paddingHorizontal:5,paddingEnd:10}}>
<Text style={{fontSize:20,fontWeight:'500',lineHeight:28}}>The latest situation in the {`\n`} presidential election</Text>
   </View>
   <View style={{width:'90%',alignSelf:'center',flexDirection:'row',paddingHorizontal:8,paddingVertical:20}}>
<Image 
style={{width:48,height:48,borderRadius:24}}
source={{uri:'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}}/>
<View style={{width:'80%',paddingHorizontal:10}}>
  <View style={{height:25,justifyContent:'center'}}><Text>John Doe</Text></View>
  <View style={{}}><Text style={{color:'#7C82A1'}}>Designer</Text></View>
</View>
   </View>

<View style={{width:'90%',alignSelf:'center',paddingHorizontal:10,marginTop:10,paddingBottom:30}}>
<Text style={{fontSize:16}}>Results</Text>

  <View style={{height:'60%',paddingBottom:30}}>
  <ScrollView showsVerticalScrollIndicator={false}>
  <Text style={{color:'#666C8E',fontSize:16,lineHeight:24,paddingVertical:5}}>
Leads in individual states may change from one party to another as all the votes are counted. Select a state for detailed results, and select the Senate, House or Governor tabs to view those races.
{`\n`}
For more detailed state results click on the States A-Z links at the bottom of this page. Results source: NEP/Edison via Reuters. Leads in individual states may change from one party to another as all the votes are counted. Select a state for detailed results, and select the Senate, House or Governor tabs to view those races.
 For more detailed state results click on the States A-Z links at the bottom of this page. Results source: NEP/Edison via Reuters.
 </Text>
  


</ScrollView>
</View>
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
   width:'93%',
  //  backgroundColor:'pink' 
  }
})
