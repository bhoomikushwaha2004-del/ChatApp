import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

const MessagesInput = () => {
    

  
  return (
    <View style={styles.inputContainer}>

        <TextInput
          placeholder="Type message..."
          value={message}
          onChangeText={setMessage}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}>

          <Ionicons
            name="send"
            size={20}
            color="#fff"
          />

        </TouchableOpacity>

      </View>
  )
}

export default MessagesInput

const styles = StyleSheet.create({
    inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
  },

  input: {
    flex: 1,
    backgroundColor: '#f2f2f2',

    borderRadius: 30,

    paddingHorizontal: 18,
    height: 50,

    color: '#000',
  },

  sendButton: {
    width: 50,
    height: 50,

    borderRadius: 25,

    backgroundColor: '#2e64e5',

    justifyContent: 'center',
    alignItems: 'center',

    marginLeft: 10,
  },
})