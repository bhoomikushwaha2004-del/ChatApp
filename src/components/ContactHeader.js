import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { SIZES, FONT_SIZE, BORDER_RADIUS, ELEVATION } from '../styles';
import useTheme from '../theme/useTheme';

const ContactHeader = ({ contacts }) => {
  const navigation = useNavigation();

  const { theme, darkMode } = useTheme();

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[
          styles.backBtn,
          {
            backgroundColor: theme.card,
          },
        ]}
      >
        <Ionicons name="arrow-back" size={SIZES.xxxs} color={theme.text} />
      </TouchableOpacity>

      <View>
        <Text
          style={[
            styles.headerTitle,
            {
              color: theme.text,
            },
          ]}
        >
          Select Contact
        </Text>

        <Text
          style={[
            styles.headerSubTitle,
            {
              color: darkMode ? '#B0B0B0' : 'gray',
            },
          ]}
        >
          {contacts.length} contacts
        </Text>
      </View>
    </View>
  );
};

export default ContactHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: SIZES.xs,
    paddingVertical: SIZES.s,
  },

  backBtn: {
    width: SIZES.mediumest,
    height: SIZES.mediumest,

    borderRadius: BORDER_RADIUS.xxm,

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: SIZES.smaller,

    elevation: ELEVATION.medium,
  },

  headerTitle: {
    fontSize: FONT_SIZE.l,
    fontWeight: '700',
  },

  headerSubTitle: {
    marginTop: SIZES.xtraXtraS,
  },
});
