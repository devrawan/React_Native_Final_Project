import React ,{useEffect,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View,TouchableOpacity, Alert ,StatusBar,Platform} from 'react-native'
import FeatherIc from 'react-native-vector-icons/Feather';
import FontAwesomeIc from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import AntIc from 'react-native-vector-icons/AntDesign';
import MyStatusBar from '../../components/MyStatusBar';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import {images} from '../../constants/index';
import { WebView } from 'react-native-webview';


const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const PrivacyScreen = () => {
  const navigation = useNavigation();
  const {t,i18n} = useTranslation();
  const [pageTxt,setPageTxt]=useState('')
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
    // setPageTxt(textRes)
  };
  fetchData();
}, []);


const getPageText = async()=>{
  if(i18n.language === 'en'){
    var response = await axios.get(`https://xcobon.com/api/user/get_polices_page`,
    {
           headers: {
             language:'en',
           },
         },
      
       );
   }else{
    var response = await axios.get(`https://xcobon.com/api/user/get_polices_page`,
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
      <View style={{alignSelf:'center',width:'95%'}}>
      <Text style={{alignSelf:'center',fontSize:18,fontFamily:'Dubai-Bold',fontWeight:'500',color:'black'}}>{t('Privacy Policy')}</Text> 
      </View>
          {/* <TouchableOpacity style={{alignSelf:'flex-end',height:'100%',justifyContent:'center'}}>
            <FeatherIc name={'more-vertical'} size={20}  />
          </TouchableOpacity> */}
     
      </View>


      {/* <View style={{flex:1,width:'90%',alignSelf:'center'}}> */}
{/* <Text style={{alignSelf:'flex-start',fontSize:17,lineHeight:35,color:'#7A7A7A',textAlign:'left'}}> */}
{/* {t('PrivText')} */}
{/* {pageTxt}
</Text>
      </View> */}

<View style={{flex:1}}>
<WebView source={{ html: pageTxt}} />
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