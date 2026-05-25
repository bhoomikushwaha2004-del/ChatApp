import React, { useEffect, useState } from 'react';

import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import MessagesHeader from '../components/MessagesHeader';
import MessagesItem from '../components/MessagesItem';
import MessagesInput from '../components/MessagesInput';
import { useRoute } from '@react-navigation/native';
import { SIZES, FONT_SIZE, COLORS, BORDER_RADIUS, ELEVATION } from '../styles';
import NoChat from 'react-native-vector-icons/Feather'

const Messages = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [sending,setSending] = useState(false)

  const currentUser = auth().currentUser;

  const route = useRoute();

  const otherUser = route.params?.otherUser;

  if (!otherUser) {
    return null;
  }

  const roomId = currentUser.uid > otherUser.uid
      ? `${currentUser.uid}_${otherUser.uid}`
      : `${otherUser.uid}_${currentUser.uid}`;

  const typingStatus = async typing => {
    try {
      await firestore()
          .collection('users')
          .doc(currentUser.uid)
          .set(
            {
              isTyping : typing,
              typingTo : otherUser.uid,
            },
            { merge: true }
          )
    }
    catch(err){
      console.log(err);
      
    }
  }

  const handleTyping = text => {
    setMessage(text)

    if(text.trim().length > 0) {
      typingStatus(true)

      if(typingTimeout) {
        clearTimeout(typingTimeout)
      }

      typingTimeout = setTimeout(()=> {
        typingStatus(false)
      },2000)
    } else {
      typingStatus(false)
    }

  }

  let typingTimeout = null;

  // REALTIME LISTENER

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .doc(roomId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(15)
      .onSnapshot(snapshot => {
        // if(!snapshot) {
        //   return;
        // }
        const allMessages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMessages(allMessages);

        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      });

    return unsubscribe;
  }, [roomId]);

  // SEND MESSAGE

  const sendMessage = async () => {
    if (message.trim() === '') {
      return;
    }

    try {
      setSending(true)
      await firestore()
        .collection('chats')
        .doc(roomId)
        .collection('messages')
        .add({
          text: message,
          senderId: currentUser.uid,
          senderName: currentUser.displayName || 'no name',
          createdAt: new Date(),
          // firestore.FieldValue.serverTimestamp(),
        });

      await firestore()
        .collection('chats')
        .doc(roomId)
        .set(
          {
            participants: [currentUser.uid, otherUser.uid],

            users: [
              {
                uid: currentUser.uid,
                name: currentUser.displayName || 'No Name',

                image: currentUser.photoURL || '',
              },

              {
                uid: otherUser.uid,
                name: otherUser.name,

                image: otherUser.image || '',
              },
            ],

            lastMessage: message,

            updatedAt: new Date(),
            // firestore.FieldValue.serverTimestamp(),
          },
          { merge: true },
        );

      await typingStatus(false)
      setMessage('');
      
    } catch (error) {
      console.log(error);
    } finally{
      setSending(false)
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
      const olderMessages = newMessages.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(prev => [...prev, ...olderMessages]);

      setLastDoc(newMessages.docs[newMessages.docs.length - 1]);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <MessagesHeader />

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => {
          const currentDate = item.createdAt?.toDate
            ? item.createdAt.toDate().toDateString()
            : '';

          const previousDate = messages[index + 1]?.createdAt?.toDate
            ? messages[index + 1].createdAt.toDate().toDateString()
            : '';

          const showDate = currentDate !== previousDate;

          return (
            <>
              {showDate && (
                <View style={styles.dateContainer}>
                  <Text style={styles.dateText}>
                    {item.createdAt?.toDate().toLocaleDateString([], {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </Text>
                </View>
              )}

              <MessagesItem item={item} currentUserId={currentUser.uid} />
            </>
          );
        }}
        inverted
        onEndReached={loadMoreMessages}
        onEndReachedThreshold={0.3}
        ListEmptyComponent={(
          <View
              style={
                styles.emptyContainer
              }>

              <NoChat
                name="message-circle"
                size={SIZES.xl} //80
                color={COLORS.greyest} //ccc
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
          padding: SIZES.smallest, //15
        }}
      />

      <MessagesInput
        message={message}
        setMessage={handleTyping}
        sendMessage={sendMessage}
        sending = {sending}
      />
    </KeyboardAvoidingView>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: SIZES.xtraXtraXtraS, //1
    backgroundColor: COLORS.secondary, //fff
  },
  dateContainer:{
    alignSelf:'center',
    backgroundColor:'#EAEAEA',
    paddingHorizontal:12,
    paddingVertical:5,
    borderRadius:10,
    marginVertical:10,
  },
  dateText:{
    fontSize:12,
    color:'#555',
    fontWeight:'600'
  },
  emptyContainer: {
    // flex: SIZES.xtraXtraXtraS, //1
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    alignContent:'center',
    
  },

  emptyText: {
    fontSize: FONT_SIZE.l, //22
    fontWeight: '700',

    marginTop: SIZES.xxs, //20

    color: COLORS.primary, //000
  },

  subText: {
    marginTop: SIZES.xtraExtras, //8

    color: 'gray',

    fontSize: FONT_SIZE.xs, //15
  },
});
