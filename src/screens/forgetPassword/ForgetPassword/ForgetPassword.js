import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, useWindowDimensions, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Button from '../../../components/Button/Button';
import AuthHeader from '../../../components/AuthHeader/AuthHeader';
import {Color} from '../../../utils'
import Textfield from '../../../components/InputField/InputField';
import EyeIcon from 'react-native-vector-icons/Ionicons';
import EmailIcon from 'react-native-vector-icons/Fontisto';
import PasswordIcon from 'react-native-vector-icons/Feather';
import AuthFooter from '../../../components/AuthFooter/AuthFooter';
import {Icons} from '../../../utils/themes/icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFormik} from 'formik';
import *as Yup from 'yup';
import axios from 'axios';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import Snackbar from 'react-native-snackbar';
export default function ForgetPassword() {
  const {navigate, replace} =useNavigation();
  const {width, height} = useWindowDimensions();
  const ForgetSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Email is required'),
  });

  const formik = useFormik({
    initialValues:{email: ''},
    onSubmit:(values, {...rest}) => {
      axios({
        
        method: 'post',
        url: 'https://api.dev.boka.co/user-management/providers/verify-email',
        params: {
          email: values.email,
        },
      })
        .then(res => {
          if (res.data.status) {
             navigate('VerificationCode', {email : values.email});
                 rest.setSubmitting(false);
          }else{
            Snackbar.show({
              text: 'Wrong Email or Password',
              duration: Snackbar.LENGTH_LONG,
              action: {
                text: 'Dismiss',
                textColor: 'red',
                onPress: () => { Snackbar.dismiss() },
              },
            })
          }
          rest.setSubmitting(false);
          rest.setErrors({email: ''});
        })
        .catch(err => console.log(err.message));

    },
    validationSchema:ForgetSchema
  });
  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>

    <View style={styles.container}>
      <AuthHeader StyleContainer={{marginBottom: height*0.02, marginTop:height*0.025}} headerTxt={'Forgot Password 🤔'} descriptionTxt={'We need your email adress so we can send you the password reset code.'}  />
      <Textfield 
       onChangeText={formik.handleChange('email')}
       onblur={formik.handleBlur('email')}
       value={formik.values.email}
       keyboardType={'email-address'}
      IconStyle={{marginTop: height*0.016,marginHorizontal: height*0.013,}}  placeHolder={'Email Address'} PreIcon={<EmailIcon name="email" onPress={()=>{}} size={20} />}/>
      {
        formik.errors.email && formik.touched.email && 
        <ErrorMessage error={formik.errors.email} />
      }
   
      <Button onPress={formik.handleSubmit} disabled={formik.isSubmitting} label={'Next'} style={[styles.button, {marginTop: height*0.03} ]} LabelStyle={{color:'white'}} />
    

<View style={styles.footer}>

      <AuthFooter footer={'Remember the password? '} Link={'Try again'} onPress={()=>{navigate("SignIn")}}/>
</View>

    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex:1,
    backgroundColor:'white',
  },
  button: {backgroundColor: Color.button},
  Options: {
    alignItems: 'center',

  },
  Text: {
    fontSize: 16,
    fontWeight:'800'
  },
  footer: { flex:1, justifyContent:'flex-end', paddingBottom:20}
})