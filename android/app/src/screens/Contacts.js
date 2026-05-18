import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {contacts} from '../services/contacts';

const Contacts = ({navigation, route}) => {

  const {setChatUsers} = route.params;

  const startConversation = user => {

    const newChat = {
      ...user,
      lastMessage: '',
      time: 'Now',
      unread: 0,
    };

    setChatUsers(prev => {

      const alreadyExists = prev.find(
        item => item.uid === user.uid,
      );

      if (alreadyExists) {
        navigation.navigate('messages', {
          userName: user.name,
          otherUser: user,
        });

        return prev;
      }

      return [newChat, ...prev];
    });

    navigation.navigate('messages', {
      userName: user.name,
    });
  };

  return (

    <SafeAreaView style={styles.container}>

      <StatusBar
        backgroundColor="#f8f9fd"
        barStyle="dark-content"
      />

      {/* Header */}

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>

          <Ionicons
            name="arrow-back"
            size={24}
            color="#000"
          />

        </TouchableOpacity>

        <View>

          <Text style={styles.headerTitle}>
            Select Contact
          </Text>

          <Text style={styles.headerSubTitle}>
            {contacts.length} contacts
          </Text>

        </View>

      </View>

      {/* Contacts List */}

      <FlatList
        data={contacts}
        keyExtractor={item => item.uid}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        renderItem={({item}) => (

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.card}
            onPress={() =>
              startConversation(item)
            }>

            {/* Image */}

            <View>

              <Image
                source={{uri: item.image}}
                style={styles.image}
              />

              {item.online && (
                <View style={styles.onlineDot} />
              )}

            </View>

            {/* User Info */}

            <View style={styles.infoContainer}>

              <Text style={styles.name}>
                {item.name}
              </Text>

              <Text style={styles.status}>
                {item.online
                  ? 'Online'
                  : 'Offline'}
              </Text>

            </View>

            {/* Chat Icon */}

            <View style={styles.chatBtn}>

              <Ionicons
                name="chatbubble-ellipses"
                size={20}
                color="#fff"
              />

            </View>

          </TouchableOpacity>
        )}
      />

    </SafeAreaView>
  );
};

export default Contacts;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f8f9fd',
    paddingTop: Platform.OS === 'android'
      ? StatusBar.currentHeight
      : 0,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 18,
    paddingVertical: 16,
  },

  backBtn: {
    width: 45,
    height: 45,
    borderRadius: 22,

    backgroundColor: '#fff',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 14,

    elevation: 3,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },

  headerSubTitle: {
    color: 'gray',
    marginTop: 2,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#fff',

    marginHorizontal: 16,
    marginBottom: 14,

    padding: 14,

    borderRadius: 22,

    elevation: 3,
  },

  image: {
    width: 65,
    height: 65,
    borderRadius: 35,
  },

  onlineDot: {
    width: 15,
    height: 15,
    borderRadius: 8,

    backgroundColor: '#00c851',

    position: 'absolute',
    bottom: 3,
    right: 3,

    borderWidth: 2,
    borderColor: '#fff',
  },

  infoContainer: {
    flex: 1,
    marginLeft: 14,
  },

  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
  },

  status: {
    marginTop: 5,
    color: 'gray',
    fontSize: 13,
  },

  chatBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,

    backgroundColor: '#2e64e5',

    justifyContent: 'center',
    alignItems: 'center',
  },
});