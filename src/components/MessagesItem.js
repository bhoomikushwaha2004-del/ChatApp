import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SIZES,FONT_SIZE,COLORS,BORDER_RADIUS,ELEVATION } from '../styles';
import React from 'react';
import RNLinkPreview from 'react-native-link-preview'

const MessagesItem = ({
  item,
  currentUserId,
}) => {

  const isMe =
    item.senderId === currentUserId;
  
  const urlRegx = /(https?:\/\/[^\s]+)/g;

  const detechUrl = item.text.match(urlRegx)?.[0]

  return (
    <View
      style={[
        styles.messageContainer,
        {
          alignSelf: isMe
            ? 'flex-end'
            : 'flex-start',

          backgroundColor: isMe
            ? COLORS.blue //2e64e5
            : COLORS.white7, //e5e5ea
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
            ? COLORS.secondary //fff
            : COLORS.primary, //000
          fontSize: FONT_SIZE.xs, //15
        }}>

        {item.text}

      </Text>
      {detechUrl && (
        <View>
          <RNLinkPreview
          text={detechUrl}
          
          // containerStyle ={{
          //   width:230,
          //   borderRadius:14,
          //   overflow:'hidden'
          // }}
          />
          </View>
      )}

      <Text
        style={[
          styles.time,
          {
            color: isMe
              ? COLORS.lightGrey //ddd
              : COLORS.darkGrey, //555
          },
        ]}>

        {item.createdAt?.toDate
          ?
            item.createdAt
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
    padding: SIZES.small, //12
    borderRadius: SIZES.s, //16
    marginBottom: SIZES.small, //12
  },

  senderName: {
    fontWeight: '700',
    marginBottom: SIZES.extraExtraExtraSmall, //5
    color: COLORS.red, //000
  },

  time: {
    fontSize: FONT_SIZE.xtraXtraSmall, //11
    marginTop: SIZES.extraExtraSmall, //6
    alignSelf: 'flex-end',
  },
});