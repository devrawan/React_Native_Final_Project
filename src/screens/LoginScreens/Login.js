import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../../components/Button/Button';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
export default function Login() {
  return (
    <View style={styles.container}>
      <AuthHeader headerTxt={'Welcome Back '} descriptionTxt={'I am happy to see you again. You can continue where you left off by logging in'}  />
      <Button onPress={()=>{}} label={'Login'} style={styles.button}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  button: {backgroundColor: 'red'}
})