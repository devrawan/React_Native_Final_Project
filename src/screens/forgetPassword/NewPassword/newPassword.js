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
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFormik} from 'formik';
import *as Yup from 'yup';
import axios from 'axios';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import Snackbar from 'react-native-snackbar';
export default function NewPassword() {
  const {navigate, replace} =useNavigation();
  const {params} = useRoute();
  const {email} = params;
  const {code} = params;
  const {width, height} = useWindowDimensions();
  const ForgetSchema = Yup.object().shape({
    password: Yup.string()
  .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
  .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
  .matches(
    /[!@#$%^&*()\-_"=+{}; :,<.>]/,
    'Password must have a special character',
  )
  .min(8, ({min}) => `Password must be at least ${min} characters`)
  .required('Password is required'),
  });

  const formik = useFormik({
    initialValues:{password: ''},
    onSubmit:(values, {...rest}) => {
      axios({
        method: 'post',
        url: 'https://api.dev.boka.co/user-management/providers/reset-password',
        params: {
          email: email,
             code : code,
          password: values.password,
        },
      })
        .then(res => {
          
          if (res.data.status) {
             navigate('SignIn');
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
          rest.setErrors({password: ''});
        })
        .catch(err => console.log(err.message));
       
    },
    validationSchema:ForgetSchema
  });
  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>

    <View style={styles.container}>
      <AuthHeader StyleContainer={{marginBottom: height*0.02, marginTop:height*0.025}} headerTxt={'Create New Password 🔒'} descriptionTxt={'You can create a new password, please don\'t forget it too.'}  />
      <Textfield IconStyle={{marginTop: height*0.014,marginHorizontal: height*0.013,}} 
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
   
      <Button onPress={formik.handleSubmit} disabled={formik.isSubmitting} label={'Next'} style={[styles.button, {marginTop: height*0.03} ]} LabelStyle={{color:'white'}} />
    

<View style={styles.footer}>

      <AuthFooter footer={'Didn’t receive an email? '} Link={'Send again'} onPress={()=>{}}/>
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