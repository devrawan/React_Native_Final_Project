import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, useWindowDimensions, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Button from '../../../components/Button/Button';
import AuthHeader from '../../../components/AuthHeader/AuthHeader';
import {Color} from '../../../utils'
import Textfield from '../../../components/InputField/InputField';
import EyeIcon from 'react-native-vector-icons/Ionicons';
import EmailIcon from 'react-native-vector-icons/Fontisto';
import VerifiedIcon from 'react-native-vector-icons/Octicons';
import AuthFooter from '../../../components/AuthFooter/AuthFooter';
import {Icons} from '../../../utils/themes/icons';
import { useNavigation ,useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFormik} from 'formik';
import *as Yup from 'yup';
import axios from 'axios';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import Snackbar from 'react-native-snackbar';
export default function VerificationCode() {
  const {navigate, replace} =useNavigation();
  const {params} =useRoute();
  const {email} = params;
  const {width, height} = useWindowDimensions();
  const ForgetSchema = Yup.object().shape({
    Code: Yup.string().min(4).max(4),
  });

  const formik = useFormik({
    initialValues:{Code: ''},
    onSubmit:(values, {...rest}) => {
      axios({
        method: 'post',
        url: 'https://api.dev.boka.co/user-management/providers/verify-code',
        params: {
          email: email,
          code: values.Code,
        },
      })
        .then(res => {
          if (res.data.status) {
        navigate('NewPassword', {email ,code});
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
          rest.setErrors({Code: ''});
        })
        .catch(err => console.log(err.message));
  
    },
    validationSchema:ForgetSchema
  });
  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>

    <View style={styles.container}>
      <AuthHeader StyleContainer={{marginBottom: height*0.02, marginTop:height*0.025}} headerTxt={'Verification Code ✅'} descriptionTxt={'You need to enter 4-digit code we send to your email address.'}  />
      <Textfield IconStyle={{marginTop: height*0.014,marginHorizontal: height*0.013,}} 
       placeHolder={'Verification Code'}
       PreIcon={<VerifiedIcon name="verified" onPress={()=>{}} size={20} />}
       onChangeText={formik.handleChange('Code')}
       onblur={formik.handleBlur('Code')}
       value={formik.values.Code}
       keyboardType={'numeric'}
       />
      {
        formik.errors.Code && formik.touched.Code && 
        <ErrorMessage error={formik.errors.Code} />
      }
   
      <Button onPress={formik.handleSubmit} disabled={formik.isSubmitting} label={'Confirm'} style={[styles.button, {marginTop: height*0.03} ]} LabelStyle={{color:'white'}} />
    

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