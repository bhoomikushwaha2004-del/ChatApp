import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SIZES,FONT_SIZE,COLORS,BORDER_RADIUS,ELEVATION } from '../styles';

const MessagesInput = ({message,setMessage,sendMessage}) => {
  return (
    <View style={styles.inputContainer}>

        <TextInput
          placeholderTextColor={COLORS.primary}
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
            size={SIZES.xxs} //20
            color={COLORS.secondary} //fff
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

    padding: SIZES.extraSmall, //10
    borderTopWidth: SIZES.xtraXtraXtraS, //1
    borderColor: COLORS.secondWhite, //eee
  },

  input: {
    flex: SIZES.xtraXtraXtraS, //1
    backgroundColor: COLORS.thirdWhite, //f2f2f2

    borderRadius: BORDER_RADIUS.l, //30

    paddingHorizontal: SIZES.xs, //18
    height: SIZES.m, //50

    color: COLORS.primary, //000
  },

  sendButton: {
    width: SIZES.m, //50
    height: SIZES.m, //50

    borderRadius: BORDER_RADIUS.xxxm, //25

    backgroundColor: COLORS.blue, //2e64e5

    justifyContent: 'center',
    alignItems: 'center',

    marginLeft: SIZES.extraSmall, //10
  },
})