import React, {
  useContext,
  useState,
} from 'react';

import {
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../services/AuthProvider';
import { useNavigation } from '@react-navigation/native';

const Login = () => {

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const navigation = useNavigation();

  const {
    login,
    googleLogin,
    fbLogin,
  } = useContext(AuthContext);

  return (

    <ScrollView
      contentContainerStyle={
        styles.container
      }>

      <StatusBar
        barStyle={'dark-content'}
      />

      <Image
        source={require('../assets/rn-social-logo.png')}
        style={styles.logo}
      />

      <Text style={styles.text}>
        RN Social App
      </Text>

      {/* EMAIL */}

      <FormInput
        labelValue={email}
        onChangeText={userEmail =>
          setEmail(userEmail)
        }
        placeholderText="Email"
        iconType="mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* PASSWORD */}

      <FormInput
        labelValue={password}
        onChangeText={userPassword =>
          setPassword(
            userPassword,
          )
        }
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      {/* LOGIN BUTTON */}

      <FormButton
        buttonTitle="Sign In"
        onPress={() => {

          if (!email.trim()) {
            Alert.alert(
              'Please enter email',
            );
            return;
          }

          if (!password.trim()) {
            Alert.alert(
              'Please enter password',
            );
            return;
          }

          login(email, password);
        }}
      />

      {/* FORGOT PASSWORD */}

      <TouchableOpacity
        style={styles.forgotButton}>

        <Text
          style={styles.navButtonText}>
          Forgot Password?
        </Text>

      </TouchableOpacity>

      {/* FACEBOOK */}

      <SocialButton
        buttonTitle="Sign In with Facebook"
        btnType="facebook"
        color="#4867aa"
        backgroundColor="#e6eaf4"
        onPress={() => fbLogin()}
      />

      {/* GOOGLE */}

      <SocialButton
        buttonTitle="Sign In with Google"
        btnType="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={() =>
          googleLogin()
        }
      />

      {/* SIGNUP */}

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() =>
          navigation.navigate(
            'signup',
          )
        }>

        <Text
          style={styles.navButtonText}>
          Don't have an account?
          Create here
        </Text>

      </TouchableOpacity>

    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },

  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },

  text: {
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },

  forgotButton: {
    marginVertical: 35,
  },

  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
  },
});