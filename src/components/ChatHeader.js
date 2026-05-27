import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SIZES, FONT_SIZE, BORDER_RADIUS, ELEVATION } from '../styles';
import useTheme from '../theme/useTheme';

const ChatHeader = () => {
  const { theme, darkMode } = useTheme();

  return (
    <>
      <StatusBar
        backgroundColor={theme.background}
        barStyle={darkMode ? 'light-content' : 'dark-content'}
      />

      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.background,
          },
        ]}
      >
        <Text
          style={[
            styles.headerTitle,
            {
              color: theme.text,
            },
          ]}
        >
          Chats
        </Text>

        <TouchableOpacity
          style={[
            styles.iconButton,
            {
              backgroundColor: theme.card,
            },
          ]}
        >
          <Ionicons
            name="camera-outline"
            size={SIZES.xxxs}
            color={theme.text}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.xxs,
  },

  headerTitle: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: '800',
  },

  iconButton: {
    width: SIZES.mediumest,
    height: SIZES.mediumest,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.xxxxs,
    elevation: ELEVATION.medium,
  },
});
