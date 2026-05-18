import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
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

const Signup = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();

  const {
    register,
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

      <Text style={styles.text}>
        Create an Account
      </Text>

      {/* NAME INPUT */}

      <FormInput
        labelValue={name}
        onChangeText={userName =>
          setName(userName)
        }
        placeholderText="Full Name"
        iconType="user"
      />

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
          setPassword(userPassword)
        }
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      {/* CONFIRM PASSWORD */}

      <FormInput
        labelValue={confirmPassword}
        onChangeText={userPassword =>
          setConfirmPassword(
            userPassword,
          )
        }
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />

      {/* SIGNUP BUTTON */}

      <FormButton
        buttonTitle="Sign Up"
        onPress={() => {

          if (!name.trim()) {
            Alert.alert(
              'Please enter name',
            );
            return;
          }

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

          if (
            password !==
            confirmPassword
          ) {

            Alert.alert(
              'Passwords must match',
            );

            return;
          }

          register(
            name,
            email,
            password,
          );
        }}
      />

      {/* TERMS */}

      <View style={styles.textPrivate}>

        <Text
          style={
            styles.color_textPrivate
          }>
          By registering, you confirm
          that you accept our{' '}
        </Text>

        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              'Terms Clicked!',
            )
          }>

          <Text
            style={[
              styles.color_textPrivate,
              { color: '#e88832' },
            ]}>
            Terms of service
          </Text>

        </TouchableOpacity>

        <Text
          style={
            styles.color_textPrivate
          }>
          {' '}
          and{' '}
        </Text>

        <Text
          style={[
            styles.color_textPrivate,
            { color: '#e88832' },
          ]}>
          Privacy Policy
        </Text>

      </View>

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
        onPress={() => googleLogin()}
      />

      {/* LOGIN */}

      <TouchableOpacity
        style={styles.navButton}
        onPress={() =>
          navigation.navigate(
            'login',
          )
        }>

        <Text
          style={styles.navButtonText}>
          Have an account? Sign In
        </Text>

      </TouchableOpacity>

    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  text: {
    fontSize: 28,
    marginBottom: 20,
    color: '#051d5f',
  },

  navButton: {
    marginTop: 15,
  },

  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
  },

  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },

  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    color: 'grey',
  },
});