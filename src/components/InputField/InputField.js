import {useState} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import React from 'react';

const InputFiled= ({
  Label,
  placeHolder,
  Icon,
  style,
  keyboardType,
  isSecureTextEntry,
  onChangeText,
  value,
  onblur,
}) => {
  return (
    <View style={Styles.Container}>
      <View style={[Styles.InnerContainer, style]}>
        <Text style={Styles.Label}>{Label}</Text>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            placeholder={placeHolder}
            style={Styles.InputField}
            keyboardType={keyboardType || 'default'}
            secureTextEntry={isSecureTextEntry}
            onChangeText={onChangeText}
            value={value}
            onBlur={onblur}
          />
        </View>
      </View>
      <View style={Styles.IconAlign}>{Icon}</View>
    </View>
  );
};
export default InputFiled;

const Styles = StyleSheet.create({
  Container: {
    marginTop: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingTop: 6,
    paddingLeft: 12,
    paddingBottom: 8,
    width: '100%',
    height: 57,

  },
  InnerContainer: {
    width: '90%',
  },
  Label: {
    fontSize: 12,
    marginBottom: 4,
    height: 17,

  },
  InputField: {
    fontSize: 12,
    padding: 0,
    height: 27,

  },
  IconAlign: {
    marginRight: 13.85,
  },
});