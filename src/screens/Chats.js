import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
} from 'react-native';
import ChatList from '../components/ChatList'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatHeader from '../components/ChatHeader'
import ChatSearchTab from '../components/ChatSearchTab'

const users = [
  {
    id: '1',
    name: 'Rahul Sharma',
    lastMessage: 'Bro project complete ho gaya 🔥',
    time: '2:30 PM',
    unread: 2,
    online: true,
    image: 'https://i.pravatar.cc/150?img=11',
  },

  {
    id: '2',
    name: 'Priya',
    lastMessage: 'Kal milte h 😊',
    time: '1:10 PM',
    unread: 0,
    online: false,
    image: 'https://i.pravatar.cc/150?img=32',
  },

  {
    id: '3',
    name: 'Aman',
    lastMessage: 'Voice message 🎤',
    time: 'Yesterday',
    unread: 4,
    online: true,
    image: 'https://i.pravatar.cc/150?img=14',
  },

  {
    id: '4',
    name: 'Sneha',
    lastMessage: 'Photo received 📸',
    time: 'Yesterday',
    unread: 0,
    online: false,
    image: 'https://i.pravatar.cc/150?img=45',
  },

  {
    id: '5',
    name: 'Karan',
    lastMessage: 'Typing...',
    time: 'Monday',
    unread: 1,
    online: true,
    image: 'https://i.pravatar.cc/150?img=19',
  },
];

const Chats = () => {
  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor="#fff" />

      <View style={styles.container}>

        {/* Header */}
        <ChatHeader />

        {/* Search */}
        <ChatSearchTab />

        {/* Chat List */}

        <FlatList
          data={users}
          keyExtractor={item => item.id}
          renderItem={ChatList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        />

        {/* Floating Button */}

        <TouchableOpacity style={styles.fab}>
          <Ionicons
            name="chatbubble-ellipses"
            size={26}
            color="#fff"
          />
        </TouchableOpacity>

      </View>
    </>
  );
};

export default Chats;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f8f9fd',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  

  fab: {
    position: 'absolute',
    bottom: 25,
    right: 20,

    width: 62,
    height: 62,
    borderRadius: 31,

    backgroundColor: '#2e64e5',

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 6,
  },
});