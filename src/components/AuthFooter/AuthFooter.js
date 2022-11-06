import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { Color } from '../../utils/themes/colors';

export default function AuthFooter({footer, Link, onPress}) {
  return (
    <View style={Styles.Container}>
      <Text style={Styles.Text}>{footer}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={Styles.Link}>{Link}</Text>
      </TouchableOpacity>
    </View>
  );
}

const Styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    justifyContent:'center'
  },
  Text: {
    lineHeight: 25.2,
    fontSize: 16,
    color: Color.FooterTxt,
    fontWeight:'500',
  },
  Link: {
    lineHeight: 25.2,
    fontSize: 16,
    textDecorationLine: 'underline',
    color: Color.FooterLink,
  },
});