import React, { useEffect, useState } from 'react';

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
import { useNavigation } from '@react-navigation/native';
import { SIZES, FONT_SIZE, COLORS, BORDER_RADIUS, ELEVATION } from '../styles';
import useTheme from '../theme/useTheme';

const Chats = () => {
  const [chats, setChats] = useState([]);

  const navigation = useNavigation();

  const currentUser = auth().currentUser;

  const [refreshing, setRefreshing] = useState(false);

  const { theme, darkMode } = useTheme();

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const snapshot = await firestore()
        .collection('chats')
        .where('participants', 'array-contains', currentUser.uid)

        .orderBy('updatedAt', 'desc')

        .get();

      const allChats = snapshot.docs.map(doc => {
        const data = doc.data();

        const otherUser = data.users.find(user => user.uid !== currentUser.uid);

        return {
          id: doc.id,

          ...otherUser,

          lastMessage: data.lastMessage,

          updatedAt: data.updatedAt,
        };
      });

      setChats(allChats);
    } catch (err) {
      console.log(err);
    }

    setRefreshing(false);
  };

  // REALTIME CHATS

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')

      .where('participants', 'array-contains', currentUser.uid)

      .orderBy('updatedAt', 'desc')

      .onSnapshot(snapshot => {
        if (!snapshot) {
          return;
        }

        const allChats = snapshot.docs.map(doc => {
          const data = doc.data();

          const otherUser = data.users.find(
            user => user.uid !== currentUser.uid,
          );

          return {
            id: doc.id,

            ...otherUser,

            lastMessage: data.lastMessage,

            updatedAt: data.updatedAt,

            unread: data.unreadCount?.[currentUser.uid] || 0,

            time: data.updatedAt?.toDate()?.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          };
        });

        setChats(allChats);
      });

    return unsubscribe;
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={theme.background}
        barStyle={darkMode ? 'light-content' : 'dark-content'}
      />

      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.background,
          },
        ]}
      >
        <ChatHeader />

        <ChatSearchTab />

        <FlatList
          data={chats}
          refreshing={refreshing}
          onRefresh={onRefresh}
          keyExtractor={item => item.uid}
          renderItem={({ item }) => <ChatList item={item} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="chatbubble-outline"
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
            paddingBottom: SIZES.xxl,
            flexGrow: 1,
          }}
        />

        {/* FAB */}

        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('contacts')}
        >
          <Ionicons
            name="chatbubble-ellipses"
            size={SIZES.xm}
            color={COLORS.secondary}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    flex: SIZES.xtraXtraXtraS,

    paddingHorizontal: SIZES.s,
    paddingTop: SIZES.medium,
  },

  fab: {
    position: 'absolute',

    bottom: SIZES.xxxxs,
    right: SIZES.xxs,

    width: SIZES.large,
    height: SIZES.large,

    borderRadius: BORDER_RADIUS.xl,

    backgroundColor: COLORS.blue,

    justifyContent: 'center',
    alignItems: 'center',

    elevation: ELEVATION.large,
  },

  emptyContainer: {
    flex: SIZES.xtraXtraXtraS,

    justifyContent: 'center',
    alignItems: 'center',
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
