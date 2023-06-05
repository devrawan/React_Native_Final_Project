import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AntIc from 'react-native-vector-icons/AntDesign';
import MyStatusBar from '../../components/MyStatusBar';
import {images} from '../../constants/index';
import FeatherIc from 'react-native-vector-icons/Feather';
import {useTranslation} from 'react-i18next';
import ItemLst from '../../components/ItemLst';
import {useNavigation} from '@react-navigation/native';
import RNRestart from 'react-native-restart';
import {
  StyleSheet,
  AppRegistry,
  Platform,
  SafeAreaView,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
  useWindowDimensions,
  FlatList,
  Image,
  Pressable,
  ImageBackground,
  I18nManager
} from 'react-native';
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const SettingScreen = () => {
  const navigation = useNavigation();
  const {t, i18n} = useTranslation();
  const items = [
    {id: 0,tit: `${t('Main')}`, img: images.main, scren: 'Home',},
    {id: 1, tit: `${t('Favorite')}`, img: images.fav, scren: 'Favorite'},
    // {id: 2, tit: `${t('Pay Book')}`, img: images.pay},
    // {id: 3, tit: `${t('Blog')}`, img: images.blog},
    // {id: 4, tit: `${t('Change Password')}`, img: images.pass, scren: ''},
    {id: 5, tit: `${t('Privacy Policy')}`, img: images.priv, scren: 'PrivacyScreen'},
    // {id: 6, tit: `${t('Call Us')}`, img: images.contact, scren: 'ContactUsScreen'},
    {id:8,tit:`${t('Terms and Conditions')}`, img: images.priv,scren:'TermsConditions'},
    {id: 7, tit: `${t('Change Lnaguage')}`, img: images.worldIc, scren: ''},

  ];
//funcSetting
  const navToPrivcy = item => {
    console.log(item);
    if(item.id == 7){
      console.log("current language " , i18n.language)

      i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar').then(()=>{

        I18nManager.forceRTL(i18n.language === 'ar' );
        RNRestart.Restart();
      })

    }else{
      navigation.navigate(item.scren);
    }
  
  };
  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View
        style={[
          styles.appBar,
          {
            width: '100%',
            flexDirection: 'row',

            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        <View style={{width: '95%'}}>
          <Text
            style={{
              alignSelf: 'center',
              color: 'black',
              fontSize: 18,
              fontFamily: 'Dubai-Bold',
              fontWeight: '500',
            }}>
            {t('Settings')}
          </Text>
        </View>
      </View>

     <View style={{flex:1}}>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ItemLst item={item} onpres={navToPrivcy} />}
      />
        </View>
    </View>
  );
};

export default SettingScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    shadowOffset: {height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 9,
    shadowColor: 'gray',
    backgroundColor: 'white',
    marginBottom: 3,
  },
  content: {
    backgroundColor: '#FFFFFF',
  },
});
