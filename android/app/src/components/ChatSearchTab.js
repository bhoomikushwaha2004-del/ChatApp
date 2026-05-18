import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 55,
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#000',
    fontSize: 16,
  },
})