import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

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

    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 22,

    marginBottom: 14,

    elevation: 2,
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  image: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },

  onlineDot: {
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: '#00c851',
    position: 'absolute',
    bottom: 3,
    right: 3,
    borderWidth: 2,
    borderColor: '#fff',
  },

  textContainer: {
    marginLeft: 14,
    flex: 1,
  },

  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
  },

  message: {
    marginTop: 6,
    color: 'gray',
    fontSize: 14,
  },

  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 55,
  },

  time: {
    color: 'gray',
    fontSize: 12,
  },

  unreadBadge: {
    backgroundColor: '#2e64e5',
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },

  unreadText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
})