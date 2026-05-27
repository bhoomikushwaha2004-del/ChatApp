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
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { SIZES, FONT_SIZE, COLORS } from '../styles';
import useTheme from '../theme/useTheme';

const MessagesHeader = () => {
  const [userStatus, setUserStatus] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const { userName } = route.params;
  const { otherUser } = route.params;

  const { theme, darkMode } = useTheme();

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
        } else {
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
      <StatusBar
        backgroundColor={theme.background}
        barStyle={darkMode ? 'light-content' : 'dark-content'}
      />

      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.background,

            borderColor: darkMode ? '#2A2A2A' : COLORS.secondWhite,
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={SIZES.extraExtraExtraMedium}
            color={theme.text}
          />
        </TouchableOpacity>

        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Text
            style={[
              styles.headerTitle,
              {
                color: theme.text,
              },
            ]}
          >
            {userName}
          </Text>

          <Text
            style={[
              styles.statusText,
              {
                color:
                  userStatus === 'Online' || userStatus === 'Typing...'
                    ? 'green'
                    : darkMode
                    ? '#B0B0B0'
                    : 'gray',
              },
            ]}
          >
            {userStatus}
          </Text>
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

    paddingHorizontal: SIZES.smallest,

    paddingVertical: SIZES.smallest,

    borderBottomWidth: SIZES.xtraXtraXtraS,

    paddingTop: SIZES.m,
  },

  headerTitle: {
    fontSize: FONT_SIZE.xm,
    fontWeight: '700',

    alignSelf: 'center',
  },

  statusText: {
    fontSize: 12,

    marginTop: 2,
  },
});
