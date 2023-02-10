import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View,TouchableOpacity, Alert ,StatusBar,Platform} from 'react-native'
import FeatherIc from 'react-native-vector-icons/Feather';
import FontAwesomeIc from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import AntIc from 'react-native-vector-icons/AntDesign';
import MyStatusBar from '../../components/MyStatusBar';

import {images} from '../../constants/index';
import {useTranslation} from 'react-i18next';
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;



const ContactUsScreen = () => {
  const navigation = useNavigation();
  const {t,i18n} = useTranslation();
  return (
<View style={styles.container}>
      <MyStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View style={[styles.appBar,{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:15}]}>
      <TouchableOpacity onPress={()=>{navigation.goBack()}}>
     <AntIc name= {i18n.language === 'en' ? 'arrowleft' : 'arrowright'}  size={22}/>
      </TouchableOpacity> 
      <View style={{width:'95%'}}>
      <Text style={{alignSelf:'center',fontSize:18,fontFamily:'Dubai-Bold',fontWeight:'500',color:'black'}}> {t('Contact Us')}</Text> 
      </View>
        
     
      </View>


      <View style={{flex:1,width:'90%',alignSelf:'center'}}>
<Text style={{alignSelf:'flex-start',fontSize:17,lineHeight:35,color:'#7A7A7A',textAlign:'left'}}>
{t('ContactText')}
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