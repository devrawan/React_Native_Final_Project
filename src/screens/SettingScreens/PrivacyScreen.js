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
const PrivacyScreen = () => {
  const navigation = useNavigation();

  return (
<View style={styles.container}>
      <MyStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View style={[styles.appBar,{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:15}]}>
     <TouchableOpacity onPress={()=>{navigation.goBack()}}>
     <AntIc name='arrowleft' size={22} />
     </TouchableOpacity> 
      <View>
      <Text style={{alignSelf:'center',fontSize:18,fontFamily:'Dubai-Bold',fontWeight:'500'}}>Privacy Policy </Text> 
      </View>
          <TouchableOpacity style={{alignSelf:'flex-end',height:'100%',justifyContent:'center'}}>
            <FeatherIc name={'more-vertical'} size={20}  />
          </TouchableOpacity>
     
      </View>


      <View style={{flex:1,width:'90%',alignSelf:'center'}}>
<Text style={{alignSelf:'flex-start',fontSize:17,lineHeight:35,color:'#7A7A7A'}}>
This text is an example of text that can be replaced in the same text
  space, this text was generated from the generator of the Arabic text,
  Where you can generate such text or many texts
  Other in addition to increase
  If you need more paragraphs, the text generator allows you
  Elaraby Increase the number of paragraphs as you like, the text will not appear divided
  It does not contain linguistic errors, the Arabic text generator is useful for designers
  Websites in particular, where the customer needs a lot
.Sometimes to see a real picture of the design of the site
</Text>
      </View>
      </View>


  );
};

export default PrivacyScreen;
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