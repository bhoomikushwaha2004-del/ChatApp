import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SIZES, COLORS, BORDER_RADIUS } from '../styles';
import useTheme from '../theme/useTheme';

const MessagesInput = ({ message, setMessage, sendMessage, sending }) => {
  const { theme, darkMode } = useTheme();

  return (
    <View
      style={[
        styles.inputContainer,
        {
          backgroundColor: theme.background,

          borderColor: darkMode ? '#2A2A2A' : COLORS.secondWhite,
        },
      ]}
    >
      <TextInput
        placeholder="Type message..."
        placeholderTextColor={darkMode ? '#B0B0B0' : COLORS.primary}
        value={message}
        onChangeText={setMessage}
        style={[
          styles.input,
          {
            backgroundColor: theme.card,

            color: theme.text,
          },
        ]}
      />

      <TouchableOpacity
        style={[
          styles.sendButton,
          {
            backgroundColor: theme.button,
          },
        ]}
        disabled={sending}
        onPress={sendMessage}
      >
        <Ionicons name="send" size={SIZES.xxs} color={COLORS.secondary} />
      </TouchableOpacity>
    </View>
  );
};

export default MessagesInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: SIZES.extraSmall,

    borderTopWidth: SIZES.xtraXtraXtraS,
  },

  input: {
    flex: SIZES.xtraXtraXtraS,

    borderRadius: BORDER_RADIUS.l,

    paddingHorizontal: SIZES.xs,

    height: SIZES.m,
  },

  sendButton: {
    width: SIZES.m,
    height: SIZES.m,

    borderRadius: BORDER_RADIUS.xxxm,

    justifyContent: 'center',
    alignItems: 'center',

    marginLeft: SIZES.extraSmall,
  },
});
