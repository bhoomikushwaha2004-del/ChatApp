import React, { useContext, useState } from 'react';
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
import { AuthContext } from '../services/AuthProvider'
import { useNavigation } from '@react-navigation/native';
import { SIZES, FONT_SIZE, COLORS } from '../styles';
import useTheme from '../theme/useTheme';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const { login, googleLogin, fbLogin } = useContext(AuthContext);

  const { theme, darkMode } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <StatusBar
        backgroundColor={theme.background}
        barStyle={darkMode ? 'light-content' : 'dark-content'}
      />

      <Image
        source={require('../assets/rn-social-logo.png')}
        style={styles.logo}
      />

      <Text
        style={[
          styles.text,
          {
            color: theme.text,
          },
        ]}
      >
        RN Social App
      </Text>

      {/* EMAIL */}

      <FormInput
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
        placeholderText="Email"
        iconType="mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* PASSWORD */}

      <FormInput
        labelValue={password}
        onChangeText={userPassword => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      {/* LOGIN BUTTON */}

      <FormButton
        buttonTitle="Sign In"
        onPress={() => {
          if (!email.trim()) {
            Alert.alert('Please enter email');

            return;
          }

          if (!password.trim()) {
            Alert.alert('Please enter password');

            return;
          }

          login(email, password);
        }}
      />

      {/* FORGOT PASSWORD */}

      <TouchableOpacity style={styles.forgotButton}>
        <Text
          style={[
            styles.navButtonText,
            {
              color: theme.button,
            },
          ]}
        >
          Forgot Password?
        </Text>
      </TouchableOpacity>

      {/* FACEBOOK */}

      <SocialButton
        buttonTitle="Sign In with Facebook"
        btnType="facebook"
        color={COLORS.blue2}
        backgroundColor={darkMode ? '#1E2A45' : COLORS.white5}
        onPress={() => fbLogin()}
      />

      {/* GOOGLE */}

      <SocialButton
        buttonTitle="Sign In with Google"
        btnType="google"
        color={COLORS.red}
        backgroundColor={darkMode ? '#3A1F24' : '#f5e7ea'}
        onPress={() => googleLogin()}
      />

      {/* SIGNUP */}

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('signup')}
      >
        <Text
          style={[
            styles.navButtonText,
            {
              color: theme.button,
            },
          ]}
        >
          Don't have an account? Create here
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

    padding: SIZES.xxs,

    paddingTop: SIZES.m,

    flexGrow: 1,
  },

  logo: {
    height: SIZES.l,
    width: SIZES.l,

    resizeMode: 'cover',
  },

  text: {
    fontSize: FONT_SIZE.xl,

    marginBottom: SIZES.extraSmall,
  },

  forgotButton: {
    marginVertical: SIZES.extraMedium,
  },

  navButtonText: {
    fontSize: FONT_SIZE.m,

    fontWeight: '500',
  },
});
