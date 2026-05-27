import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SIZES, FONT_SIZE, COLORS, BORDER_RADIUS, ELEVATION } from '../styles';
import useTheme from '../theme/useTheme';

const ChatList = ({ item }) => {
  const navigation = useNavigation();

  const { theme,darkMode } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.chatCard,
        {
          backgroundColor: theme.card,
        },
      ]}
      onPress={() =>
        navigation.navigate('messages', {
          userName: item.name,
          otherUser: item,
        })
      }
    >
      <View style={styles.leftSection}>
        <View>
          <Image source={{ uri: item.image }} style={styles.image} />

          {item.online && (
            <View
              style={[
                styles.onlineDot,
                {
                  borderColor: theme.card,
                },
              ]}
            />
          )}
        </View>

        <View style={styles.textContainer}>
          <Text
            style={[
              styles.name,
              {
                color: theme.text,
              },
            ]}
          >
            {item.name}
          </Text>

          <Text
            numberOfLines={1}
            style={[
              styles.message,
              {
                color: darkMode ? '#B0B0B0' : 'gray',
              },
            ]}
          >
            {item.lastMessage}
          </Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text
          style={[
            styles.time,
            {
              color: darkMode ? '#B0B0B0' : 'gray',
            },
          ]}
        >
          {item.time}
        </Text>

        {item.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unread}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  chatCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: SIZES.smaller,
    borderRadius: BORDER_RADIUS.xxm,

    marginBottom: SIZES.smaller,

    elevation: ELEVATION.small,
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: SIZES.xtraXtraXtraS,
  },

  image: {
    width: SIZES.large,
    height: SIZES.large,
    borderRadius: BORDER_RADIUS.xl,
  },

  onlineDot: {
    width: SIZES.smallest,
    height: SIZES.smallest,
    borderRadius: BORDER_RADIUS.xs,

    backgroundColor: COLORS.limeGreen,

    position: 'absolute',
    bottom: SIZES.xtraS,
    right: SIZES.xtraS,

    borderWidth: SIZES.xtraXtraS,
  },

  textContainer: {
    marginLeft: SIZES.smaller,
    flex: SIZES.xtraXtraXtraS,
  },

  name: {
    fontSize: FONT_SIZE.xxxs,
    fontWeight: '700',
  },

  message: {
    marginTop: SIZES.extraExtraSmall,
    fontSize: FONT_SIZE.s,
  },

  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: SIZES.extraExtraLarge,
  },

  time: {
    fontSize: FONT_SIZE.xtraSmall,
  },

  unreadBadge: {
    backgroundColor: COLORS.blue,
    minWidth: SIZES.xxxs,
    height: SIZES.xxxs,
    borderRadius: BORDER_RADIUS.xxxs,

    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: SIZES.extraExtraSmall,
  },

  unreadText: {
    color: COLORS.secondary,
    fontWeight: '700',
    fontSize: FONT_SIZE.xtraSmall,
  },
});
