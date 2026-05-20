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
import { SIZES,FONT_SIZE,COLORS,BORDER_RADIUS,ELEVATION } from '../styles';


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
        backgroundColor={COLORS.secondary} //fff
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
            paddingBottom: SIZES.xxl, //100
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
            size={SIZES.xm} //26
            color={COLORS.secondary} //fff
          />

        </TouchableOpacity>

      </View>
    </>
  );
};

export default Chats;

const styles = StyleSheet.create({

  container: {
    flex: SIZES.xtraXtraXtraS, //1
    backgroundColor: COLORS.white4, //f8f9fd

    paddingHorizontal: SIZES.s, //16
    paddingTop: SIZES.medium, //40
  },

  fab: {
    position: 'absolute',
    bottom: SIZES.xxxxs, //25
    right: SIZES.xxs, //20

    width: SIZES.large, //62
    height: SIZES.large, //62
    borderRadius: BORDER_RADIUS.xl, //31

    backgroundColor: COLORS.blue, 

    justifyContent: 'center',
    alignItems: 'center',

    elevation: ELEVATION.large, //6
  },

  emptyContainer: {
    flex: SIZES.xtraXtraXtraS, //1
    justifyContent: 'center',
    alignItems: 'center',
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