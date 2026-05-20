import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimentions';
import { SIZES,FONT_SIZE,COLORS,BORDER_RADIUS,ELEVATION } from '../styles';

import AntDesign from 'react-native-vector-icons/AntDesign';

const FormInput = ({labelValue, placeholderText, iconType, ...rest}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <AntDesign name={iconType} size={SIZES.xxxxs} color={COLORS.grey} />
      </View>
      <TextInput
        value={labelValue}
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor={COLORS.grey}
        {...rest}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: SIZES.extraExtraExtraSmall, //5
    marginBottom: SIZES.extraSmall, //10
    width: '100%',
    height: windowHeight / 15,
    borderColor: COLORS.greyest, //ccc
    borderRadius: BORDER_RADIUS.s, //3
    borderWidth: SIZES.xtraXtraXtraS, //1
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary, //fff
  },
  iconStyle: {
    padding: SIZES.extraSmall, //10
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: COLORS.greyest,
    borderRightWidth: SIZES.xtraXtraXtraS, //1
    width: SIZES.m, //50
  },
  input: {
    padding: SIZES.extraSmall, //10
    flex: SIZES.xtraXtraXtraS, //1
    fontSize: FONT_SIZE.xxs, //16
    color: COLORS.lightBlack, //333
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    padding: SIZES.extraSmall, //10
    marginTop: SIZES.extraExtraExtraSmall, //5
    marginBottom: SIZES.extraSmall, //10
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: FONT_SIZE.xxs, //16
    borderRadius: BORDER_RADIUS.xs, //8
    borderWidth: SIZES.xtraXtraXtraS, //1
  },
});