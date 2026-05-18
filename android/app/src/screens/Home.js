import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';

const Home = () => {

  const {logout, user} = useContext(AuthContext);

  return (
    <>
    <StatusBar barStyle={'dark-content'} />
    <View style={styles.container}>

      <Text style={styles.text}>
        Welcome {user?.email}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={logout}>

        <Text style={styles.btnText}>
          Logout
        </Text>

      </TouchableOpacity>

    </View>
    </>
    
  );
};

export default Home;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 20,
    marginBottom: 20,
  },

  button: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
  },

  btnText: {
    color: '#fff',
    fontSize: 18,
  },

});