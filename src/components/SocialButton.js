import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { windowHeight } from '../utils/Dimentions';
import { SIZES, FONT_SIZE, BORDER_RADIUS } from '../styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import useTheme from '../theme/useTheme';

const SocialButton = ({
  buttonTitle,
  btnType,
  color,
  backgroundColor,
  ...rest
}) => {
  const { theme, darkMode } = useTheme();

  let bgColor = backgroundColor || theme.card;

  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        {
          backgroundColor: bgColor,
        },
      ]}
      {...rest}
    >
      <View style={styles.iconWrapper}>
        <FontAwesome
          name={btnType}
          style={styles.icon}
          size={22}
          color={color || theme.text}
        />
      </View>

      <View style={styles.btnTxtWrapper}>
        <Text
          style={[
            styles.buttonText,
            {
              color: color || theme.text,
            },
          ]}
        >
          {buttonTitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: SIZES.extraSmall,

    width: '100%',
    height: windowHeight / 15,

    padding: SIZES.extraSmall,

    flexDirection: 'row',

    borderRadius: BORDER_RADIUS.s,
  },

  iconWrapper: {
    width: SIZES.extraExtraMedium,

    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    fontWeight: 'bold',
  },

  btnTxtWrapper: {
    flex: SIZES.xtraXtraXtraS,

    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: FONT_SIZE.m,
    fontWeight: 'bold',
  },
});
