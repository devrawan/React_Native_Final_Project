import React ,{useEffect,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, ActivityIndicator,View,TouchableOpacity, Alert ,StatusBar,Platform} from 'react-native'
import FeatherIc from 'react-native-vector-icons/Feather';
import FontAwesomeIc from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import AntIc from 'react-native-vector-icons/AntDesign';
import MyStatusBar from '../../components/MyStatusBar';
import {useTranslation} from 'react-i18next';
// import axios from 'axios';
import instance from '../../axios_helper';
import {images} from '../../constants/index';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { deviceId, fcmToken } from '../../../src/screens/HomeScreens/HomeScreen';



const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const PrivacyScreen = () => {
  const navigation = useNavigation();
  const {t,i18n} = useTranslation();
  const [pageTxt,setPageTxt]=useState(null)
  useEffect(() => {
    const fetchData = async () => {
    var textRes = await getPageText();

    var finaltext = "";
    finaltext += `<html dir=${i18n.language == 'en' ? 'ltr' : 'rtl'}>`;
    finaltext += "<head>";
    finaltext += '<meta name="viewport" content="width=device-width, initial-scale=1" />';
    finaltext += "</head>";

    finaltext += "<body >";
    finaltext += textRes;
    finaltext += "</body>";
    finaltext+= "</html>";
    
    console.log(finaltext);
    setPageTxt(finaltext)
    // setPageTxt(textRes)
  };
  fetchData();
}, []);


const getPageText = async ()=>{
    var response = await axios.get(`https://xcobon.com/api/get_polices_page`,
    {
           headers: {
            deviceKey: deviceId,
            'fcm-token': fcmToken,
            language: i18n.language == undefined ? 'en' : i18n.language,
             
           },
         },
      
       );
   
   
       return response.data.data.text;
}
  return (
<View style={styles.container}>
      <MyStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      {/* <View style={[styles.appBar,{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:15}]}>
      <TouchableOpacity onPress={()=>{navigation.goBack()}}>
     <AntIc name= {i18n.language === 'en' ? 'arrowleft' : 'arrowright'}  size={22}/>
      </TouchableOpacity> 
      <View style={{alignSelf:'center',width:'95%'}}>
      <Text style={{alignSelf:'center',fontSize:18,fontFamily:'Dubai-Bold',fontWeight:'500',color:'black'}}>{t('Privacy Policy')}</Text> 
      </View>

      </View> */}

<View style={styles.appBar}>
        <TouchableOpacity
      style={{width:'20%',height:'100%',alignSelf:'flex-start',justifyContent:'center',alignItems:'center'}}
          onPress={() => {
            navigation.goBack();
          }}>
          <AntIc
            name={i18n.language === 'en' ? 'arrowleft' : 'arrowright'}
            size={22}
            color={'black'}
          />
        </TouchableOpacity>
        <View style={{width:'80%',height:'100%',justifyContent: 'center', alignItems: 'center',alignSelf:'center'}}>
          <Text
            style={{fontSize: 18, color:'black', fontFamily: 'Dubai-Bold', fontWeight: '500'}}>
            {t('Details')}
          </Text>
        </View>
        <View
      style={{width:'20%',height:'100%',alignSelf:'flex-start',justifyContent:'center',alignItems:'center'}}
         >
         
        </View>
      </View>

<View style={{flex:1}}>
  {pageTxt != null ?<WebView source={{ html: pageTxt}} /> :
<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
<ActivityIndicator color={'#D54078'}/>
  </View>
  }

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
    width:'100%',
    backgroundColor: '#FFFFFF',
    height: APPBAR_HEIGHT,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
   
    marginBottom: 12,




  },
  content: {
    backgroundColor:'#FFFFFF'
 
  },
});