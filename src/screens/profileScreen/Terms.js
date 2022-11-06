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
import Ic from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

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
  const navigation = useNavigation();

return(
  <SafeAreaView style={{flex:1,width:width}}>
       <View style={{width:'92%',alignSelf:'center',flexDirection:'row',marginTop:15,justifyContent:'center'}}>
       <Ic
       style={{alignSelf:'center'}}
          name="arrow-back"
          size={25}
          color={'#7C82A1'}
          onPress={() => navigation.navigate('MainProf')}
        />
        <View style={{alignSelf:'center',alignItems:'center',width:'90%'}}>
          <Text style={{fontSize:24}}>Terms & Conditions</Text>
        </View>
       </View>
       <ScrollView style={{width:'90%',alignSelf:'center',paddingVertical:25}}>
        <Text style={{fontSize:16,lineHeight:24,color:'#7C82A1'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. {`\n \n`}Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, {`\n \n`}eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.{`\n \n`} Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</Text>
       </ScrollView>

 </SafeAreaView>
       )}
       
       export default Terms;