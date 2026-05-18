import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

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
              size={24}
              color="#000"
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
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#000',
  },
  iconButton: {
    width: 45,
    height: 45,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 3,
  },
})