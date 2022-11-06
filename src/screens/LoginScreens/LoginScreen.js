import { StyleSheet, Text, StatusBar,SafeAreaView,View, TouchableWithoutFeedback, Keyboard, useWindowDimensions, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Button from '../../components/Button/Button';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import {Color} from '../../utils'
import Textfield from '../../components/InputField/InputField';
import EyeIcon from 'react-native-vector-icons/Ionicons';
import EmailIcon from 'react-native-vector-icons/Fontisto';
import PasswordIcon from 'react-native-vector-icons/Feather';
import AuthFooter from '../../components/AuthFooter/AuthFooter';
import {Icons} from '../../utils/themes/icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFormik} from 'formik';
import *as Yup from 'yup';
import axios from 'axios';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Snackbar from 'react-native-snackbar';
export default function Login() {
  const {navigate, replace} =useNavigation();
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
  const LogInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues:{email: '', password: ''},
    onSubmit:(values, {...rest}) => {
      axios({
        method: 'post',
        url: 'https://student.valuxapps.com/api/login',
        params: {
          email: values.email,
          password: values.password,
        },
      })
        .then(res => {
          // Alert.alert(res.data.message);
          if (res.data.status) {
            console.log(res.data.status);
            AsyncStorage.setItem('AccessToken', res.data.data.token);
            replace('AppStack', {screen:'Home'});
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
          rest.setErrors({email_Phone: ''});
        })
        .catch(err => console.log(err));
  

    },
    validationSchema:LogInSchema
  });
  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>

    <View style={[styles.container,{paddingTop:40}]}>
      <AuthHeader StyleContainer={{marginBottom: height*0.02, marginTop:height*0.025}} headerTxt={'Welcome Back 👋'} descriptionTxt={'I am happy to see you again. You can continue where you left off by logging in'}  />
      <Textfield 
       onChangeText={formik.handleChange('email')}
       onblur={formik.handleBlur('email')}
       value={formik.values.email}
      IconStyle={{marginTop: height*0.014,marginHorizontal: height*0.013,}}  placeHolder={'Email Address'} PreIcon={<EmailIcon name="email" onPress={()=>{}} size={20} />}/>
      {
        formik.errors.email && formik.touched.email && 
        <ErrorMessage error={formik.errors.email} />
      }
      <Textfield  onChangeText={formik.handleChange('password')}
       onblur={formik.handleBlur('password')}
       value={formik.values.password} IconStyle={{marginTop: height*0.018,marginHorizontal: height*0.013,}} placeHolder={'Password'} Icon={eye} isSecureTextEntry={sucre} PreIcon={<PasswordIcon name="lock" onPress={()=>{}} size={20} />}/>
      {
        formik.errors.password && formik.touched.password && 
        <ErrorMessage error={formik.errors.password} />
      }
      <TouchableOpacity onPress={()=>{}} style={[styles.Forget, {marginTop: height*0.02}]}>
        <Text>Forgot Password?</Text>
      </TouchableOpacity>
      <Button onPress={formik.handleSubmit} label={'Sign In'} style={[styles.button, {marginTop: height*0.03} ]} LabelStyle={{color:'white'}} />
      <View style={[styles.Options, {marginVertical: height*0.06}]}>
        <Text style={styles.Text}>or</Text>
      </View>
      <View style={{flex:0.9, justifyContent:'space-between'}}>
<View>
      <Button onPress={()=>{console.log('press')}} label={'Sign In with Google'} style={[{marginBottom:height*0.015}]} LabelStyle={{color:Color.FooterSocial}} Icon={Icons.Google} />
      <Button onPress={()=>{console.log('press')}} label={'Sign In with Facebook'} LabelStyle={{color:Color.FooterSocial}} Icon={Icons.Facebook}/>
</View>
<View style={{marginBottom:height*0.05}}>
<AuthFooter footer={'Don\'t have an account? '} Link={'Sign Up'} onPress={()=>{navigate("SignUp")}}/>

</View>
      
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
  Forget: {alignSelf:'flex-end'}
})