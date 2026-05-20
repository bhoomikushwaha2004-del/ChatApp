import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SIZES,FONT_SIZE,COLORS,BORDER_RADIUS,ELEVATION } from '../styles';

const ChatSearchTab = () => {
  return (
    <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="gray"
          />

          <TextInput
            placeholder="Search chats..."
            placeholderTextColor="gray"
            style={styles.searchInput}
          />
        </View>
  )
}

export default ChatSearchTab

const styles = StyleSheet.create({
    searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary, //fff
    borderRadius: BORDER_RADIUS.m, //16
    paddingHorizontal: SIZES.smallest, //15
    marginBottom: SIZES.xxs, //20
    height: SIZES.extraExtraLarge, //55
    elevation: ELEVATION.small, //2
  },

  searchInput: {
    flex: SIZES.xtraXtraXtraS, //1
    marginLeft: SIZES.extraSmall, //10
    color: COLORS.primary, //000
    fontSize: FONT_SIZE.xxs, //16
  },
})