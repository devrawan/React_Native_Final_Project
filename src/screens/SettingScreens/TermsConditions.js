import React,{useEffect,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View,TouchableOpacity, Alert ,StatusBar,Platform, ScrollView} from 'react-native'
import FeatherIc from 'react-native-vector-icons/Feather';
import FontAwesomeIc from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import AntIc from 'react-native-vector-icons/AntDesign';
import MyStatusBar from '../../components/MyStatusBar';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import {images} from '../../constants/index';
import {useTranslation} from 'react-i18next';
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;



const TermsConditions = () => {
  const navigation = useNavigation();
  const {t,i18n} = useTranslation();
  const [pageTxt,setPageTxt]=useState('');
  const customHTML = `
  <body style="display:flex; flex-direction: column;justify-content: center; 
    align-items:center; background-color: black; color:red; height: 100%;">
      <h1 style="font-size:100px; padding: 50px; text-align: center;" 
      id="h1_element">
        This is simple html
      </h1>
      <h2 style="display: block; font-size:80px; padding: 50px; 
      text-align: center;" id="h2_element">
        This text will be changed later!
      </h2>
   </body>`;
  useEffect(() => {
    const fetchData = async () => {
    var textRes = await getPageText();
    var finaltext = "";
    finaltext += "<html>";
    finaltext += "<head>";
    finaltext += '<meta name="viewport" content="width=device-width, initial-scale=1" />';
    finaltext += "</head>";

    finaltext += "<body>";
    finaltext += textRes;
    finaltext += "</body>";
    finaltext+= "</html>";
    
    console.log(finaltext);
    setPageTxt(finaltext)
  };
  fetchData();
}, []);


const getPageText = async()=>{
  if(i18n.language === 'en'){
    var response = await axios.get(`https://xcobon.com/api/user/get_rules_page`,
    {
           headers: {
             language:'en',
           },
         },
      
       );
   }else{
    var response = await axios.get(`https://xcobon.com/api/user/get_rules_page`,
    {
           headers: {
             language:'ar',
           },
         },
      
       );
   }
   
       return response.data.page.text;
}
  return (
<View style={styles.container}>
      <MyStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View style={[styles.appBar,{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:15}]}>
        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
            <AntIc name= {i18n.language === 'en' ? 'arrowleft' : 'arrowright'}  size={22}/>
        </TouchableOpacity> 
        <View style={{width:'95%'}}>
             <Text style={{alignSelf:'center',fontSize:18,fontFamily:'Dubai-Bold',fontWeight:'500',color:'black'}}> {t('Terms and Conditions')}</Text> 
        </View>
      </View>
      <View style={{flex:1}}>
         <WebView source={{ html: pageTxt}} />
      </View>

 </View>


  );
};

export default TermsConditions;
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