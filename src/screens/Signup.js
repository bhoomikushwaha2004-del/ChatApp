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
import useTheme from '../theme/useTheme';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();

  const { register, googleLogin, fbLogin } = useContext(AuthContext);

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

      <Text
        style={[
          styles.text,
          {
            color: theme.text,
          },
        ]}
      >
        Create an Account
      </Text>

      {/* NAME INPUT */}

      <FormInput
        labelValue={name}
        onChangeText={userName => setName(userName)}
        placeholderText="Full Name"
        iconType="user"
      />

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

      {/* CONFIRM PASSWORD */}

      <FormInput
        labelValue={confirmPassword}
        onChangeText={userPassword => setConfirmPassword(userPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />

      {/* SIGNUP BUTTON */}

      <FormButton
        buttonTitle="Sign Up"
        onPress={() => {
          if (!name.trim()) {
            Alert.alert('Please enter name');

            return;
          }

          if (!email.trim()) {
            Alert.alert('Please enter email');

            return;
          }

          if (!password.trim()) {
            Alert.alert('Please enter password');

            return;
          }

          if (password !== confirmPassword) {
            Alert.alert('Passwords must match');

            return;
          }

          register(name, email, password);
        }}
      />

      {/* TERMS */}

      <View style={styles.textPrivate}>
        <Text
          style={[
            styles.color_textPrivate,
            {
              color: darkMode ? '#B0B0B0' : 'grey',
            },
          ]}
        >
          By registering, you confirm that you accept our{' '}
        </Text>

        <TouchableOpacity onPress={() => Alert.alert('Terms Clicked!')}>
          <Text
            style={[
              styles.color_textPrivate,
              {
                color: '#e88832',
              },
            ]}
          >
            Terms of service
          </Text>
        </TouchableOpacity>

        <Text
          style={[
            styles.color_textPrivate,
            {
              color: darkMode ? '#B0B0B0' : 'grey',
            },
          ]}
        >
          {' '}
          and{' '}
        </Text>

        <Text
          style={[
            styles.color_textPrivate,
            {
              color: '#e88832',
            },
          ]}
        >
          Privacy Policy
        </Text>
      </View>

      {/* FACEBOOK */}

      <SocialButton
        buttonTitle="Sign In with Facebook"
        btnType="facebook"
        color="#4867aa"
        backgroundColor={darkMode ? '#1E2A45' : '#e6eaf4'}
        onPress={() => fbLogin()}
      />

      {/* GOOGLE */}

      <SocialButton
        buttonTitle="Sign In with Google"
        btnType="google"
        color="#de4d41"
        backgroundColor={darkMode ? '#3A1F24' : '#f5e7ea'}
        onPress={() => googleLogin()}
      />

      {/* LOGIN */}

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('login')}
      >
        <Text
          style={[
            styles.navButtonText,
            {
              color: theme.button,
            },
          ]}
        >
          Have an account? Sign In
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',

    padding: 20,
  },

  text: {
    fontSize: 28,

    marginBottom: 20,
  },

  navButton: {
    marginTop: 15,
  },

  navButtonText: {
    fontSize: 18,

    fontWeight: '500',
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
  },
});
