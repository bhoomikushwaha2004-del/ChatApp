import React, {
  useEffect,
  useState,
} from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ContactHeader from '../components/ContactHeader';
import { useNavigation } from '@react-navigation/native';

const Contacts = () => {
  const navigation = useNavigation()
  const [users, setUsers] = useState([]);

  const currentUser = auth().currentUser;


  useEffect(() => {

    const unsubscribe = firestore()
      .collection('users')
      .onSnapshot(snapshot => {

        const allUsers = snapshot.docs.map(doc => ({
          uid: doc.id,
          ...doc.data(),
        }));

  

        const filteredUsers =
          allUsers.filter(
            item =>
              item.uid !== currentUser.uid,
          );

        setUsers(filteredUsers);
      });

    return unsubscribe;

  }, []);



  const startConversation = user => {

    navigation.navigate('messages', {
      userName: user.name,
      otherUser: user,
    });
  };

  return (

    <SafeAreaView style={styles.container}>

      <StatusBar
        backgroundColor="#f8f9fd"
        barStyle="dark-content"
      />

      <ContactHeader contacts={users} />

      <FlatList
        data={users}
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

            {/* Img */}

            <View>

              <Image
                source={{
                  uri:
                    item.image ||
                    'https://i.pravatar.cc/150',
                }}
                style={styles.image}
              />

            </View>

            {/* User data*/}

            <View style={styles.infoContainer}>

              <Text style={styles.name}>
                {item.name}
              </Text>

              <Text style={styles.status}>
                {item.email}
              </Text>

            </View>

            {/* Chat btn */}

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

    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight
        : 0,
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