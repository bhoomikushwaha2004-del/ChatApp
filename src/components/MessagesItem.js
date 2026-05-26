import {
    Image,
    Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SIZES,FONT_SIZE,COLORS,BORDER_RADIUS,ELEVATION } from '../styles';
import React, { useEffect, useState } from 'react';
import RNLinkPreview from 'react-native-link-preview'
import Tick from 'react-native-vector-icons/Ionicons'

const MessagesItem = ({item,currentUserId}) => {
  const [previewData,setPreviewData] = useState(null);

  const isMe = item.senderId === currentUserId;
  
  const urlRegx = /(https?:\/\/[^\s]+)/g;

  const detechUrl = item.text.match(urlRegx)?.[0]

  useEffect(()=>{
    if(detechUrl) {
      RNLinkPreview
              .getPreview(detechUrl)
              .then(data => {
                setPreviewData(data)
              })

              .catch(err => {
                console.log(err);
                
              })
    }
  },[detechUrl])

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

      {previewData && (
        <TouchableOpacity activeOpacity={0.8} onPress={()=> Linking.openURL(detechUrl)}  >
          <Image source={{uri: previewData.images[0],}} height={140} width='100%' />
          <Text numberOfLines={1}>{previewData.title} </Text>
          <Text numberOfLines={2}>{previewData.description} </Text>
        </TouchableOpacity>
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
      

      <View style={styles.bottomRow}>

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

      {isMe && (
        <Tick name={item.status === 'sent' ? 'checkmark-done' 
                  : item.status === 'delivered' ? 'checkmark-done'
                  : 'checkmark'
        } size={16} color={ item.status === 'seen' ? '#041b25' : COLORS.lightGrey } style={{marginLeft:4}} />
      )}

      </View>

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
  bottomRow:{
    flexDirection:'row',
    alignItems:'center',
    alignSelf:'flex-end',
    marginTop:6
  }
});