import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { windowHeight } from '../utils/Dimentions';
import { SIZES, FONT_SIZE, COLORS, BORDER_RADIUS } from '../styles';
import useTheme from '../theme/useTheme';

const FormButton = ({ buttonTitle, ...rest }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      {...rest}
      style={[
        styles.buttonContainer,
        {
          backgroundColor: theme.button,
        },
      ]}
    >
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: SIZES.extraSmall,

    width: '100%',
    height: windowHeight / 15,

    padding: SIZES.extraSmall,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: BORDER_RADIUS.s,
  },

  buttonText: {
    fontSize: FONT_SIZE.m,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
