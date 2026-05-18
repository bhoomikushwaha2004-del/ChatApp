import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import React from 'react';

const MessagesItem = ({
  item,
  currentUserId,
}) => {

  const isMe =
    item.senderId === currentUserId;

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

      {!isMe && (
        <Text style={styles.senderName}>
          {item.senderName}
        </Text>
      )}

      <Text
        style={{
          color: isMe
            ? '#fff'
            : '#000',
          fontSize: 15,
        }}>

        {item.text}

      </Text>

      <Text
        style={[
          styles.time,
          {
            color: isMe
              ? '#ddd'
              : '#555',
          },
        ]}>

        {item.createdAt?.toDate
          ? item.createdAt
              .toDate()
              .toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })
          : ''}

      </Text>

    </View>
  );
};

export default MessagesItem;

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },

  senderName: {
    fontWeight: '700',
    marginBottom: 5,
    color: '#000',
  },

  time: {
    fontSize: 11,
    marginTop: 6,
    alignSelf: 'flex-end',
  },
});