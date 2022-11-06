import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {Color, Icons} from '../../utils';

const ErrorMessage = ({error}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
      <SvgXml xml={Icons.Error} />
      <Text
        style={Styles.ErrorMessage}>
        {error}
      </Text>
    </View>
  );
};
export default ErrorMessage;
const Styles = StyleSheet.create({
  ErrorMessage: {
    color: Color.ErrorColor,
    marginLeft: 10,
    fontSize: 14,
    lineHeight: 19.6,
    fontWeight: '500',
  }
});