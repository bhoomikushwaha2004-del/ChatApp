import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Text,
} from 'react-native';
import ChatList from '../components/ChatList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatHeader from '../components/ChatHeader';
import ChatSearchTab from '../components/ChatSearchTab';
import {useNavigation} from '@react-navigation/native';

const Chats = () => {

  // Initially empty chats
  const [chatUsers, setChatUsers] = useState([]);

  const navigation = useNavigation();

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor="#fff" />

      <View style={styles.container}>

        <ChatHeader />

        <ChatSearchTab />

        {/* If no chats */}

        {chatUsers.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="chatbubble-outline"
              size={80}
              color="#ccc"
            />

            <Text style={styles.emptyText}>
              No Chats Yet
            </Text>

            <Text style={styles.subText}>
              Start messaging to see chats here
            </Text>
          </View>
        ) : (

          <FlatList
            data={chatUsers}
            keyExtractor={item => item.uid}
            renderItem={({item}) => (
              <ChatList item={item} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
          />
        )}

        {/* Floating Button */}

        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('contacts', {setChatUsers})}>
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

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 20,
    color: '#000',
  },

  subText: {
    marginTop: 8,
    color: 'gray',
    fontSize: 15,
  },
});