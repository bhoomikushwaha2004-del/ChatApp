import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { SIZES,FONT_SIZE,COLORS,BORDER_RADIUS,ELEVATION } from '../styles';

const ChatList = ({item}) => {
  const navigation = useNavigation()
  return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.chatCard}
        onPress={() =>
          navigation.navigate('messages', {
            userName: item.name,
            otherUser: item,
          })
        }>

        <View style={styles.leftSection}>

          <View>
            <Image
              source={{uri: item.image}}
              style={styles.image}
            />

            {item.online && (
              <View style={styles.onlineDot} />
            )}
          </View>

          <View style={styles.textContainer}>

            <Text style={styles.name}>
              {item.name}
            </Text>

            <Text
              numberOfLines={1}
              style={styles.message}>
              {item.lastMessage}
            </Text>

          </View>
        </View>

        <View style={styles.rightSection}>

          <Text style={styles.time}>
            {item.time}
          </Text>

          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>
                {item.unread}
              </Text>
            </View>
          )}

        </View>
      </TouchableOpacity>
    );
}

export default ChatList

const styles = StyleSheet.create({
    chatCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: COLORS.secondary, //fff
    padding: SIZES.smaller, //14
    borderRadius: BORDER_RADIUS.xxm, //22

    marginBottom: SIZES.smaller, //14

    elevation: ELEVATION.small, //2
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: SIZES.xtraXtraXtraS, //1
  },

  image: {
    width: SIZES.large, //62
    height: SIZES.large, //62
    borderRadius: BORDER_RADIUS.xl, //31
  },

  onlineDot: {
    width: SIZES.smallest, //15
    height: SIZES.smallest, //15
    borderRadius: BORDER_RADIUS.xs, //8
    backgroundColor: COLORS.limeGreen, //00c851
    position: 'absolute',
    bottom: SIZES.xtraS, //3
    right: SIZES.xtraS, //3
    borderWidth: SIZES.xtraXtraS, //2
    borderColor: COLORS.secondary, //fff
  },

  textContainer: {
    marginLeft: SIZES.smaller, //14
    flex: SIZES.xtraXtraXtraS, //1
  },

  name: {
    fontSize: FONT_SIZE.xxxs, //17
    fontWeight: '700',
    color: COLORS.primary, //000
  },

  message: {
    marginTop: SIZES.extraExtraSmall, //6
    color: 'gray',
    fontSize: FONT_SIZE.s, //14
  },

  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: SIZES.extraExtraLarge, //55
  },

  time: {
    color: 'gray',
    fontSize: FONT_SIZExtraSmall, //12
  },

  unreadBadge: {
    backgroundColor: COLORS.blue, //2e64e5
    minWidth: SIZES.xxxs, //24
    height: SIZES.xxxs, //24
    borderRadius: BORDER_RADIUS.xxxs, //12
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.extraExtraSmall, //6
  },

  unreadText: {
    color: COLORS.secondary, //fff
    fontWeight: '700',
    fontSize: FONT_SIZE.xtraSmall, //12
  },
})