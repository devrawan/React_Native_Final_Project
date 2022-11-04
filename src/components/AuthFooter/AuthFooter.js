import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function AuthFooter() {
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
  },
  Text: {
    lineHeight: 25.2,
    fontSize: 18,
    color: Color.Grey[800],
  },
  Link: {
    lineHeight: 25.2,
    fontSize: 18,
    color: Color.Secondary.Main,
    textDecorationLine: 'underline',
  },
});
