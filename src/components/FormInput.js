import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimentions';
import { SIZES, FONT_SIZE, COLORS, BORDER_RADIUS } from '../styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useTheme from '../theme/useTheme';

const FormInput = ({ labelValue, placeholderText, iconType, ...rest }) => {
  const { theme, darkMode } = useTheme();

  return (
    <View
      style={[
        styles.inputContainer,
        {
          backgroundColor: theme.card,
          borderColor: darkMode ? '#3A3A3A' : COLORS.greyest,
        },
      ]}
    >
      <View
        style={[
          styles.iconStyle,
          {
            borderRightColor: darkMode ? '#3A3A3A' : COLORS.greyest,
          },
        ]}
      >
        <AntDesign
          name={iconType}
          size={SIZES.xxxxs}
          color={darkMode ? '#B0B0B0' : COLORS.grey}
        />
      </View>

      <TextInput
        value={labelValue}
        style={[
          styles.input,
          {
            color: theme.text,
          },
        ]}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor={darkMode ? '#B0B0B0' : COLORS.grey}
        {...rest}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: SIZES.extraExtraExtraSmall,
    marginBottom: SIZES.extraSmall,

    width: '100%',
    height: windowHeight / 15,

    borderRadius: BORDER_RADIUS.s,
    borderWidth: SIZES.xtraXtraXtraS,

    flexDirection: 'row',
    alignItems: 'center',
  },

  iconStyle: {
    padding: SIZES.extraSmall,

    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',

    borderRightWidth: SIZES.xtraXtraXtraS,

    width: SIZES.m,
  },

  input: {
    padding: SIZES.extraSmall,

    flex: SIZES.xtraXtraXtraS,

    fontSize: FONT_SIZE.xxs,

    justifyContent: 'center',
    alignItems: 'center',
  },

  inputField: {
    padding: SIZES.extraSmall,

    marginTop: SIZES.extraExtraExtraSmall,
    marginBottom: SIZES.extraSmall,

    width: windowWidth / 1.5,
    height: windowHeight / 15,

    fontSize: FONT_SIZE.xxs,

    borderRadius: BORDER_RADIUS.xs,
    borderWidth: SIZES.xtraXtraXtraS,
  },
});
