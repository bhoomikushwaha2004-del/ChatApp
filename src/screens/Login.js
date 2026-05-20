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
import { SIZES,FONT_SIZE,COLORS,BORDER_RADIUS,ELEVATION } from '../styles';



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
        color={COLORS.blue2}//"#4867aa"
        backgroundColor={COLORS.white5}//"#e6eaf4"
        onPress={() => fbLogin()}
      />

      {/* GOOGLE */}

      <SocialButton
        buttonTitle="Sign In with Google"
        btnType="google"
        color= {COLORS.red}//"#de4d41"
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
    padding: SIZES.xxs, //20
    paddingTop: SIZES.m, //50
  },

  logo: {
    height: SIZES.l ,//150,
    width: SIZES.l, //150
    resizeMode: 'cover',
  },

  text: {
    fontSize: FONT_SIZE.xl, //28
    marginBottom: SIZES.extraSmall, //10
    color: COLORS.darkBlue, //051d5f 
  },

  forgotButton: {
    marginVertical: SIZES.extraMedium, //35
  },

  navButtonText: {
    fontSize: FONT_SIZE.m, //18
    fontWeight: '500',
    color: COLORS.blue, 
  },
});