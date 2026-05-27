import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SIZES, FONT_SIZE, BORDER_RADIUS, ELEVATION } from '../styles';
import useTheme from '../theme/useTheme';

const ChatSearchTab = () => {
  const { theme, darkMode } = useTheme();

  return (
    <View
      style={[
        styles.searchContainer,
        {
          backgroundColor: theme.card,
        },
      ]}
    >
      <Ionicons name="search" size={20} color={darkMode ? '#B0B0B0' : 'gray'} />

      <TextInput
        placeholder="Search chats..."
        placeholderTextColor={darkMode ? '#B0B0B0' : 'gray'}
        style={[
          styles.searchInput,
          {
            color: theme.text,
          },
        ]}
      />
    </View>
  );
};

export default ChatSearchTab;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: BORDER_RADIUS.m,
    paddingHorizontal: SIZES.smallest,

    marginBottom: SIZES.xxs,
    height: SIZES.extraExtraLarge,

    elevation: ELEVATION.small,
  },

  searchInput: {
    flex: SIZES.xtraXtraXtraS,
    marginLeft: SIZES.extraSmall,
    fontSize: FONT_SIZE.xxs,
  },
});
