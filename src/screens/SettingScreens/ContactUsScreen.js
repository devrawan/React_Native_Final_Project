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
import { deviceId, fcmToken } from '../../../App';
import axios from 'axios';
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;



const ContactUs = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {

  }, []);

  function getCurrentDay() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    return formattedDate;
  }

  function getNextWeak() {
    const currentDate = new Date();
    const nextWeekDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); // Add 7 days (in milliseconds)

    const formattedDate = nextWeekDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formattedDate;
  }

  const saveOffer = () => {




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
      alert('Mobile Field must be 9 digit')
    }else {
      mErrors['mobile'] = false;
    }
  


    if (email.trim() == '') {
      hasErrors = true;
      mErrors['email'] = true;
    } else {
      mErrors['email'] = false;
    }


    if (title.trim() == '') {
      hasErrors = true;
      mErrors['title'] = true;
    } else {
      mErrors['title'] = false;
    }

    if (details.trim() == '') {
      hasErrors = true;
      mErrors['details'] = true;
    } else {
      mErrors['details'] = false;
    }
    setErrors(mErrors);
    if (hasErrors) {
      return;
    }


    setLoading(true);
    var body = {
      'name': name,
      'mobile': mobile,
      'email': email,
      'title': title,
      'details': details
    }

    console.log(JSON.stringify(body));


    axios.post(
      `https://xcobon.com/api/contact_us`,
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
            {t('Contact US')}
          </Text>
        </View>

        <View style={{ width: '20%', height: '100%', alignSelf: 'flex-start', justifyContent: 'center', alignItems: 'center' }} >

        </View>
      </View>

      <ScrollView>
        <View style={{ flex: 1, padding: 20 }}>

          <View style={errors['name'] ? styles.shaddoBoxError : styles.shaddoBox}>

            <TextInput
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

          <View style={errors['title'] ? styles.shaddoBoxError : styles.shaddoBox}>

            <TextInput
              style={{
                borderRadius: 10,
                elevation: 2,
                backgroundColor: "white",
                padding: 12,
                width: '100%',
              }}
              value={title}

              placeholderTextColor="gray"
              onChangeText={(val) => {
                var currentErrors = Object.assign({}, errors);
                currentErrors['title'] = false;
                setErrors(currentErrors);
                setTitle(val)
              }}
              placeholder={t('Title')} />
          </View>





          <View style={errors['details'] ? styles.shaddoBoxError : styles.shaddoBox}>

            <TextInput
              multiline={true}
              style={{
                verticalAlign: 'top',
                textAlignVertical: 'top',
                borderRadius: 10,
                elevation: 2,
                minHeight: 100,
                paddingTop:10,
                width: '100%',
                backgroundColor: "white",
                padding: 12,
              }}

              placeholderTextColor="gray"
              value={details}
              onChangeText={(val) => {
                var currentErrors = Object.assign({}, errors);
                currentErrors['details'] = false;
                setErrors(currentErrors);
                setDetails(val)
              }}
              placeholder={t('Details')} />
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
              onPress={() => saveOffer()}
              underlayColor='#fff'>
              <Text style={{ color: '#fff', fontSize: 22 }}>{t('Add')}</Text>
            </TouchableOpacity>

          </View>

        </View>
      </ScrollView>
    </View>
  );
};

export default ContactUs;
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