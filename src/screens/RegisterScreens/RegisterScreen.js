import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, useWindowDimensions, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Button from '../../components/Button/Button';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import {Color} from '../../utils'
import Textfield from '../../components/InputField/InputField';
import EyeIcon from 'react-native-vector-icons/Ionicons';
import EmailIcon from 'react-native-vector-icons/Fontisto';
import PhoneIcon from 'react-native-vector-icons/AntDesign';
import PasswordIcon from 'react-native-vector-icons/Feather';
import PersonIcon from 'react-native-vector-icons/Octicons';
import AuthFooter from '../../components/AuthFooter/AuthFooter';
import {useFormik} from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function SignUp() {
  const {navigate,replace} =useNavigation();
  const {width, height} = useWindowDimensions();
  const [sucre, setSucre] = useState(true);
  const onPressIcon = () => {
    setSucre(preSucre => !preSucre);
  };
  const eye = sucre ? (
    <EyeIcon name="eye-outline" onPress={onPressIcon} size={20} />
  ) : (
    <EyeIcon name="eye-off-outline" onPress={onPressIcon} size={20} />
  );

const RegisterSchema = Yup.object().shape({
  Username: Yup.string().required('Username is required') ,
  email: Yup.string().email('Invalid Email').required('Email is required') ,
  password: Yup.string()
  .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
  .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
  .matches(
    /[!@#$%^&*()\-_"=+{}; :,<.>]/,
    'Password must have a special character',
  )
  .min(8, ({min}) => `Password must be at least ${min} characters`)
  .required('Password is required'),
  Phone_Number:Yup.string().required('Phone is required').min(10) ,
});
const formik = useFormik({
  initialValues: {Username: '',email: '', password: '',Phone_Number: '' },
  onSubmit:(values,{...rest}) => {
    axios({
      method: 'post',
      url: 'https://student.valuxapps.com/api/register',
      params: {
        name: values.Username,
        email: values.email,
        phone: values.Phone_Number,
        password: values.password,
      },
    })
      .then(res => {
        if (res.data.status) {
          AsyncStorage.setItem('AccessToken', res.data.data.token);
          replace('AppStack', {screen:'Home'});
        }else{
          Snackbar.show({
            text: res.data.message,
            duration: Snackbar.LENGTH_LONG,
            action: {
              text: 'Dismiss',
              textColor: 'red',
              onPress: () => { Snackbar.dismiss() },
            },
          })
        }
        rest.setSubmitting(false);
        rest.setErrors({email_Phone: '', password: ''});
      })
      .catch(err => console.log('error: ', err));
  },
  validationSchema: RegisterSchema,
});
  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    <View style={styles.container}>
      <AuthHeader  StyleContainer={{marginBottom: height*0.02, marginTop:height*0.025}}
       headerTxt={'Welcome to Nuntium 👋'} 
       descriptionTxt={'Hello, I guess you are new around here. You can start using the application after sign up.'}  />
      <Textfield
       IconStyle={{marginTop: height*0.018,marginHorizontal: height*0.013,}} 
         placeHolder={'Username'}
        PreIcon={<PersonIcon name="person" onPress={()=>{}} size={20} />}
        onChangeText={formik.handleChange('Username')}
        onblur={formik.handleBlur('Username')}
        value={formik.values.Username}
        />
        {
          formik.errors.Username && formik.touched.Username &&
          <ErrorMessage error={formik.errors.Username} />
        }
      <Textfield IconStyle={{marginTop: height*0.018,marginHorizontal: height*0.013,}} 
       placeHolder={'Email Address'} 
      PreIcon={<EmailIcon name="email" onPress={()=>{}} size={20} />}
      onChangeText={formik.handleChange('email')}
      onblur={formik.handleBlur('email')}
      value={formik.values.email}
      />
         {
        formik.errors.email && formik.touched.email && 
        <ErrorMessage error={formik.errors.email} />
      }
      <Textfield IconStyle={{marginTop: height*0.018,marginHorizontal: height*0.013,}} 
       placeHolder={'Phone Number'}
       PreIcon={<PhoneIcon name="phone" onPress={()=>{}} size={20} />}
       onChangeText={formik.handleChange('Phone_Number')}
       onblur={formik.handleBlur('Phone_Number')}
       value={formik.values.Phone_Number}
       />
        {
          formik.errors.Phone_Number && formik.touched.Phone_Number &&
          <ErrorMessage error={formik.errors.Phone_Number} />
        }
      <Textfield IconStyle={{marginTop: height*0.018,marginHorizontal: height*0.013,}} 
       placeHolder={'Password'}
       PreIcon={<PasswordIcon name="lock" onPress={()=>{}} size={20} />}
       onChangeText={formik.handleChange('password')}
       onblur={formik.handleBlur('password')}
       value={formik.values.password}
       />
         {
          formik.errors.password && formik.touched.password &&
          <ErrorMessage error={formik.errors.password} />
        }
      
      <View style={{flex:0.95, justifyContent:'space-between'}}>

      <Button onPress={formik.handleSubmit} disabled={formik.isSubmitting} label={'Sign Up'} style={[styles.button, {marginTop: height*0.02} ]}
       LabelStyle={{color:'white'}} />
      <AuthFooter footer={'Already have an account? '} Link={'Sign In'} onPress={()=>{navigate('SignIn')}}/>
      </View>
    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex:1,
    backgroundColor:'white'
  },
  button: {backgroundColor: Color.button},
  Options: {
    alignItems: 'center',

  },
  Text: {
    fontSize: 16,
    fontWeight:'800'
  },
  Forget: {alignSelf:'flex-end'}
})