import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View,TouchableOpacity, Alert ,StatusBar,Platform} from 'react-native'
import FeatherIc from 'react-native-vector-icons/Feather';
import FontAwesomeIc from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import AntIc from 'react-native-vector-icons/AntDesign';
import MyStatusBar from '../../components/MyStatusBar';

import {images} from '../../constants/index';


const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const ContactUsScreen = () => {
  const navigation = useNavigation();

  return (
<View style={styles.container}>
      <MyStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View style={[styles.appBar,{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:15}]}>
     <TouchableOpacity onPress={()=>{navigation.goBack()}}>
     <AntIc name='arrowleft' size={22} />
     </TouchableOpacity> 
      <View>
      <Text style={{alignSelf:'center',fontSize:18,fontFamily:'Dubai-Bold',fontWeight:'500'}}>Contact Us  </Text> 
      </View>
          <TouchableOpacity style={{alignSelf:'flex-end',height:'100%',justifyContent:'center'}}>
            <FeatherIc name={'more-vertical'} size={20}  />
          </TouchableOpacity>
     
      </View>


      <View style={{flex:1,width:'90%',alignSelf:'center'}}>
<Text style={{alignSelf:'flex-start',fontSize:17,lineHeight:35,color:'#7A7A7A'}}>
Hence, the designer must put temporary texts on
  Design to show the client the full form, the role of the text generator
  Al-Arabi saves the designer from the trouble of searching for an alternative text
  It has a relationship with the topic that the design is talking about, and it appears in a form
.dose not fit

  This text can be superimposed on any design without a problem
  It will not look like copied, unstructured, unformatted text, or even
.Not understood. Because it is still an alternative and temporary text
</Text>
      </View>
      </View>


  );
};

export default ContactUsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFFFFF'
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: '#FFFFFF',
    height: APPBAR_HEIGHT,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',




  },
  content: {
    backgroundColor:'#FFFFFF'
 
  },
});