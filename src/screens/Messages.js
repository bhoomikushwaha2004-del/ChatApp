import { useNavigation, useRoute } from '@react-navigation/native';
import React, {useState} from 'react';

import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MessagesHeader from '../components/MessagesHeader'
import MessagesItem from '../components/MessagesItem'
import MessagesInput from '../components/MessagesInput'

const Messages = () => {

  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hello 👋',
      sender: 'other',
    },

    {
      id: '2',
      text: 'Hii 😄',
      sender: 'me',
    },

    {
      id: '3',
      text: 'Kya kar rhe ho?',
      sender: 'other',
    },
  ]);

  const sendMessage = () => {

    if (message.trim() === '') {
      return;
    }

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'me',
    };

    setMessages(prev => [...prev, newMessage]);

    setMessage('');
  };

  return (

    <KeyboardAvoidingView
      style={styles.container}

      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }>

      {/* Header */}
      <MessagesHeader />

      {/* Messages */}

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => <MessagesItem item={item} />}
        contentContainerStyle={{
          padding: 15,
        }}
      />

      {/* Input */}
      <MessagesInput />
      

    </KeyboardAvoidingView>
  );
};

export default Messages;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

});