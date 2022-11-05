import {Text, View, StyleSheet} from 'react-native';
import React from 'react';

const AuthHeaderText= ({
  headerTxt,
  descriptionTxt,
  StyleContainer
}) => {
  return (
    <View style={ StyleContainer}>
    <Text style={Styles.Header}>{headerTxt}</Text>
    <Text style={Styles.Description}>{descriptionTxt}</Text>
  </View>
  );
};
export default AuthHeaderText;

const Styles = StyleSheet.create({
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