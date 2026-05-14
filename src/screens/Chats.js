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
} from 'react-native';

const users = [
  {
    id: '1',
    name: 'Rahul',
    lastMessage: 'Hello bro 👋',
    time: '2:30 PM',
    image:
      'https://i.pravatar.cc/150?img=1',
  },

  {
    id: '2',
    name: 'Priya',
    lastMessage: 'Kya kar rhe ho?',
    time: '1:15 PM',
    image:
      'https://i.pravatar.cc/150?img=2',
  },

  {
    id: '3',
    name: 'Aman',
    lastMessage: 'Kal milte h',
    time: 'Yesterday',
    image:
      'https://i.pravatar.cc/150?img=3',
  },
];

const Chats = () => {
    const navigation = useNavigation()
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.chatContainer}
        onPress={() =>
          navigation.navigate('ChatRoom', {
            userName: item.name,
          })
        }
      >
        <Image
          source={{uri: item.image}}
          style={styles.image}
        />

        <View style={styles.info}>
          <Text style={styles.name}>
            {item.name}
          </Text>

          <Text style={styles.message}>
            {item.lastMessage}
          </Text>
        </View>

        <Text style={styles.time}>
          {item.time}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} />
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },

  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  image: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },

  info: {
    flex: 1,
    marginLeft: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },

  message: {
    marginTop: 5,
    color: 'gray',
  },

  time: {
    color: 'gray',
    fontSize: 12,
  },
});