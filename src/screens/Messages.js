import React, {
  useEffect,
  useState,
} from 'react';

import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import MessagesHeader from '../components/MessagesHeader';
import MessagesItem from '../components/MessagesItem';
import MessagesInput from '../components/MessagesInput';

const Messages = () => {

  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([]);

  const [lastDoc, setLastDoc] = useState(null);

  const currentUser = auth().currentUser;

  const otherUser = { uid : '999'}
  
  const roomId = currentUser.uid > otherUser.uid ?
                    `${currentUser.uid}_${otherUser.uid}` :
                    `${otherUser.uid}_${currentUser.uid}`

  
  // REALTIME LISTENER

  useEffect(() => {

    const unsubscribe = firestore()
      .collection('chats')
      .doc(roomId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(15)
      .onSnapshot(snapshot => {

        const allMessages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMessages(allMessages);

        setLastDoc(
          snapshot.docs[
            snapshot.docs.length - 1
          ],
        );
      });

    return unsubscribe;

  }, []);

  // SEND MESSAGE

  const sendMessage = async () => {

    if (message.trim() === '') {
      return;
    }

    try {

      await firestore()
        .collection('chats')
        .doc(roomId)
        .collection('messages')
        .add({
          text: message,
          senderId: currentUser.uid,
          senderName: currentUser.displayName || 'no name',
          createdAt:
            firestore.FieldValue.serverTimestamp(),
        });

      setMessage('');

    } catch (error) {
      console.log(error);
    }
  };

  // PAGINATION

  const loadMoreMessages = async () => {

    if (!lastDoc) {
      return;
    }

    const newMessages = await firestore()
      .collection('chats')
      .doc(roomId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .startAfter(lastDoc)
      .limit(15)
      .get();

    if (!newMessages.empty) {

      const olderMessages =
        newMessages.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

      setMessages(prev => [
        ...prev,
        ...olderMessages,
      ]);

      setLastDoc(
        newMessages.docs[
          newMessages.docs.length - 1
        ],
      );
    }
  };

  return (

    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }>

      <MessagesHeader />

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <MessagesItem
            item={item}
            currentUserId={currentUser.uid}
          />
        )}

        inverted

        onEndReached={loadMoreMessages}

        onEndReachedThreshold={0.3}

        contentContainerStyle={{
          padding: 15,
        }}
      />

      <MessagesInput
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />

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