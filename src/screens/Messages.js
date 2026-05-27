import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import firestore, { FieldValue } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import MessagesHeader from '../components/MessagesHeader';
import MessagesItem from '../components/MessagesItem';
import MessagesInput from '../components/MessagesInput';
import { useRoute } from '@react-navigation/native';
import { SIZES, FONT_SIZE, COLORS } from '../styles';
import NoChat from 'react-native-vector-icons/Feather';
import useTheme from '../theme/useTheme';

const Messages = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentUser = auth().currentUser;

  const route = useRoute();
  const otherUser = route.params?.otherUser;

  const { theme, darkMode } = useTheme();

  if (!otherUser) {
    return null;
  }

  const roomId =
    currentUser.uid > otherUser.uid
      ? `${currentUser.uid}_${otherUser.uid}`
      : `${otherUser.uid}_${currentUser.uid}`;

  const typingStatus = async typing => {
    try {
      await firestore()
        .collection('users')

        .doc(currentUser.uid)

        .set(
          {
            isTyping: typing,
            typingTo: otherUser.uid,
          },

          { merge: true },
        );
    } catch (err) {
      console.log(err);
    }
  };

  const handleTyping = text => {
    setMessage(text);

    if (text.trim().length > 0) {
      typingStatus(true);

      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      typingTimeout = setTimeout(() => {
        typingStatus(false);
      }, 2000);
    } else {
      typingStatus(false);
    }
  };

  let typingTimeout = null;

  // REALTIME LISTENER

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')

      .doc(roomId)

      .collection('messages')

      .orderBy('createdAt', 'desc')

      .limit(15)

      .onSnapshot(async snapshot => {
        firestore()
          .collection('chats')

          .doc(roomId)

          .set(
            {
              unreadCount: {
                [currentUser.uid]: 0,
              },
            },

            { merge: true },
          );

        const batch = firestore().batch();

        snapshot.docs.forEach(doc => {
          const msg = doc.data();

          if (msg.senderId !== currentUser.uid && msg.status === 'sent') {
            batch.update(doc.ref, {
              status: 'delivered',
            });
          }
        });

        await batch.commit();

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
      setSending(true);

      await firestore()
        .collection('chats')

        .doc(roomId)

        .collection('messages')

        .add({
          text: message,

          senderId: currentUser.uid,

          senderName: currentUser.displayName || 'no name',

          createdAt: new Date(),

          status: 'sent',
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

            unreadCount: {
              [currentUser.uid]: 0,

              [otherUser.uid]: FieldValue.increment(1),
            },
          },

          { merge: true },
        );

      await typingStatus(false);

      setMessage('');
    } catch (error) {
      console.log(error);
    } finally {
      setSending(false);
    }
  };

  // PAGINATION

  const loadMoreMessages = async () => {
    if (!lastDoc || loading) {
      return;
    }

    try {
      setLoading(true);

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
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
    >
      <MessagesHeader />

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        ListFooterComponent={
          loading ? (
            <View
              style={{
                paddingVertical: 15,
              }}
            >
              <ActivityIndicator size={'small'} color={theme.button} />
            </View>
          ) : null
        }
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
                <View
                  style={[
                    styles.dateContainer,
                    {
                      backgroundColor: darkMode ? '#2A2A2A' : '#EAEAEA',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.dateText,
                      {
                        color: theme.text,
                      },
                    ]}
                  >
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
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <NoChat
              name="message-circle"
              size={SIZES.xl}
              color={darkMode ? '#666' : COLORS.greyest}
            />

            <Text
              style={[
                styles.emptyText,
                {
                  color: theme.text,
                },
              ]}
            >
              No Chats Yet
            </Text>

            <Text
              style={[
                styles.subText,
                {
                  color: darkMode ? '#B0B0B0' : 'gray',
                },
              ]}
            >
              Start messaging to see chats here
            </Text>
          </View>
        }
        contentContainerStyle={{
          padding: SIZES.smallest,
        }}
      />

      <MessagesInput
        message={message}
        setMessage={handleTyping}
        sendMessage={sendMessage}
        sending={sending}
      />
    </KeyboardAvoidingView>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: SIZES.xtraXtraXtraS,
  },

  dateContainer: {
    alignSelf: 'center',

    paddingHorizontal: 12,
    paddingVertical: 5,

    borderRadius: 10,

    marginVertical: 10,
  },

  dateText: {
    fontSize: 12,

    fontWeight: '600',
  },

  emptyContainer: {
    justifyContent: 'center',

    alignItems: 'center',

    alignSelf: 'center',

    alignContent: 'center',
  },

  emptyText: {
    fontSize: FONT_SIZE.l,

    fontWeight: '700',

    marginTop: SIZES.xxs,
  },

  subText: {
    marginTop: SIZES.xtraExtras,

    fontSize: FONT_SIZE.xs,
  },
});
