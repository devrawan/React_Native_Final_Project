import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Button = ({label, onPress, style, disabled}) => {
  return (
    <TouchableOpacity
      style={[Styles.button, style]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={Styles.buttonTxt}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const Styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 53,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTxt: {
    fontSize: 18,
  },
});