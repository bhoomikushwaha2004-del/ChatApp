import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SIZES,FONT_SIZE,COLORS,BORDER_RADIUS,ELEVATION } from '../styles';

const ChatHeader = () => {
  return (
    <> 
    <StatusBar barStyle={'dark-content'} />
    <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Chats
          </Text>

          <TouchableOpacity style={styles.iconButton}>
            <Ionicons
              name="camera-outline"
              size={SIZES.xxxs} //24
              color={COLORS.primary} //000
            />
          </TouchableOpacity>
        </View>
        </>
  )
}

export default ChatHeader

const styles = StyleSheet.create({
    header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.xxs, //20
  },
  headerTitle: {
    fontSize: FONT_SIZE.xxl, //32
    fontWeight: '800',
    color: COLORS.primary, //000
  },
  iconButton: {
    width: SIZES.mediumest, //45
    height: SIZES.mediumest, //45
    backgroundColor: COLORS.secondary, //fff
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.xxxxs, //15
    elevation: ELEVATION.medium, //3
  },
})