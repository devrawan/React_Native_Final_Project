import {ActivityIndicator, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../../utils/themes/colors';
import {SvgXml} from 'react-native-svg';
const Button = ({label, onPress, style, disabled, LabelStyle, Icon}) => {
  return (
    <TouchableOpacity
      style={[Styles.button, style]}
      onPress={onPress}
      >
      {Icon && <SvgXml xml={Icon} style={Styles.Icon}/>}
      {disabled && <ActivityIndicator size={'large'} /> || <Text style={[Styles.buttonTxt, LabelStyle]}>{label}</Text> }
      
    </TouchableOpacity>
  );
};

export default Button;

const Styles = StyleSheet.create({
  button: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Color.emptyInput,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    height:60,
  },
  buttonTxt: {
    fontSize: 18,
  },
  Icon: {
    position:'absolute',
    left: 20,
  }
});
