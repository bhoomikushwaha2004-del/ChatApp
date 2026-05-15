import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import {AuthContext} from '../services/AuthProvider';

const Profile = () => {

  const {user, logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>

      <Image
        source={{
          uri:
            'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        }}
        style={styles.image}
      />

      <Text style={styles.name}>
        {user?.email}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={logout}
      >
        <Text style={styles.btnText}>
          Logout
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 30,
  },

  button: {
    backgroundColor: '#2e64e5',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 10,
  },

  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});