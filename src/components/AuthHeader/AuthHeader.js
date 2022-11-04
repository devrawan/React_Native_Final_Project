import {Text, View, StyleSheet} from 'react-native';
import React from 'react';

const AuthHeaderText= ({
  headerTxt,
  descriptionTxt,
}) => {
  return (
    <View style={Styles.Container}>
    <Text style={Styles.Header}>{headerTxt}</Text>
    <Text style={Styles.Description}>{descriptionTxt}</Text>
  </View>
  );
};
export default AuthHeaderText;

const Styles = StyleSheet.create({
  Container: {
    marginTop: 35,
    marginBottom: 7,
  },
  Header: {
    fontSize: 24,
     fontWeight: '700',
    lineHeight: 30.8,
  },
  Description: {
    fontSize: 18,
     fontWeight: '400',
    lineHeight: 25.2,

  }
});