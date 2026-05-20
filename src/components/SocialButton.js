import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimentions';
import { SIZES,FONT_SIZE,COLORS,BORDER_RADIUS,ELEVATION } from '../styles';


import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SocialButton = ({
  buttonTitle,
  btnType,
  color,
  backgroundColor,
  ...rest
}) => {
  let bgColor = backgroundColor;
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, {backgroundColor: bgColor}]}
      {...rest}>
      <View style={styles.iconWrapper}>
        <FontAwesome name={btnType} style={styles.icon} size={22} color={color} />
      </View>
      <View style={styles.btnTxtWrapper}>
        <Text style={[styles.buttonText, {color: color}]}>{buttonTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: SIZES.extraSmall, //10
    width: '100%',
    height: windowHeight / 15,
    padding: SIZES.extraSmall, //10
    flexDirection: 'row',
    borderRadius: BORDER_RADIUS.s, //3
  },
  iconWrapper: {
    width: SIZES.extraExtraMedium, //30
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontWeight: 'bold',
  },
  btnTxtWrapper: {
    flex: SIZES.xtraXtraXtraS, //1
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: FONT_SIZE.m, //18
    fontWeight: 'bold',
  },
});