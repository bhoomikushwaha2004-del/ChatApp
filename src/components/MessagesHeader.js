import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SIZES, FONT_SIZE, COLORS, BORDER_RADIUS, ELEVATION } from '../styles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'

const MessagesHeader = () => {
  const [userStatus, setUserStatus] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const { userName } = route.params;
  const { otherUser } = route.params;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .doc(otherUser.uid)
      .onSnapshot(snapshot => {
        const userData = snapshot.data();

        if (!userData) {
          return;
        }

        if (userData.isTyping && userData.typingTo === auth().currentUser.uid) {
          setUserStatus('Typing...');
        } else if (userData.isOnline) {
          setUserStatus('Online');
        } 
        else {
          if (userData.lastSeen) {
            const time = userData.lastSeen.toDate().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            });
            setUserStatus(`Last Seen ${time}`);
          } else {
            setUserStatus('Offline');
          }
        }
      });
    return unsubscribe;
  }, []);

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={SIZES.extraExtraExtraMedium} //28
            color={COLORS.primary} //000
          />
        </TouchableOpacity>

        <View style={{ alignItems: 'center' }}>
          <Text style={styles.headerTitle}>{userName}</Text>

          <Text style={styles.statusText}>{userStatus} </Text>
        </View>

        <View style={{ width: 28 }} />
      </View>
    </>
  );
};

export default MessagesHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: SIZES.smallest, //15
    paddingVertical: SIZES.smallest, //15

    borderBottomWidth: SIZES.xtraXtraXtraS, //1
    borderColor: COLORS.secondWhite, //eee

    paddingTop: SIZES.m, //50
  },

  headerTitle: {
    fontSize: FONT_SIZE.xm, //20
    fontWeight: '700',
    color: COLORS.primary, //000
    alignSelf: 'center',
  },
  statusText: {
    fontSize: 12,
    color: 'green',
    marginTop: 2,
  },
});
