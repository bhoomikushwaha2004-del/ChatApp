import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Text,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';

import ChatList from '../components/ChatList';

import Ionicons from 'react-native-vector-icons/Ionicons';

import ChatHeader from '../components/ChatHeader';

import ChatSearchTab from '../components/ChatSearchTab';

import {useNavigation} from '@react-navigation/native';

const Chats = () => {

  const [chats, setChats] = useState([]);

  const navigation = useNavigation();

  const currentUser = auth().currentUser;

  // REALTIME CHATS

  useEffect(() => {

    const unsubscribe = firestore()
      .collection('chats')
      .where(
        'participants',
        'array-contains',
        currentUser.uid,
      )

      .orderBy(
        'updatedAt',
        'desc',
      )

      .onSnapshot(snapshot => {
        if(!snapshot) {
          return;
        }

        const allChats =
          snapshot.docs.map(doc => {

            const data = doc.data();

            // FIND OTHER USER

            const otherUser =
              data.users.find(
                user =>
                  user.uid !==
                  currentUser.uid,
              );

            return {
              id: doc.id,

              ...otherUser,

              lastMessage:
                data.lastMessage,

              updatedAt:
                data.updatedAt,
            };
          });

        setChats(allChats);
      });

    return unsubscribe;

  }, []);

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="#fff"
      />

      <View style={styles.container}>

        <ChatHeader />

        <ChatSearchTab />

        <FlatList
          data={chats}

          keyExtractor={item => item.uid}

          renderItem={({item}) => (
            <ChatList item={item} />
          )}

          showsVerticalScrollIndicator={false}

          ListEmptyComponent={(
            <View
              style={
                styles.emptyContainer
              }>

              <Ionicons
                name="chatbubble-outline"
                size={80}
                color="#ccc"
              />

              <Text
                style={styles.emptyText}>

                No Chats Yet

              </Text>

              <Text
                style={styles.subText}>

                Start messaging to see chats here

              </Text>

            </View>
          )}

          contentContainerStyle={{
            paddingBottom: 100,
          }}
        />

        {/* FAB */}

        <TouchableOpacity
          style={styles.fab}

          onPress={() =>
            navigation.navigate(
              'contacts',
            )
          }>

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