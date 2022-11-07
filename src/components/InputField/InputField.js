import {useState} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import React from 'react';
import { Color } from '../../utils/themes/colors';

const InputFiled= ({
  Label,
  placeHolder,
  Icon,
  PreIcon,
  style,
  keyboardType,
  isSecureTextEntry,
  onChangeText,
  value,
  onblur,
  ContainerHightStyle,
  IconStyle
}) => {
  return (
    <View style={[Styles.Container, ContainerHightStyle]}>
      <View style={[Styles.InnerContainer, style]}>
      <View style={[Styles.PreIconAlign, IconStyle ]}>{PreIcon}</View>
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
            autoCapitalize='none'
          />
        </View>
      </View>
      {Icon && <View style={Styles.IconAlign}>{Icon}</View>}
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
    height:60,
    paddingLeft: 12,
    paddingBottom: 8,
    width: '100%',
    height: 60,
    borderColor: Color.emptyInput,
    backgroundColor: Color.emptyInput
    

  },
  InnerContainer: {
    width: '90%',
    flexDirection:'row',
    height:'100%',
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
    width: '90%',
    height: "100%",
    
  },
  IconAlign: {
    marginRight: 13.85,
  },
  PreIconAlign: {
    
  }
});