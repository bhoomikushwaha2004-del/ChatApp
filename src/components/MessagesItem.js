import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import RNLinkPreview from 'react-native-link-preview';
import Tick from 'react-native-vector-icons/Ionicons';
import { SIZES, FONT_SIZE, COLORS } from '../styles';
import useTheme from '../theme/useTheme';

const MessagesItem = ({ item, currentUserId }) => {
  const [previewData, setPreviewData] = useState(null);

  const isMe = item.senderId === currentUserId;

  const urlRegx = /(https?:\/\/[^\s]+)/g;
  const detechUrl = item.text.match(urlRegx)?.[0];

  const { theme, darkMode } = useTheme();

  useEffect(() => {
    if (detechUrl) {
      RNLinkPreview.getPreview(detechUrl)

        .then(data => {
          setPreviewData(data);
        })

        .catch(err => {
          console.log(err);
        });
    }
  }, [detechUrl]);

  return (
    <View
      style={[
        styles.messageContainer,
        {
          alignSelf: isMe ? 'flex-end' : 'flex-start',

          backgroundColor: isMe ? theme.button : theme.card,
        },
      ]}
    >
      {!isMe && <Text style={styles.senderName}>{item.senderName}</Text>}

      {previewData && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => Linking.openURL(detechUrl)}
        >
          <Image
            source={{
              uri: previewData.images[0],
            }}
            height={140}
            width="100%"
          />

          <Text
            numberOfLines={1}
            style={{
              color: isMe ? COLORS.secondary : theme.text,
            }}
          >
            {previewData.title}
          </Text>

          <Text
            numberOfLines={2}
            style={{
              color: isMe
                ? COLORS.lightGrey
                : darkMode
                ? '#B0B0B0'
                : COLORS.darkGrey,
            }}
          >
            {previewData.description}
          </Text>
        </TouchableOpacity>
      )}

      <Text
        style={{
          color: isMe ? COLORS.secondary : theme.text,

          fontSize: FONT_SIZE.xs,
        }}
      >
        {item.text}
      </Text>

      <View style={styles.bottomRow}>
        <Text
          style={[
            styles.time,
            {
              color: isMe
                ? COLORS.lightGrey
                : darkMode
                ? '#B0B0B0'
                : COLORS.darkGrey,
            },
          ]}
        >
          {item.createdAt?.toDate
            ? item.createdAt.toDate().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })
            : ''}
        </Text>

        {isMe && (
          <Tick
            name={
              item.status === 'sent'
                ? 'checkmark-done'
                : item.status === 'delivered'
                ? 'checkmark-done'
                : 'checkmark'
            }
            size={16}
            color={item.status === 'seen' ? '#041b25' : COLORS.lightGrey}
            style={{ marginLeft: 4 }}
          />
        )}
      </View>
    </View>
  );
};

export default MessagesItem;

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '75%',

    padding: SIZES.small,

    borderRadius: SIZES.s,

    marginBottom: SIZES.small,
  },

  senderName: {
    fontWeight: '700',

    marginBottom: SIZES.extraExtraExtraSmall,

    color: COLORS.red,
  },

  time: {
    fontSize: FONT_SIZE.xtraXtraSmall,

    marginTop: SIZES.extraExtraSmall,

    alignSelf: 'flex-end',
  },

  bottomRow: {
    flexDirection: 'row',

    alignItems: 'center',

    alignSelf: 'flex-end',

    marginTop: 6,
  },
});
