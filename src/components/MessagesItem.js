import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MessagesItem = ({item}) => {
  const isMe = item.sender === 'me';

    return (
      <View
        style={[
          styles.messageContainer,

          {
            alignSelf: isMe
              ? 'flex-end'
              : 'flex-start',

            backgroundColor: isMe
              ? '#2e64e5'
              : '#e5e5ea',
          },
        ]}>

        <Text
          style={{
            color: isMe ? '#fff' : '#000',
            fontSize: 15,
          }}>
          {item.text}
        </Text>

      </View>
    );
}

export default MessagesItem

const styles = StyleSheet.create({
    messageContainer: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
})