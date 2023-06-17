import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, TextInput, Button, ActivityIndicator, View, TouchableOpacity, Alert, StatusBar, Platform, ScrollView } from 'react-native'
import FeatherIc from 'react-native-vector-icons/Feather';
import FontAwesomeIc from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AntIc from 'react-native-vector-icons/AntDesign';
import MyStatusBar from '../../components/MyStatusBar';
// import axios from 'axios';
import instance from '../../axios_helper';
import { WebView } from 'react-native-webview';
import { images } from '../../constants/index';
import { useTranslation } from 'react-i18next';
import { deviceId, fcmToken } from '../../../src/screens/HomeScreens/HomeScreen';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;



const RegisterScreen = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const [title, setTitle] = useState(t('Register'));
  const [isRegisted, setIsRegisterd] = useState(false);


  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isPageInLoad, setIsPageInLoad] = useState(true);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {

    try{

      axios.get(`https://xcobon.com/api/profile`,
      {
        headers: {
          'deviceKey': deviceId,
          'fcm-token': fcmToken,
          'Content-Type': 'application/json',
          'accept': '*/*',
          'language': i18n.language == undefined ? "en" : i18n.language,
        }
      })
      .then((response) => {

        setName(response.data.data.name);
        setMobile(response.data.data.mobile);
        setEmail(response.data.data.email);

        setTitle(t('Update'));
        setIsPageInLoad(false);
        setIsRegisterd(true);

        console.log("response:  profile " , response.data)
      })
      .catch((error) => {
        setIsPageInLoad(false);
        
        console.log("error:  profile " , error.data)
      })
    }catch(error){
      setIsPageInLoad(false);
        
    }



  }, []);

 

  const saveOffer = async () => {

    await AsyncStorage.setItem('done_register2', "true");



    var hasErrors = false;
    var mErrors = {};
    if (name.trim() == '') {
      hasErrors = true;
      mErrors['name'] = true;
    } else {
      mErrors['name'] = false;
    }

    if (mobile.trim() == '') {
      hasErrors = true;
      mErrors['mobile'] = true;
    } else if (mobile.length != 9) {
      hasErrors = true;
      mErrors['mobile'] = true;
      alert(t('Mobile Field must be 9 digit'))
    } else {
      mErrors['mobile'] = false;
    }



    if (email.trim() == '') {
      hasErrors = true;
      mErrors['email'] = true;
    } else {
      mErrors['email'] = false;
    }


   
    setErrors(mErrors);
    if (hasErrors) {
      return;
    }


    setLoading(true);
    var body = {
      'name': name,
      'mobile': mobile,
      'email': email
    }

    console.log(JSON.stringify(body));


    axios.post(
      `https://xcobon.com/api/register`,
      body,
      {
        headers: {
          'deviceKey': deviceId,
          'fcm-token': fcmToken,
          'Content-Type': 'application/json',
          'accept': '*/*',

          'language': i18n.language == undefined ? "en" : i18n.language,
        }
      }

    )
      .then(response => {

        console.log("response : ", response);
        navigation.pop();
        alert('Success')

      })
      .catch(error => {
        console.log("error ", error);
        setLoading(false);
        alert(`${error.response.data.message}`)

      })
  };


  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />


      <View style={styles.appBar}>
        <TouchableOpacity
          style={{ width: '20%', height: '100%', alignSelf: 'flex-start', justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            navigation.goBack();
          }}>
          <AntIc
            name={i18n.language === 'en' ? 'arrowleft' : 'arrowright'}
            size={22}
          />
        </TouchableOpacity>
        <View style={{ width: '80%', height: '100%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
          <Text
            style={{ fontSize: 18, color: 'black', fontFamily: 'Dubai-Bold', fontWeight: '500' }}>
            {title}
          </Text>
        </View>

        <View style={{ width: '20%', height: '100%', alignSelf: 'flex-start', justifyContent: 'center', alignItems: 'center' }} >

        </View>
      </View>

      {
        isPageInLoad 
        ?
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center', 
          alignContent: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <ActivityIndicator />
        </View>
        :
        <ScrollView>
        <View style={{ flex: 1, padding: 20 }}>

          <View style={errors['name'] ? styles.shaddoBoxError : styles.shaddoBox}>

            <TextInput
              textAlign={(i18n.language == undefined ? "en" : i18n.language) == 'en' ? 'left' : 'right'}

              style={{
                borderRadius: 10,
                elevation: 2,
                backgroundColor: "white",
                width: '100%',
                placeholderTextColor: 'black',
                padding: 12,
              }}
              value={name}
              onChangeText={(val) => {
                var currentErrors = Object.assign({}, errors);
                currentErrors['name'] = false;
                setErrors(currentErrors);
                setName(val);
              }}
              placeholderTextColor="gray"
              placeholder={t('Name')} />
          </View>

          <View style={errors['mobile'] ? styles.shaddoBoxError : styles.shaddoBox}>

            <TextInput
              textAlign={(i18n.language == undefined ? "en" : i18n.language) == 'en' ? 'left' : 'right'}

              style={{
                borderRadius: 10,
                elevation: 2,
                backgroundColor: "white",
                padding: 12,
                width: '100%',
              }}
              value={mobile}
              onChangeText={(val) => {
                var currentErrors = Object.assign({}, errors);
                currentErrors['mobile'] = false;
                setErrors(currentErrors);
                setMobile(val)
              }}
              keyboardType='number-pad'
              placeholderTextColor="gray"
              placeholder={t('Mobile')} />
          </View>

          <View style={errors['email'] ? styles.shaddoBoxError : styles.shaddoBox}>

            <TextInput
              textAlign={(i18n.language == undefined ? "en" : i18n.language) == 'en' ? 'left' : 'right'}

              style={{
                borderRadius: 10,
                elevation: 2,
                width: '100%',
                backgroundColor: "white",
                padding: 12,
                width: '100%',
              }}
              value={email}
              keyboardType='email-address'
              placeholderTextColor="gray"
              onChangeText={(val) => {
                var currentErrors = Object.assign({}, errors);
                currentErrors['email'] = false;
                setErrors(currentErrors);
                setEmail(val);
              }}
              placeholder={t('Email')} />
          </View>



          <View style={{ marginTop: 40 }}>

            <TouchableOpacity
              disabled={loading}
              style={{
                width: '100%',
                padding: 12,
                backgroundColor: loading ? '#89979D' : '#29B1E5',
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={async () => await saveOffer()}
              underlayColor='#fff'>
              <Text style={{ color: '#fff', fontSize: 22 }}>{title}</Text>
            </TouchableOpacity>

          </View>


              {
                isRegisted 
                ?
                  <></>
                :
                <View style={{ marginTop: 20 }}>

                <TouchableOpacity
                  style={{
    
                    padding: 12,
                    backgroundColor: 'white',
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  onPress={async () => {
                    await AsyncStorage.setItem('done_register2', "true");
                    navigation.pop();
                  }}
                  underlayColor='#fff'>
                  <Text style={{ color: 'black', fontSize: 16 }}>{t('skip')}</Text>
                </TouchableOpacity>
    
              </View>
               
              }

          

        </View>
      </ScrollView>
      }


    </View>
  );
};

export default RegisterScreen;
const styles = StyleSheet.create({
  box: {
    shadowRadius: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 0,
    marginTop: 5,
    borderRadius: 5,
  },
  shaddoBox: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    flexDirection: 'row',
    elevation: 1, // for Android
    backgroundColor: '#fff',
    padding: 0,
    marginTop: 20,
    borderRadius: 5,
  },
  shaddoBoxError: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    borderColor: 'red',
    borderWidth: 1,
    elevation: 1, // for Android
    backgroundColor: '#fff',
    padding: 0,
    marginTop: 20,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    height: APPBAR_HEIGHT,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 12,

  },
  content: {
    backgroundColor: '#FFFFFF'

  },



  radio_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    paddingHorizontal: 10,

    paddingVertical: 10,
    borderWidth: 1,

    borderRadius: 20,
    borderColor: '#ccc',
    marginRight: 10,
  },
  selected: {
    backgroundColor: '#D54078',
    color: 'white'
  },
  radioText: {
    paddingHorizontal: 10,
    color: '#333',
  },
});