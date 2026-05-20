import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {AuthContext} from '../services/AuthProvider';
import { SIZES,FONT_SIZE,COLORS,BORDER_RADIUS,ELEVATION } from '../styles';

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
    flex: SIZES.xtraXtraXtraS, //1
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondary, //fff
  },

  image: {
    width: SIZES.largest, //120
    height: SIZES.largest, //120
    borderRadius: BORDER_RADIUS.xxxl, //60
    marginBottom: SIZES.xxs, //20
  },

  name: {
    fontSize: FONT_SIZE.m, //18
    fontWeight: '700',
    marginBottom: SIZES.extraExtraMedium, //30
  },

  button: {
    backgroundColor: COLORS.blue, 
    paddingHorizontal: SIZES.extraExtraMedium, //30
    paddingVertical: SIZES.smaller, //14
    borderRadius: BORDER_RADIUS.xxs, //10
  },

  btnText: {
    color: COLORS.secondary, //fff
    fontSize: FONT_SIZE.xxs, //16
    fontWeight: '600',
  },
});