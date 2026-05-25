import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {windowHeight, windowWidth} from '../utils/Dimentions';
import { SIZES,FONT_SIZE,COLORS,BORDER_RADIUS,ELEVATION } from '../styles';

const FormButton = ({buttonTitle, ...rest}) => {
  return (
    <TouchableOpacity {...rest} style={styles.buttonContainer} >
        <Text style={styles.buttonText}>{buttonTitle} </Text>
    </TouchableOpacity>
  )
}

export default FormButton

const styles = StyleSheet.create({
    buttonContainer: {
    marginTop: SIZES.extraSmall, //10
    width: '100%',
    height: windowHeight / 15,
    backgroundColor: COLORS.blue, //2e64e5
    padding: SIZES.extraSmall, //10 
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.s, //3
  },
  buttonText: {
    fontSize: FONT_SIZE.m, //18
    fontWeight: 'bold',
    color: COLORS.white, //ffffff
  },
})